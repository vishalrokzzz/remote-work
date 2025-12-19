"use server";

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";

/**
 * Create or update today's status update (1 per user per day)
 */
export const upsertTodayStatus = async (payload: {
    focus: string;
    blockers?: string | null;
    decision?: string | null;
    needs_help?: boolean;
}) => {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const supabase = createSupabaseClient();

    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    const { data, error } = await supabase
        .from("status_updates")
        .upsert(
            {
                owner_id: userId,
                date: today,
                focus: payload.focus,
                blockers: payload.blockers ?? null,
                decision: payload.decision ?? null,
                needs_help: payload.needs_help ?? false,
                updated_at: new Date().toISOString(),
            },
            { onConflict: "owner_id,date" }
        )
        .select()
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

/**
 * Get the current user's status update for today
 */
export const getTodayStatus = async () => {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const supabase = createSupabaseClient();

    const today = new Date().toISOString().split("T")[0];

    const { data, error } = await supabase
        .from("status_updates")
        .select()
        .eq("owner_id", userId)
        .eq("date", today)
        .maybeSingle();

    if (error) {
        throw new Error(error.message);
    }

    return data; // can be null (no update yet)
};

/**
 * Get async status feed (latest first)
 * Used for team board
 */
export const getStatusFeed = async (limit = 20) => {
    const supabase = createSupabaseClient();

    const { data, error } = await supabase
        .from("status_updates")
        .select(
            `
      id,
      owner_id,
      date,
      focus,
      blockers,
      decision,
      needs_help,
      created_at,
      users_profile:owner_id (
        clerk_id,
        name,
        avatar_url
      )
    `
        )
        .order("created_at", { ascending: false })
        .limit(limit);

    if (error) {
        throw new Error(error.message);
    }

    return data;
};
