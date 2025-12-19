import { getTodayStatus } from "@/lib/actions/status.actions";
import StatusForm from "@/components/status-form";
import Image from "next/image";
import { GravityStarsBackground } from "@/components/animate-ui/components/backgrounds/gravity-stars";

export default async function TodayStatusPage() {
    const todayStatus = await getTodayStatus();

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

            <h1 className="text-2xl font-semibold">What's Cooking</h1>
            <p className="text-sm text-muted-foreground mb-4">
                Share your daily focus and blockers.
            </p>

            <StatusForm initialData={todayStatus} />
        </div>
    );
}
