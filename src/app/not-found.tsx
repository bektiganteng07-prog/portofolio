import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden px-6 py-16 text-foreground">
      <div aria-hidden="true" className="flag-wave absolute inset-0" />
      <section className="relative z-10 w-full max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-600 dark:text-red-100">
          Halaman tidak ditemukan
        </p>
        <h1 className="mt-5 text-8xl font-black tracking-tight text-red-600 dark:text-white sm:text-9xl">
          404
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base leading-7 text-red-600 dark:text-red-100/80">
          Halaman yang kamu cari mungkin sudah dipindahkan atau alamatnya salah.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-red-500 via-red-600 to-red-700 px-5 py-3 font-semibold text-white shadow-lg shadow-red-500/20 transition hover:brightness-110"
        >
          <ArrowLeft className="h-4 w-4" />
          <Home className="h-4 w-4" />
          Kembali ke Beranda
        </Link>
      </section>
    </main>
  );
}
