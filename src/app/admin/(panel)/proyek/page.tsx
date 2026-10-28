import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowUpRight, Pencil, Plus, Trash2 } from "lucide-react";
import { getAuthenticatedAdmin } from "@/lib/admin-auth";
import { getSupabasePublicClient } from "@/lib/supabase";
import { createProjectAction } from "@/app/admin/actions";

type ProjectsPageProps = PageProps<"/admin/proyek">;

const inputClassName =
  "mt-1 w-full rounded-md border border-red-200 bg-white px-3 py-2 text-sm font-normal outline-none focus:border-red-700 focus:ring-2 focus:ring-red-700/15 dark:border-red-900 dark:bg-[#1b1010]";

export default async function AdminProjectsPage({
  searchParams,
}: ProjectsPageProps) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) redirect("/admin/login");

  const publicSupabase = getSupabasePublicClient();
  if (!publicSupabase) {
    return (
      <section className="max-w-3xl">
        <h1 className="text-3xl font-black">Proyek</h1>
        <p
          role="alert"
          className="mt-6 border border-red-300 bg-red-50 px-4 py-4 text-sm text-red-900"
        >
          Konfigurasi Supabase belum lengkap. Periksa URL dan publishable key.
        </p>
      </section>
    );
  }

  const [{ data, error }, query] = await Promise.all([
    publicSupabase
      .from("proyek")
      .select("id, title, description, stack, href")
      .order("id", { ascending: true }),
    searchParams,
  ]);

  if (error) {
    return (
      <section className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-700 dark:text-red-300">
          Pengelolaan konten
        </p>
        <h1 className="mt-2 text-3xl font-black">Proyek</h1>
        <p
          role="alert"
          className="mt-6 border border-red-300 bg-red-50 px-4 py-4 text-sm leading-6 text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-100"
        >
          Data proyek tidak bisa dibaca. Pastikan tabel{" "}
          <code>public.proyek</code>, policy SELECT untuk role <code>anon</code>
          , dan konfigurasi aplikasi mengarah ke project Supabase yang sama.
        </p>
      </section>
    );
  }

  const statusMessage =
    query.status === "created"
      ? "Proyek berhasil ditambahkan."
      : query.status === "updated"
        ? "Perubahan proyek berhasil disimpan."
        : query.status === "deleted"
          ? "Proyek berhasil dihapus."
          : null;

  return (
    <>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-700 dark:text-red-300">
            Pengelolaan konten
          </p>
          <h1 className="mt-2 text-3xl font-black">Proyek</h1>
          <p className="mt-2 text-sm text-[#755454] dark:text-red-100/70">
            {data.length} proyek tersimpan
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-red-700 hover:underline dark:text-red-300"
        >
          Lihat portfolio <ArrowUpRight className="size-4" />
        </Link>
      </div>

      {statusMessage && (
        <p
          role="status"
          className="mb-6 border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-900 dark:border-green-900 dark:bg-green-950 dark:text-green-100"
        >
          {statusMessage}
        </p>
      )}
      {query.error && (
        <p
          role="alert"
          className="mb-6 border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-100"
        >
          {query.error === "invalid"
            ? "Periksa kembali semua isian proyek."
            : "Proyek gagal disimpan. Periksa policy Supabase."}
        </p>
      )}

      <section aria-labelledby="projects-heading">
        <h2 id="projects-heading" className="sr-only">
          Daftar proyek
        </h2>
        <div className="overflow-x-auto border border-red-200 bg-white dark:border-red-950 dark:bg-[#251414]">
          <table className="w-full min-w-170 text-left text-sm">
            <thead className="border-b border-red-200 bg-red-50 text-xs uppercase tracking-wide text-red-900 dark:border-red-950 dark:bg-red-950/50 dark:text-red-100">
              <tr>
                <th className="px-4 py-3 font-bold">Proyek</th>
                <th className="px-4 py-3 font-bold">Teknologi</th>
                <th className="px-4 py-3 font-bold">Link</th>
                <th className="px-4 py-3 text-right font-bold">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-100 dark:divide-red-950">
              {data.map((project) => (
                <tr key={project.id}>
                  <td className="max-w-sm px-4 py-4">
                    <p className="font-bold">{project.title}</p>
                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#755454] dark:text-red-100/65">
                      {project.description}
                    </p>
                  </td>
                  <td className="px-4 py-4 text-[#755454] dark:text-red-100/70">
                    {project.stack.join(", ")}
                  </td>
                  <td className="max-w-48 truncate px-4 py-4 text-[#755454] dark:text-red-100/70">
                    {project.href}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/proyek/edit/${project.id}`}
                        aria-label={`Edit ${project.title}`}
                        className="inline-flex size-9 items-center justify-center rounded-md border border-red-200 text-red-800 hover:bg-red-50 dark:border-red-900 dark:text-red-100 dark:hover:bg-red-950"
                      >
                        <Pencil className="size-4" />
                      </Link>
                      <Link
                        href={`/admin/proyek/hapus/${project.id}`}
                        aria-label={`Hapus ${project.title}`}
                        className="inline-flex size-9 items-center justify-center rounded-md border border-red-200 text-red-800 hover:bg-red-50 dark:border-red-900 dark:text-red-100 dark:hover:bg-red-950"
                      >
                        <Trash2 className="size-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-10 text-center text-[#755454] dark:text-red-100/70"
                  >
                    Belum ada data di tabel proyek pada project Supabase ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10 max-w-3xl border-t border-red-200 pt-8 dark:border-red-950">
        <div className="mb-5 flex items-center gap-2">
          <Plus className="size-5 text-red-700 dark:text-red-300" />
          <h2 className="text-xl font-bold">Tambah proyek</h2>
        </div>
        <form
          action={createProjectAction}
          className="grid gap-4 sm:grid-cols-2"
        >
          <label className="text-sm font-semibold">
            Nama proyek
            <input
              className={inputClassName}
              name="title"
              required
              maxLength={120}
            />
          </label>
          <label className="text-sm font-semibold">
            Link atau route
            <input
              className={inputClassName}
              name="href"
              required
              placeholder="/projects/nama atau https://..."
            />
          </label>
          <label className="text-sm font-semibold sm:col-span-2">
            Deskripsi
            <textarea
              className={inputClassName}
              name="description"
              required
              rows={3}
              maxLength={1200}
            />
          </label>
          <label className="text-sm font-semibold sm:col-span-2">
            Teknologi
            <input
              className={inputClassName}
              name="stack"
              required
              placeholder="Next.js, TypeScript, Supabase"
            />
          </label>
          <label className="text-sm font-semibold">
            URL gambar (opsional)
            <input className={inputClassName} name="image_url" type="url" />
          </label>
          <label className="text-sm font-semibold">
            Alt gambar (opsional)
            <input
              className={inputClassName}
              name="image_alt"
              maxLength={240}
            />
          </label>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-md bg-red-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-red-800"
            >
              <Plus className="size-4" /> Simpan proyek
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
