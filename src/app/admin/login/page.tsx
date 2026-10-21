import Link from "next/link";
import { loginAction } from "@/app/admin/actions";

type LoginPageProps = PageProps<"/admin/login">;

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const { error } = await searchParams;
  const message =
    error === "config"
      ? "Konfigurasi Supabase belum lengkap."
      : error === "empty"
        ? "Email dan password wajib diisi."
        : error
          ? "Email atau password tidak cocok."
          : null;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fff8f7] px-4 py-12 text-[#351616] dark:bg-[#1b1010] dark:text-red-50">
      <section className="w-full max-w-md border-t-4 border-red-700 bg-white p-7 shadow-xl shadow-red-950/5 dark:bg-[#251414] sm:p-9">
        <Link
          href="/"
          className="text-sm font-semibold text-red-700 hover:underline dark:text-red-300"
        >
          Kembali ke portfolio
        </Link>
        <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-red-700 dark:text-red-300">
          Area pemilik
        </p>
        <h1 className="mt-2 text-3xl font-black">Masuk admin</h1>
        <p className="mt-2 text-sm text-[#755454] dark:text-red-100/70">
          Gunakan akun admin Supabase yang sudah dibuat.
        </p>

        {message && (
          <p
            role="alert"
            className="mt-5 border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-100"
          >
            {message}
          </p>
        )}

        <form action={loginAction} className="mt-7 space-y-5">
          <label className="block text-sm font-semibold">
            Email
            <input
              name="email"
              type="email"
              autoComplete="username"
              required
              className="mt-2 w-full rounded-md border border-red-200 bg-white px-3 py-2.5 font-normal outline-none focus:border-red-700 focus:ring-2 focus:ring-red-700/15 dark:border-red-900 dark:bg-[#1b1010]"
            />
          </label>
          <label className="block text-sm font-semibold">
            Password
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-2 w-full rounded-md border border-red-200 bg-white px-3 py-2.5 font-normal outline-none focus:border-red-700 focus:ring-2 focus:ring-red-700/15 dark:border-red-900 dark:bg-[#1b1010]"
            />
          </label>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-md bg-red-700 px-4 py-3 font-bold text-white transition hover:bg-red-800"
          >
            Masuk
          </button>
        </form>
      </section>
    </main>
  );
}
