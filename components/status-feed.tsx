export default function StatusFeed({ items }: { items: any[] }) {
    if (!items || items.length === 0) {
        return (
            <p className="text-sm text-muted-foreground">
                No updates yet.
            </p>
        );
    }

    return (
        <div className="space-y-4">
            {items.map((item) => (
                <div
                    key={item.id}
                    className="border rounded-md p-4 space-y-2"
                >
                    <div className="flex items-center justify-between">
            <span className="font-medium">
              {item.users_profile?.name ?? "Team member"}
            </span>
                        <span className="text-xs text-muted-foreground">
              {item.date}
            </span>
                    </div>

                    <p>{item.focus}</p>

                    {item.blockers && (
                        <p className="text-sm text-red-600">
                            Blocker: {item.blockers}
                        </p>
                    )}

                    {item.needs_help && (
                        <span className="inline-block text-xs px-2 py-1 bg-yellow-100 rounded">
              Needs help
            </span>
                    )}
                </div>
            ))}
        </div>
    );
}
