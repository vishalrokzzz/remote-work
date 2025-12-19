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
        <div className="relative min-h-screen overflow-hidden">
            {/* Animated Background */}
            {/*<GravityStarsBackground className="absolute inset-0 -z-10" />*/}
            <GravityStarsBackground
                starsCount={250}
                mouseInfluence={250}
                className="absolute inset-0 z-0 opacity-40"
            />

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Header Card */}
                <div className="mb-8 rounded-2xl bg-white/80 backdrop-blur border shadow-sm p-6">
                    <h1 className="text-2xl font-semibold">Team Updates</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Async updates from the team.
                    </p>
                </div>

                {/* Feed Card */}
                <div className="rounded-2xl bg-white/85 backdrop-blur border shadow-sm p-6">
                    <StatusFeed items={feed} />
                </div>
            </div>
        </div>
    );
}
