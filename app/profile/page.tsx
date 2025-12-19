// import { auth } from "@clerk/nextjs/server";
// import { createSupabaseClient } from "@/lib/supabase";
// import {GravityStarsBackground} from "@/components/animate-ui/components/backgrounds/gravity-stars";
//
// export default async function ProfilePage() {
//     const { userId } = await auth();
//     const supabase = createSupabaseClient();
//
//     const { data } = await supabase
//         .from("status_updates")
//         .select("date, focus, blockers, needs_help")
//         .eq("owner_id", userId)
//         .order("date", { ascending: false })
//         .limit(14);
//
//     return (
//         <div className="max-w-2xl mx-auto px-4 py-8">
//
//             <h1 className="text-2xl font-semibold">My Status History</h1>
//
//             <div className="mt-6 space-y-4">
//                 {data?.map((s) => (
//                     <div key={s.date} className="border rounded-md p-4">
//                         <div className="text-sm text-muted-foreground">{s.date}</div>
//                         <p className="mt-1">{s.focus}</p>
//                         {s.blockers && (
//                             <p className="text-sm text-red-600 mt-1">
//                                 Blocker: {s.blockers}
//                             </p>
//                         )}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }


import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";
import { GravityStarsBackground } from "@/components/animate-ui/components/backgrounds/gravity-stars";

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
        <div className="relative min-h-screen overflow-hidden">
            {/* Animated Background */}
            {/*<GravityStarsBackground className="absolute inset-0 -z-10 opacity-80" />*/}
            <GravityStarsBackground
                starsCount={250}
                mouseInfluence={250}
                className="absolute inset-0 z-0 opacity-40"
            />

            {/* Content */}
            <div className="max-w-3xl mx-auto px-4 py-12">
                {/* Header Card */}
                <div className="mb-8 rounded-2xl bg-white/80 backdrop-blur border shadow-sm p-6">
                    <h1 className="text-2xl font-semibold">My Status History</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Your recent daily updates.
                    </p>
                </div>

                {/* History List */}
                <div className="space-y-4">
                    {data?.map((s) => (
                        <div
                            key={s.date}
                            className="rounded-xl bg-white/85 backdrop-blur border shadow-sm p-5"
                        >
                            <div className="text-xs text-muted-foreground">{s.date}</div>

                            <p className="mt-2 text-sm text-gray-800">{s.focus}</p>

                            {s.blockers && (
                                <p className="mt-2 text-sm text-red-600">
                                    Blocker: {s.blockers}
                                </p>
                            )}

                            {s.needs_help && (
                                <span className="inline-block mt-3 rounded-md bg-amber-100 text-amber-800 text-xs px-2 py-1">
                  Needed help
                </span>
                            )}
                        </div>
                    ))}

                    {!data || data.length === 0 && (
                        <div className="rounded-xl bg-white/80 backdrop-blur border p-6 text-sm text-muted-foreground">
                            No status updates yet.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
