// import { getTodayStatus } from "@/lib/actions/status.actions";
// import StatusForm from "@/components/status-form";
// import Image from "next/image";
//
// export default async function TodayStatusPage() {
//     const todayStatus = await getTodayStatus();
//
//     return (
//         <div className="max-w-2xl mx-auto px-4 py-8">
//
//             <h1 className="text-2xl font-semibold">What's Cooking</h1>
//             <p className="text-sm text-muted-foreground mb-4">
//                 Share your daily focus and blockers.
//             </p>
//
//             <StatusForm initialData={todayStatus} />
//         </div>
//     );
// }


import { getTodayStatus } from "@/lib/actions/status.actions";
import StatusForm from "@/components/status-form";
import { GravityStarsBackground } from "@/components/animate-ui/components/backgrounds/gravity-stars";

export default async function TodayStatusPage() {
    const todayStatus = await getTodayStatus();

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Animated Background */}
            <GravityStarsBackground
                starsCount={250}
                mouseInfluence={250}
                className="absolute inset-0 z-0 opacity-40"
            />

            {/* Content */}
            <div className="max-w-3xl mx-auto px-4 py-12">
                {/* Header Card */}
                <div className="mb-8 rounded-2xl bg-white/80 backdrop-blur border shadow-sm p-6">
                    <h1 className="text-2xl font-semibold">What’s Cooking</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Share your daily focus and blockers.
                    </p>
                </div>

                {/* Form Card */}
                <div className="rounded-2xl bg-white/85 backdrop-blur border shadow-sm p-6">
                    <StatusForm initialData={todayStatus} />
                </div>
            </div>
        </div>
    );
}
