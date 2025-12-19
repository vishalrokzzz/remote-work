"use server";

import {auth} from "@clerk/nextjs/server";
import {createSupabaseClient} from "@/lib/supabase";

// --------------------
// CREATE PROJECT
// --------------------
export const createProject = async (formData: {
    title: string;
    description?: string;
}) => {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const supabase = createSupabaseClient();

    const { data, error } = await supabase
        .from("projects")
        .insert({
            title: formData.title,
            description: formData.description,
            owner_id: userId,
        })
        .select()
        .single();

    if (error || !data) {
        throw new Error(error?.message || "Failed to create project");
    }

    return data;
};
// --------------------
// GET ALL PROJECTS (current user)
// --------------------
export const getAllProjects = async ({
                                         limit = 10,
                                         page = 1,
                                     }: {
    limit?: number;
    page?: number;
}) => {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const supabase = createSupabaseClient();

    const from = (page - 1) * limit;
    const to = page * limit - 1;

    const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("owner_id", userId)
        .order("created_at", { ascending: false })
        .range(from, to);

    if (error || !data) {
        throw new Error(error?.message || "Failed to fetch projects");
    }

    return data;
};
// --------------------
// GET SINGLE PROJECT
// --------------------
export const getProjectById = async (id: string) => {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const supabase = createSupabaseClient();

    const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();

    if (error || !data) {
        throw new Error(error?.message || "Project not found");
    }

    return data;
};
// --------------------
// UPDATE PROJECT
// --------------------
export const updateProject = async (
    id: string,
    updates: {
        title?: string;
        description?: string;
    }
) => {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const supabase = createSupabaseClient();

    const { data, error } = await supabase
        .from("projects")
        .update(updates)
        .eq("id", id)
        .eq("owner_id", userId)
        .select()
        .single();

    if (error || !data) {
        throw new Error(error?.message || "Failed to update project");
    }

    return data;
};
// --------------------
// DELETE PROJECT
// --------------------
export const deleteProject = async (id: string) => {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const supabase = createSupabaseClient();

    const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", id)
        .eq("owner_id", userId);

    if (error) {
        throw new Error(error.message || "Failed to delete project");
    }

    return true;
};
