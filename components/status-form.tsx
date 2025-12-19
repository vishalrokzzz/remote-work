// "use client";
//
// import { useState, useTransition } from "react";
// import { upsertTodayStatus } from "@/lib/actions/status.actions";
// import { getHelpSuggestions } from "@/lib/actions/ai.actions";
// import { Button } from "@/components/ui/button";
//
// export default function StatusForm({ initialData }: { initialData: any }) {
//     const [pending, startTransition] = useTransition();
//
//     const [focus, setFocus] = useState(initialData?.focus ?? "");
//     const [blockers, setBlockers] = useState(initialData?.blockers ?? "");
//     const [needsHelp, setNeedsHelp] = useState(initialData?.needs_help ?? false);
//
//     const [aiResult, setAiResult] = useState<any>(null);
//     const [aiLoading, setAiLoading] = useState(false);
//
//     const onSubmit = () => {
//         startTransition(async () => {
//             // 1️⃣ Save status
//             await upsertTodayStatus({
//                 focus,
//                 blockers,
//                 needs_help: needsHelp,
//             });
//
//             // 2️ Run AI only if help is requested + blocker exists
//             if (needsHelp && blockers?.trim()) {
//                 setAiLoading(true);
//                 try {
//                     const result = await getHelpSuggestions(blockers);
//                     setAiResult(result);
//                 } catch (e) {
//                     console.error("AI analysis failed", e);
//                 } finally {
//                     setAiLoading(false);
//                 }
//             } else {
//                 setAiResult(null);
//             }
//         });
//     };
//
//     return (
//         <div className="space-y-4">
//             {/* Focus */}
//             <textarea
//                 className="w-full border rounded-md p-3"
//                 placeholder="What are you working on today?"
//                 value={focus}
//                 onChange={(e) => setFocus(e.target.value)}
//             />
//
//             {/* Blockers */}
//             <textarea
//                 className="w-full border rounded-md p-3"
//                 placeholder="Any blockers? (optional)"
//                 value={blockers}
//                 onChange={(e) => setBlockers(e.target.value)}
//             />
//
//             {/* Needs help */}
//             <label className="flex items-center gap-2 text-sm">
//                 <input
//                     type="checkbox"
//                     checked={needsHelp}
//                     onChange={(e) => setNeedsHelp(e.target.checked)}
//                 />
//                 I need help / input from someone
//             </label>
//
//             {/* Save */}
//             <Button onClick={onSubmit} disabled={pending || !focus}>
//                 {pending ? "Saving..." : "Save Update"}
//             </Button>
//
//             {/* AI RESULT */}
//             {aiLoading && (
//                 <p className="text-sm text-muted-foreground">
//                     Analyzing blocker with AI…
//                 </p>
//             )}
//
//             {aiResult && (
//                 <div className="border rounded-md p-4 bg-muted space-y-2">
//                     <h3 className="font-semibold">AI Insight</h3>
//
//                     <p className="text-sm">
//                         <b>Category:</b> {aiResult.analysis.category}
//                     </p>
//                     <p className="text-sm">
//                         <b>Severity:</b> {aiResult.analysis.severity}
//                     </p>
//                     <p className="text-sm text-muted-foreground">
//                         {aiResult.analysis.reason === "AI analysis unavailable"
//                             ? "Using recent team activity to suggest relevant context."
//                             : aiResult.analysis.reason}
//                     </p>
//
//                     {aiResult.matches?.length > 0 && (
//                         <>
//                             <h4 className="mt-3 font-medium text-sm">
//                                 People with recent context
//                             </h4>
//
//                             <ul className="text-sm space-y-1">
//                                 {aiResult.matches.map((m: any, i: number) => (
//                                     <li key={i}>
//                                         • <b>{m.users_profile?.name}</b> — worked on this recently
//                                     </li>
//                                 ))}
//                             </ul>
//                         </>
//                     )}
//
//                     {aiResult.matches?.length === 0 && (
//                         <p className="text-sm text-muted-foreground">
//                             No recent matching context found.
//                         </p>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// }


