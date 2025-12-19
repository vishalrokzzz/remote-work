"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useAuth, useUser } from "@clerk/nextjs";

export default function TestProjectsPage() {
    const { userId, getToken } = useAuth();
    const { user } = useUser();
    const [log, setLog] = useState<string[]>([]);

    const addLog = (msg: string) =>
        setLog((prev) => [...prev, msg]);

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            async accessToken() {
                return await getToken();
            },
        }
    );

    const runTest = async () => {
        try {
            if (!userId || !user) {
                addLog("❌ Not authenticated");
                return;
            }

            // 1️⃣ Ensure user profile
            addLog("1️⃣ Ensuring user profile...");

            const { data: existingProfile } = await supabase
                .from("users_profile")
                .select("id")
                .eq("clerk_id", userId)
                .single();

            if (!existingProfile) {
                const { error } = await supabase.from("users_profile").insert({
                    clerk_id: userId,
                    name:
                        user.firstName ||
                        user.username ||
                        user.emailAddresses[0]?.emailAddress ||
                        "User",
                });

                if (error) throw error;
                addLog("✅ User profile created");
            } else {
                addLog("✅ User profile already exists");
            }

            // 2️⃣ Create project
            addLog("2️⃣ Creating project...");
            const { data: project, error: createErr } = await supabase
                .from("projects")
                .insert({
                    title: "Test Project",
                    description: "Supabase sanity check",
                    owner_id: userId,
                })
                .select()
                .single();

            if (createErr) throw createErr;
            addLog(`✅ Project created: ${project.id}`);

            // 3️⃣ Fetch projects
            addLog("3️⃣ Fetching projects...");
            const { data: projects, error: fetchErr } = await supabase
                .from("projects")
                .select("*")
                .eq("owner_id", userId);

            if (fetchErr) throw fetchErr;
            addLog(`✅ Found ${projects.length} project(s)`);

            // 4️⃣ Update project
            addLog("4️⃣ Updating project...");
            const { error: updateErr } = await supabase
                .from("projects")
                .update({ title: "Updated Test Project" })
                .eq("id", project.id);

            if (updateErr) throw updateErr;
            addLog("✅ Project updated");

            // 5️⃣ Delete project
            addLog("5️⃣ Deleting project...");
            const { error: deleteErr } = await supabase
                .from("projects")
                .delete()
                .eq("id", project.id);

            if (deleteErr) throw deleteErr;
            addLog("✅ Project deleted");

            addLog("🎉 ALL SUPABASE TESTS PASSED");
        } catch (err: any) {
            addLog(`❌ ERROR: ${err.message}`);
        }
    };

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-xl font-bold">Supabase Sanity Test</h1>

            <button
                onClick={runTest}
                className="px-4 py-2 bg-black text-white rounded"
            >
                Run Supabase Test
            </button>

            <div className="bg-gray-100 p-4 rounded text-sm space-y-1">
                {log.map((l, i) => (
                    <div key={i}>{l}</div>
                ))}
            </div>
        </div>
    );
}
