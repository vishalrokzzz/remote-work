import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";
import {GravityStarsBackground} from "@/components/animate-ui/components/backgrounds/gravity-stars";

export default async function ProfilePage() {
    const { userId } = await auth();
    const supabase = createSupabaseClient();

    const { data } = await supabase
        .from("status_updates")
        .select("date, focus, blockers, needs_help")
        .eq("owner_id", userId)
        .order("date", { ascending: false })
        .limit(14);

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <GravityStarsBackground
                starsCount={300}
                movementSpeed={0.2}
                mouseInfluence={150}
                mouseGravity="attract"
                starColor="#64748b"    /* Slate-500: visible on white */
                lineColor="#cbd5e1"    /* Slate-300: subtle connection lines */
                className="absolute inset-0 z-0 opacity-40"
            />
            <h1 className="text-2xl font-semibold">My Status History</h1>

            <div className="mt-6 space-y-4">
                {data?.map((s) => (
                    <div key={s.date} className="border rounded-md p-4">
                        <div className="text-sm text-muted-foreground">{s.date}</div>
                        <p className="mt-1">{s.focus}</p>
                        {s.blockers && (
                            <p className="text-sm text-red-600 mt-1">
                                Blocker: {s.blockers}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
