import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, Trash2 } from "lucide-react";
import { getAuthenticatedAdmin } from "@/lib/admin-auth";
import { deleteProjectAction } from "@/app/admin/actions";

type DeleteProjectPageProps = PageProps<"/admin/proyek/hapus/[id]">;

export default async function DeleteProjectPage({
  params,
  searchParams,
}: DeleteProjectPageProps) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) redirect("/admin/login");

  const [{ id }, query] = await Promise.all([params, searchParams]);
  if (!/^\d+$/.test(id)) notFound();

  const { data: project, error } = await admin.supabase
    .from("proyek")
    .select("id, title, description")
    .eq("id", Number(id))
    .maybeSingle();

  if (error || !project) notFound();

  return (
    <section className="max-w-2xl">
      <Link
        href="/admin/proyek"
        className="inline-flex items-center gap-2 text-sm font-semibold text-red-700 hover:underline dark:text-red-300"
      >
        <ArrowLeft className="size-4" /> Batal dan kembali
      </Link>
      <div className="mt-8 border-l-4 border-red-700 bg-white p-6 dark:bg-[#251414] sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-700 dark:text-red-300">
          Konfirmasi penghapusan
        </p>
        <h1 className="mt-3 text-2xl font-black">Hapus {project.title}?</h1>
        <p className="mt-3 text-sm leading-6 text-[#755454] dark:text-red-100/70">
          Data proyek ini akan dihapus dari portfolio dan tidak dapat
          dipulihkan.
        </p>

        {query.error && (
          <p
            role="alert"
            className="mt-5 border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-100"
          >
            Penghapusan gagal. Periksa policy DELETE Supabase.
          </p>
        )}

        <form
          action={deleteProjectAction}
          className="mt-7 flex flex-wrap gap-3"
        >
          <input type="hidden" name="id" value={project.id} />
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-md bg-red-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-red-800"
          >
            <Trash2 className="size-4" /> Ya, hapus proyek
          </button>
          <Link
            href="/admin/proyek"
            className="inline-flex items-center rounded-md border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-900 hover:bg-red-50 dark:border-red-900 dark:text-red-100 dark:hover:bg-red-950"
          >
            Batal
          </Link>
        </form>
      </div>
    </section>
  );
}
