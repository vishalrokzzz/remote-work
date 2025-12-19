"use client";

import { useState, useTransition } from "react";
import { upsertTodayStatus } from "@/lib/actions/status.actions";
import { Button } from "@/components/ui/button";

export default function StatusForm({ initialData }: { initialData: any }) {
    const [pending, startTransition] = useTransition();
    const [focus, setFocus] = useState(initialData?.focus ?? "");
    const [blockers, setBlockers] = useState(initialData?.blockers ?? "");
    const [needsHelp, setNeedsHelp] = useState(initialData?.needs_help ?? false);

    const onSubmit = () => {
        startTransition(async () => {
            await upsertTodayStatus({
                focus,
                blockers,
                needs_help: needsHelp,
            });
        });
    };

    return (
        <div className="space-y-4">
      <textarea
          className="w-full border rounded-md p-3"
          placeholder="What are you working on today?"
          value={focus}
          onChange={(e) => setFocus(e.target.value)}
      />

            <textarea
                className="w-full border rounded-md p-3"
                placeholder="Any blockers? (optional)"
                value={blockers}
                onChange={(e) => setBlockers(e.target.value)}
            />

            <label className="flex items-center gap-2 text-sm">
                <input
                    type="checkbox"
                    checked={needsHelp}
                    onChange={(e) => setNeedsHelp(e.target.checked)}
                />
                I need help / input from someone
            </label>

            <Button onClick={onSubmit} disabled={pending || !focus}>
                {pending ? "Saving..." : "Save Update"}
            </Button>
        </div>
    );
}
