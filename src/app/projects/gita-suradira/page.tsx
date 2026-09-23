"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import projectImage from "../../../../Screenshot 2026-09-23 203542.png";

export default function GitaSuradiraPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#fff7f7] px-4 py-10 text-slate-900 sm:px-6 lg:px-8 dark:bg-[#4b0d0d] dark:text-white">
      <div className="mx-auto max-w-4xl">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 transition hover:text-red-800 dark:text-red-200 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to projects
        </button>

        <div className="mt-10">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-red-600 dark:text-red-200">
            Project detail
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
            Web Gita Suradira
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-red-100">
            A personal website designed to present information in a simple and
            engaging way.
          </p>

          <div className="relative mt-10 aspect-video overflow-hidden rounded-3xl border-4 border-dashed border-red-600 bg-red-100 dark:border-red-300 dark:bg-red-900/30">
            <Image
              src={projectImage}
              alt="Gita Suradira website preview"
              fill
              sizes="(min-width: 1024px) 66vw, 100vw"
              className="object-cover"
            />
          </div>

          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 dark:text-red-100">
            Web Gita Suradira is a personal website project created to present
            information in a clean, friendly, and easy-to-understand way. The
            design focuses on a simple layout and a comfortable browsing
            experience.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {["HTML", "CSS", "JavaScript"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-sm text-red-700 dark:border-red-200/20 dark:bg-white/10 dark:text-red-50"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
