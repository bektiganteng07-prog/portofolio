"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import { getAuthenticatedAdmin } from "@/lib/admin-auth";

function getProjectValues(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const href = String(formData.get("href") ?? "").trim();
  const imageUrl = String(formData.get("image_url") ?? "").trim();
  const imageAlt = String(formData.get("image_alt") ?? "").trim();
  const stack = String(formData.get("stack") ?? "")
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean);

  if (!title || !description || !href || stack.length === 0) return null;
  const isSafeRoute = href.startsWith("/") && !href.startsWith("//");
  const isSafeExternalUrl =
    URL.canParse(href) && ["http:", "https:"].includes(new URL(href).protocol);
  if (!isSafeRoute && !isSafeExternalUrl) return null;
  if (
    imageUrl &&
    (!URL.canParse(imageUrl) ||
      !["http:", "https:"].includes(new URL(imageUrl).protocol))
  ) {
    return null;
  }

  return {
    title,
    description,
    href,
    stack,
    image_url: imageUrl || null,
    image_alt: imageAlt || null,
  };
}

function redirectWithError(path: string, message: string): never {
  redirect(`${path}?error=${encodeURIComponent(message)}`);
}

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const supabase = await getSupabaseServerClient();

  if (!supabase) redirectWithError("/admin/login", "config");
  if (!email || !password) redirectWithError("/admin/login", "empty");

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirectWithError("/admin/login", "credentials");

  redirect("/admin/proyek");
}

export async function logoutAction() {
  const supabase = await getSupabaseServerClient();
  if (supabase) await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function createProjectAction(formData: FormData) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) redirect("/admin/login");

  const project = getProjectValues(formData);
  if (!project) redirectWithError("/admin/proyek", "invalid");

  const { error } = await admin.supabase.from("proyek").insert(project);
  if (error) redirectWithError("/admin/proyek", "save");

  revalidatePath("/");
  revalidatePath("/admin/proyek");
  redirect("/admin/proyek?status=created");
}

export async function updateProjectAction(formData: FormData) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) redirect("/admin/login");

  const id = String(formData.get("id") ?? "");
  const project = getProjectValues(formData);
  if (!/^\d+$/.test(id) || !project) {
    redirectWithError(
      `/admin/proyek/edit/${encodeURIComponent(id)}`,
      "invalid",
    );
  }

  const { data, error } = await admin.supabase
    .from("proyek")
    .update(project)
    .eq("id", Number(id))
    .select("id");

  if (error || !data?.length) {
    redirectWithError(`/admin/proyek/edit/${id}`, "save");
  }

  revalidatePath("/");
  revalidatePath("/admin/proyek");
  redirect("/admin/proyek?status=updated");
}

export async function deleteProjectAction(formData: FormData) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) redirect("/admin/login");

  const id = String(formData.get("id") ?? "");
  if (!/^\d+$/.test(id)) redirect("/admin/proyek");

  const { data, error } = await admin.supabase
    .from("proyek")
    .delete()
    .eq("id", Number(id))
    .select("id");

  if (error || !data?.length) {
    redirectWithError(`/admin/proyek/hapus/${id}`, "delete");
  }

  revalidatePath("/");
  revalidatePath("/admin/proyek");
  redirect("/admin/proyek?status=deleted");
}
