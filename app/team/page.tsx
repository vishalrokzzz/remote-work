// import { getStatusFeed } from "@/lib/actions/status.actions";
// import StatusFeed from "@/components/status-feed";
//
//
// export default async function TeamPage() {
//     const feed = await getStatusFeed(50);
//
//     return (
//
//         <div className="max-w-3xl mx-auto px-4 py-8">
//
//             <h1 className="text-2xl font-semibold">Team Updates</h1>
//             <p className="text-sm text-muted-foreground mb-6">
//                 Async updates from the team.
//             </p>
//
//             <StatusFeed items={feed} />
//         </div>
//
//     );
// }


import { getStatusFeed } from "@/lib/actions/status.actions";
import StatusFeed from "@/components/status-feed";
import { GravityStarsBackground } from "@/components/animate-ui/components/backgrounds/gravity-stars";

export default async function TeamPage() {
    const feed = await getStatusFeed(50);

    return (
        /* 1. Use a light background (bg-slate-50 or white) */
        <div className="relative min-h-screen w-full overflow-hidden bg-white">

            {/* 2. Interactive Background Layer configured for Light Mode */}
            <GravityStarsBackground
                starsCount={300}
                movementSpeed={0.2}
                mouseInfluence={150}
                mouseGravity="attract"
                starColor="#64748b"    /* Slate-500: visible on white */
                lineColor="#cbd5e1"    /* Slate-300: subtle connection lines */
                className="absolute inset-0 z-0 opacity-40"
            />

            {/* 3. Content Layer (Dark text for readability) */}
            <div className="relative z-10 max-w-3xl mx-auto px-4 py-8">
                <h1 className="text-2xl font-semibold text-slate-900">Team Updates</h1>
                <p className="text-sm text-slate-600 mb-6">
                    Async updates from the team.
                </p>

                <StatusFeed items={feed} />
            </div>
        </div>
    );
}
