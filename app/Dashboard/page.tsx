import { getTodayStatus, getStatusFeed } from "@/lib/actions/status.actions";
import StatusForm from "@/components/status-form";
import StatusFeed from "@/components/status-feed";

export default async function DashboardPage() {
    const todayStatus = await getTodayStatus();
    const feed = await getStatusFeed(20);

    return (
        <div className="max-w-3xl mx-auto px-4 py-8 space-y-10">
            <div>
                <h1 className="text-2xl font-semibold">Today’s Status</h1>
                <p className="text-sm text-muted-foreground">
                    Share what you’re working on. Async by default.
                </p>

                <div className="mt-4">
                    <StatusForm initialData={todayStatus} />
                </div>
            </div>

            <hr />

            <div>
                <h2 className="text-xl font-semibold">Team Updates</h2>
                <p className="text-sm text-muted-foreground">
                    Latest async updates from the team
                </p>

                <div className="mt-6">
                    <StatusFeed items={feed} />
                </div>
            </div>
        </div>
    );
}
