"use server";

import { auth,currentUser } from "@clerk/nextjs/server";
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

    const user = await currentUser();
    if (!user) throw new Error("User not found");

    const supabase = createSupabaseClient();

    // ✅ Derive a good display name from Clerk
    const name =
        user.username ||
        user.firstName ||
        user.emailAddresses?.[0]?.emailAddress ||
        "User";

    // 🔑 Ensure profile exists (idempotent)
    await supabase.from("users_profile").upsert({
        clerk_id: userId,
        name,
    });

    const today = new Date().toISOString().split("T")[0];

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

    if (error) throw new Error(error.message);

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
// export const getStatusFeed = async (limit = 20) => {
//     const supabase = createSupabaseClient();
//
//     const { data, error } = await supabase
//         .from("status_updates")
//         .select(
//             `
//       id,
//       owner_id,
//       date,
//       focus,
//       blockers,
//       decision,
//       needs_help,
//       created_at,
//       users_profile (
//             name
//         )
//     `
//         )
//         .order("created_at", { ascending: false })
//         .limit(limit);
//
//     if (error) {
//         throw new Error(error.message);
//     }
//
//     return data;
// };


export const getStatusFeed = async (limit = 20) => {
    const supabase = createSupabaseClient();
    const { userId } = await auth();

    const query = supabase
        .from("status_updates")
        .select(`
      id,
      date,
      focus,
      blockers,
      decision,
      needs_help,
      created_at,
      users_profile (
        name
      )
    `)
        .order("created_at", { ascending: false })
        .limit(limit);

    if (userId) {
        query.neq("owner_id", userId);
    }

    const { data, error } = await query;

    if (error) throw new Error(error.message);
    return data;
};

