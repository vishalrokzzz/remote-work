import { getTodayStatus } from "@/lib/actions/status.actions";
import StatusForm from "@/components/status-form";
import Image from "next/image";

export default async function TodayStatusPage() {
    const todayStatus = await getTodayStatus();

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">

            <h1 className="text-2xl font-semibold">What's Cooking</h1>
            <p className="text-sm text-muted-foreground mb-4">
                Share your daily focus and blockers.
            </p>

            <StatusForm initialData={todayStatus} />
        </div>
    );
}
