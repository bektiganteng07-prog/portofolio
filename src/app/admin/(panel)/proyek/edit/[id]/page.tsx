import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import { getAuthenticatedAdmin } from "@/lib/admin-auth";
import { getSupabasePublicClient } from "@/lib/supabase";
import { updateProjectAction } from "@/app/admin/actions";

type EditProjectPageProps = PageProps<"/admin/proyek/edit/[id]">;

const inputClassName =
  "mt-1 w-full rounded-md border border-red-200 bg-white px-3 py-2 text-sm font-normal outline-none focus:border-red-700 focus:ring-2 focus:ring-red-700/15 dark:border-red-900 dark:bg-[#1b1010]";

export default async function EditProjectPage({
  params,
  searchParams,
}: EditProjectPageProps) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) redirect("/admin/login");

  const [{ id }, query] = await Promise.all([params, searchParams]);
  if (!/^\d+$/.test(id)) notFound();

  const publicSupabase = getSupabasePublicClient();
  if (!publicSupabase) notFound();

  const { data: project, error } = await publicSupabase
    .from("proyek")
    .select("id, title, description, stack, href, image_url, image_alt")
    .eq("id", Number(id))
    .maybeSingle();

  if (error || !project) notFound();

  return (
    <section className="max-w-3xl">
      <Link
        href="/admin/proyek"
        className="inline-flex items-center gap-2 text-sm font-semibold text-red-700 hover:underline dark:text-red-300"
      >
        <ArrowLeft className="size-4" /> Kembali ke daftar proyek
      </Link>
      <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-red-700 dark:text-red-300">
        Perbarui konten
      </p>
      <h1 className="mt-2 text-3xl font-black">Edit proyek</h1>
      <p className="mt-2 text-sm text-[#755454] dark:text-red-100/70">
        ID proyek: {project.id}
      </p>

      {query.error && (
        <p
          role="alert"
          className="mt-6 border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-100"
        >
          {query.error === "invalid"
            ? "Periksa kembali isian proyek."
            : query.error === "42501"
              ? "Supabase menolak perubahan (42501). Jalankan supabase/setup.sql pada project Supabase yang digunakan aplikasi."
              : `Perubahan gagal disimpan (kode ${query.error}). Periksa policy UPDATE Supabase.`}
        </p>
      )}

      <form
        action={updateProjectAction}
        className="mt-7 grid gap-4 sm:grid-cols-2"
      >
        <input type="hidden" name="id" value={project.id} />
        <label className="text-sm font-semibold">
          Nama proyek
          <input
            className={inputClassName}
            name="title"
            defaultValue={project.title}
            required
            maxLength={120}
          />
        </label>
        <label className="text-sm font-semibold">
          Link atau route
          <input
            className={inputClassName}
            name="href"
            defaultValue={project.href}
            required
          />
        </label>
        <label className="text-sm font-semibold sm:col-span-2">
          Deskripsi
          <textarea
            className={inputClassName}
            name="description"
            defaultValue={project.description}
            required
            rows={4}
            maxLength={1200}
          />
        </label>
        <label className="text-sm font-semibold sm:col-span-2">
          Teknologi
          <input
            className={inputClassName}
            name="stack"
            defaultValue={project.stack.join(", ")}
            required
          />
        </label>
        <label className="text-sm font-semibold">
          URL gambar
          <input
            className={inputClassName}
            name="image_url"
            type="url"
            defaultValue={project.image_url ?? ""}
          />
        </label>
        <label className="text-sm font-semibold">
          Alt gambar
          <input
            className={inputClassName}
            name="image_alt"
            defaultValue={project.image_alt ?? ""}
            maxLength={240}
          />
        </label>
        <div className="sm:col-span-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-md bg-red-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-red-800"
          >
            <Save className="size-4" /> Simpan perubahan
          </button>
        </div>
      </form>
    </section>
  );
}