"use client";

import { useState, useTransition } from "react";
import { upsertTodayStatus } from "@/lib/actions/status.actions";
import { getHelpSuggestions } from "@/lib/actions/ai.actions";
import { Button } from "@/components/ui/button";

export default function StatusForm({ initialData }: { initialData: any }) {
    const [pending, startTransition] = useTransition();

    const [focus, setFocus] = useState(initialData?.focus ?? "");
    const [blockers, setBlockers] = useState(initialData?.blockers ?? "");
    const [needsHelp, setNeedsHelp] = useState(initialData?.needs_help ?? false);

    const [aiResult, setAiResult] = useState<any>(null);
    const [aiLoading, setAiLoading] = useState(false);

    // ✅ Submission confirmation
    const [submitted, setSubmitted] = useState(false);

    const onSubmit = () => {
        startTransition(async () => {
            await upsertTodayStatus({
                focus,
                blockers,
                needs_help: needsHelp,
            });

            if (needsHelp && blockers?.trim()) {
                setAiLoading(true);
                try {
                    const result = await getHelpSuggestions(blockers);
                    setAiResult(result);
                } catch (e) {
                    console.error("AI analysis failed", e);
                } finally {
                    setAiLoading(false);
                }
            } else {
                setAiResult(null);
            }

            // ✅ Mark as submitted
            setSubmitted(true);
        });
    };

    // Reset submitted state when user edits again
    const onEdit = () => {
        if (submitted) setSubmitted(false);
    };

    return (
        <div className="space-y-4">
            {/* Focus */}
            <textarea
                className="w-full border rounded-md p-3"
                placeholder="What are you working on today?"
                value={focus}
                onChange={(e) => {
                    setFocus(e.target.value);
                    onEdit();
                }}
            />

            {/* Blockers */}
            <textarea
                className="w-full border rounded-md p-3"
                placeholder="Any blockers? (optional)"
                value={blockers}
                onChange={(e) => {
                    setBlockers(e.target.value);
                    onEdit();
                }}
            />

            {/* Needs help */}
            <label className="flex items-center gap-2 text-sm">
                <input
                    type="checkbox"
                    checked={needsHelp}
                    onChange={(e) => {
                        setNeedsHelp(e.target.checked);
                        onEdit();
                    }}
                />
                I need help / input from someone
            </label>

            {/* Submit row */}
            <div className="flex items-center gap-4">
                <Button onClick={onSubmit} disabled={pending || !focus}>
                    {pending ? "Saving..." : "Save Update"}
                </Button>

                {submitted && (
                    <span className="flex items-center gap-1 text-sm text-green-600">
            ✓ Submitted
          </span>
                )}
            </div>

            {/* AI RESULT */}
            {aiLoading && (
                <p className="text-sm text-muted-foreground">
                    Analyzing blocker with AI…
                </p>
            )}

            {aiResult && (
                <div className="border rounded-md p-4 bg-muted space-y-2">
                    <h3 className="font-semibold">AI Insight</h3>

                    <p className="text-sm">
                        <b>Category:</b> {aiResult.analysis.category}
                    </p>
                    <p className="text-sm">
                        <b>Severity:</b> {aiResult.analysis.severity}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {aiResult.analysis.reason === "AI analysis unavailable"
                            ? "Using recent team activity to suggest relevant context."
                            : aiResult.analysis.reason}
                    </p>

                    {aiResult.matches?.length > 0 && (
                        <>
                            <h4 className="mt-3 font-medium text-sm">
                                People with recent context
                            </h4>

                            <ul className="text-sm space-y-1">
                                {aiResult.matches.map((m: any, i: number) => (
                                    <li key={i}>
                                        • <b>{m.users_profile?.name}</b> — worked on this recently
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}

                    {aiResult.matches?.length === 0 && (
                        <p className="text-sm text-muted-foreground">
                            No recent matching context found.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
