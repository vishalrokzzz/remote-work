"use server";

import { createSupabaseClient } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";

export const analyzeBlocker = async (blocker: string) => {
    if (!blocker) return null;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content:
                        "You classify engineering blockers and return strict JSON only.",
                },
                {
                    role: "user",
                    content: `
Return STRICT JSON ONLY in this format:
{
  "category": "Frontend | Backend | Database | Infra | Auth | Other",
  "severity": "Low | Medium | High",
  "reason": "short explanation"
}

Blocker:
"${blocker}"
          `,
                },
            ],
            temperature: 0.2,
        }),
    });

    const json = await res.json();

    // 🔒 SAFETY CHECKS (IMPORTANT)
    if (!json.choices || !json.choices[0]?.message?.content) {
        console.error("AI response malformed:", json);
        return {
            category: "Other",
            severity: "Medium",
            reason: "AI analysis unavailable",
        };
    }

    try {
        return JSON.parse(json.choices[0].message.content);
    } catch (e) {
        console.error("AI JSON parse failed:", json.choices[0].message.content);
        return {
            category: "Other",
            severity: "Medium",
            reason: "AI response could not be parsed",
        };
    }
};



export const findContextMatches = async (keyword: string) => {
    const { userId } = await auth();
    const supabase = createSupabaseClient();

    const since = new Date();
    since.setDate(since.getDate() - 3);

    const { data, error } = await supabase
        .from("status_updates")
        .select(`
      owner_id,
      focus,
      blockers,
      created_at,
      users_profile (
        name
      )
    `)
        .or(`focus.ilike.%${keyword}%,blockers.ilike.%${keyword}%`)
        .neq("owner_id", userId) // 🚨 EXCLUDE SELF
        .gte("created_at", since.toISOString())
        .order("created_at", { ascending: false })
        .limit(3);

    if (error) {
        console.error("Context match error:", error);
        return [];
    }

    // return data ?? [];
    if (!data) return [];

// ✅ Deduplicate by owner_id
    const uniqueByUser = new Map<string, any>();

    for (const row of data) {
        if (!uniqueByUser.has(row.owner_id)) {
            uniqueByUser.set(row.owner_id, row);
        }
    }

    return Array.from(uniqueByUser.values());
};




export const getHelpSuggestions = async (blocker: string) => {
    if (!blocker) return null;

    const analysis = await analyzeBlocker(blocker);

    // 🔁 Fallback keyword detection from raw text
    const lower = blocker.toLowerCase();

    let keyword = "";

    if (analysis?.category === "Database" || lower.includes("supabase")) {
        keyword = "supabase";
    } else if (analysis?.category === "Auth" || lower.includes("auth")) {
        keyword = "auth";
    } else if (analysis?.category === "Backend" || lower.includes("api")) {
        keyword = "api";
    }

    if (!keyword) {
        return {
            analysis,
            matches: [],
        };
    }

    const matches = await findContextMatches(keyword);

    return {
        analysis,
        matches,
    };
};



