import { getStatusFeed } from "@/lib/actions/status.actions";
import StatusFeed from "@/components/status-feed";

export default async function TeamPage() {
    const feed = await getStatusFeed(50);

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-semibold">Team Updates</h1>
            <p className="text-sm text-muted-foreground mb-6">
                Async updates from the team.
            </p>

            <StatusFeed items={feed} />
        </div>
    );
}
