import Link from "next/link";
import { LogOut, PanelsTopLeft } from "lucide-react";
import { logoutAction } from "@/app/admin/actions";

export default function AdminPanelLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="min-h-screen bg-[#fff8f7] text-[#351616] dark:bg-[#1b1010] dark:text-red-50">
      <header className="border-b border-red-200 bg-white/90 dark:border-red-950 dark:bg-[#251414]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link
            href="/admin/proyek"
            className="flex items-center gap-3 font-bold"
          >
            <span className="flex size-9 items-center justify-center rounded-lg bg-red-700 text-white">
              <PanelsTopLeft className="size-5" />
            </span>
            <span>Portfolio Admin</span>
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-md border border-red-200 px-3 py-2 text-sm font-semibold text-red-800 transition hover:bg-red-50 dark:border-red-900 dark:text-red-100 dark:hover:bg-red-950"
            >
              <LogOut className="size-4" />
              Keluar
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        {children}
      </main>
    </div>
  );
}
