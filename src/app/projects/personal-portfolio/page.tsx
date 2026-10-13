import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import portfolioScreenshot from "../../../../Screenshot 2026-10-14 011604.png";

const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Supabase",
];

export default function PersonalPortfolioPage() {
  return (
    <main className="min-h-screen bg-[#fff7f7] px-4 py-10 text-red-600 sm:px-6 lg:px-8 dark:bg-[#4b0d0d] dark:text-white">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 transition hover:text-red-500 dark:text-red-200 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to projects
        </Link>

        <section className="mt-10">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-red-600 dark:text-red-200">
            Project detail
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
            Personal Portfolio
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-red-600 dark:text-red-100">
            A personal portfolio for introducing Bekti Ibrafirmansyah and
            showcasing his selected work, skills, and contact information.
          </p>

          <div className="relative mt-10 aspect-2/1 w-full overflow-hidden rounded-3xl border-4 border-dashed border-red-600 bg-black dark:border-red-300">
            <Image
              src={portfolioScreenshot}
              alt="Screenshot tampilan website portofolio Bekti Ibrafirmansyah"
              fill
              sizes="(min-width: 1024px) 66vw, 100vw"
              className="object-contain"
            />
          </div>

          <p className="mt-6 max-w-3xl text-base leading-8 text-red-600 dark:text-red-100">
            The site brings together a responsive profile page, project detail
            pages, and a project list loaded from Supabase. Its visual system
            pairs a bold red palette with a clear layout across desktop and
            mobile screens.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-sm text-red-600 dark:border-red-200/20 dark:bg-white/10 dark:text-red-50"
              >
                {technology}
              </span>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
