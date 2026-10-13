"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Camera,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import Topbar from "../../components/ui/layout/page";
import EvilEye from "../../components/EvilEye";
import { getSupabaseClient } from "@/lib/supabase";
import koperlineImage from "../../Screenshot 2026-09-23 203723.png";
import gitaSuradiraImage from "../../Screenshot 2026-09-23 203542.png";
import personalPortfolioImage from "../../Screenshot 2026-10-14 011604.png";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const projectFallbackImages = {
  KoperLine: koperlineImage,
  "Web Gita Suradira": gitaSuradiraImage,
  "Personal Portfolio": personalPortfolioImage,
};

type Project = {
  id: number;
  title: string;
  description: string;
  stack: string[];
  href: string;
  image_url: string | null;
  image_alt: string | null;
};

const skills = [
  {
    name: "HTML",
    description: "Building clean and accessible web page structures.",
  },
  {
    name: "CSS",
    description: "Styling layouts, colors, and responsive website designs.",
  },
  {
    name: "JavaScript",
    description:
      "Making websites interactive with dynamic logic and functionality.",
  },
  {
    name: "Next.js",
    description:
      "Building fast web applications with modern routing and rendering.",
  },
  {
    name: "Supabase",
    description:
      "Providing databases, authentication, and backend services for web apps.",
  },
  {
    name: "TypeScript",
    description:
      "Writing JavaScript with types for safer and more structured code.",
  },
];

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState<string | null>(null);
  const emailAddress = "ibrafirmansyahbekti@gmail.com";

  const handleContactSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const subject = `Portfolio contact from ${formData.get("name")}`;
    const body = `Name: ${formData.get("name")}\nEmail: ${formData.get(
      "email",
    )}\n\n${formData.get("message")}`;
    const composeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      emailAddress,
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.open(composeUrl, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let isActive = true;

    const loadProjects = async () => {
      const supabase = getSupabaseClient();
      if (!supabase) {
        setProjectsError(
          "Supabase belum dikonfigurasi. Isi NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.",
        );
        setProjectsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("proyek")
        .select("id, title, description, stack, href, image_url, image_alt")
        .order("id", { ascending: true });

      if (!isActive) return;

      if (error) {
        setProjectsError(
          "Data proyek gagal dimuat. Periksa tabel proyek dan policy SELECT Supabase.",
        );
      } else {
        setProjects(data ?? []);
      }
      setProjectsLoading(false);
    };

    void loadProjects();
    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    const updateTheme = () => {
      const dark = document.documentElement.classList.contains("dark");
      setIsDarkMode(dark);
    };

    updateTheme();

    const observer = new MutationObserver(() => updateTheme());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#3f0707] text-foreground transition-colors duration-500">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <EvilEye
            eyeColor={isDarkMode ? "#EF4444" : "#FFFFFF"}
            intensity={0.6}
            pupilSize={0.55}
            irisWidth={0.35}
            glowIntensity={0.3}
            scale={0.9}
            noiseScale={1.6}
            pupilFollow={1}
            flameSpeed={1}
            backgroundColor="#000000"
            lightMode={!isDarkMode}
          />
        </div>
      </div>

      <div
        className={`fixed inset-0 z-60 flex items-center justify-center overflow-hidden bg-linear-to-br from-[#420909] via-[#6a1111] to-[#8b1d1d] text-white transition-opacity duration-700 ${
          showIntro ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="relative z-10 text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.7em] text-red-100">
            Portfolio
          </p>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-7xl">
            Bekti ibrafirmansyah
          </h1>
          <p className="mt-4 text-sm font-medium uppercase tracking-[0.35em] text-red-100 sm:text-base">
            Frontend Developer • UI Designer
          </p>
        </div>
      </div>

      <div className="relative z-10">
        <Topbar />

        <main className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
          <section
            id="home"
            className="grid items-center gap-12 pb-20 pt-8 lg:grid-cols-[1.2fr_0.8fr] lg:pt-16"
          >
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500 bg-red-50 px-3 py-1 text-sm text-red-600 dark:border-red-200/80 dark:bg-red-600 dark:text-red-50">
                <Sparkles className="h-4 w-4" />
                Available for freelance work
              </div>

              <h1 className="max-w-xl text-4xl font-black tracking-tight text-red-600 sm:text-5xl lg:text-6xl dark:text-white">
                I craft{" "}
                <span className="bg-linear-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent dark:text-white">
                  modern digital experiences
                </span>{" "}
                that feel premium.
              </h1>

              <p className="mt-6 max-w-xl text-lg font-bold leading-8 text-red-600/90 dark:text-white/90">
                I&apos;m a product-focused developer and designer building
                interfaces that blend performance, clarity, and bold visual
                storytelling.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#projects"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-red-500 via-red-600 to-red-700 px-5 py-3 font-semibold text-white shadow-lg shadow-red-500/20 transition hover:brightness-110"
                >
                  View Projects
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-xl border px-5 py-3 font-semibold text-red-500 transition border-red-500 hover:bg-white dark:border-white dark:text-white/90 dark:hover:bg-red-500 dark:hover:border-white"
                >
                  Book a Call
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-6 text-sm font-bold text-red-600/90 dark:text-white/90">
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-red dark:text-white/90" />
                  Jl. Erlangga GG.03 No.04, Pasuruan City
                </span>
                <span className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-red dark:text-white/90" />{" "}
                  ibrafirmansyahbekti@gmail.com
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-linear-to-br from-red-200/70 via-red-100/50 to-pink-100/50 blur-2xl dark:bg-red-900/30" />
              <div className="relative overflow-hidden rounded-[2rem] border border-red-100 bg-white p-5 shadow-2xl shadow-red-100/80 backdrop-blur-xl dark:border-red-200/20 dark:bg-[#5f1010] dark:shadow-[0_20px_60px_rgba(29,7,7,0.45)]">
                <div className="rounded-[1.5rem] border border-red-100 bg-red-50/70 p-5 text-red-600 dark:border-red-200/20 dark:bg-[#731919] dark:text-red-50">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-red-500 dark:text-red-200">
                        Profile
                      </p>
                      <h2 className="mt-2 text-2xl font-bold text-red-600 dark:text-white">
                        Bekti ibrafirmansyah
                      </h2>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-red-500 to-red-700 font-bold text-white">
                      BI
                    </div>
                  </div>

                  <div className="relative mt-4 aspect-2/3 w-full rounded-[1.5rem] bg-[repeating-conic-gradient(from_0deg,#f5222d_0deg_18deg,#ffffff_18deg_36deg)] p-2 shadow-[0_20px_60px_rgba(239,68,68,0.35)] dark:bg-[#a12727]">
                    <div className="relative h-full w-full overflow-hidden rounded-[1.1rem] bg-white shadow-[0_0_18px_rgba(239,68,68,0.35)] dark:bg-[#a12727]">
                      <Image
                        src="/profile-photo.jpeg"
                        alt="Foto profil Bekti Ibrafirmansyah"
                        fill
                        sizes="(min-width: 1024px) 36vw, 100vw"
                        className="object-contain object-center"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            id="about"
            className="grid gap-10 border-t border-red-100 py-20 lg:grid-cols-[0.8fr_1.2fr] dark:border-red-200/20"
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-red-600 dark:text-red-200">
                About
              </p>
              <h2 className="mt-4 text-3xl font-bold text-red-600 dark:text-white">
                I build delightful products people genuinely enjoy using.
              </h2>
            </div>
            <div className="space-y-5 text-lg font-bold leading-8 text-red-600 dark:text-red-100">
              <p>
                My work sits at the intersection of design and engineering. I
                love transforming rough ideas into polished interfaces with
                strong visual hierarchy, intuitive interactions, and measurable
                business impact.
              </p>
              <p>
                I focus on clean systems, scalable front-end architecture, and
                product experiences that feel as good as they look. From concept
                to launch, I bring clarity, speed, and thoughtful execution.
              </p>
            </div>
          </section>

          <section
            id="projects"
            className="border-t border-red-100 py-20 dark:border-red-200/20"
          >
            <div className="mb-10 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-red-600 dark:text-red-200">
                  Projects
                </p>
                <h2 className="mt-4 text-3xl font-bold text-red-600 dark:text-white">
                  Selected work
                </h2>
              </div>
              <Link
                href="#contact"
                className="hidden text-sm font-medium text-red-600 md:inline-flex dark:text-red-200"
              >
                Let&apos;s collaborate →
              </Link>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {projects.map((project) => {
                const isPersonalPortfolio =
                  project.title === "Personal Portfolio";
                const projectHref = isPersonalPortfolio
                  ? "/projects/personal-portfolio"
                  : project.href;
                const imageSrc = isPersonalPortfolio
                  ? projectFallbackImages["Personal Portfolio"]
                  : project.image_url ||
                    projectFallbackImages[
                      project.title as keyof typeof projectFallbackImages
                    ];
                const imageAlt = isPersonalPortfolio
                  ? "Preview website portofolio Bekti Ibrafirmansyah"
                  : project.image_alt || `${project.title} preview`;

                return (
                  <article
                    key={project.id}
                    className={`rounded-[1.75rem] border-4 border-dashed border-red-600 bg-transparent p-5 ring-2 ring-white transition hover:-translate-y-1 hover:bg-white dark:border-red-300 dark:bg-transparent dark:hover:bg-[#9b2c2c] ${
                      isPersonalPortfolio ? "lg:col-span-2" : ""
                    }`}
                  >
                    <div
                      className={`relative mb-5 overflow-hidden rounded-2xl ${
                        isPersonalPortfolio
                          ? "aspect-2/1 bg-black"
                          : "h-56 bg-red-100 dark:bg-red-900/30"
                      }`}
                    >
                      {imageSrc && (
                        <Image
                          src={imageSrc}
                          alt={imageAlt}
                          fill
                          unoptimized
                          sizes="(min-width: 1024px) 42vw, 100vw"
                          className={
                            isPersonalPortfolio
                              ? "object-contain"
                              : "object-cover"
                          }
                        />
                      )}
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl font-semibold text-red-600 dark:text-white">
                        {project.title}
                      </h3>
                      <Link
                        href={projectHref}
                        aria-label={`View ${project.title} details`}
                        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-600 text-white transition hover:bg-red-700"
                      >
                        <ArrowUpRight className="h-5 w-5" />
                      </Link>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-red-600/90 dark:text-red-100">
                      {project.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <span
                          key={`${project.id}-${item}`}
                          className="rounded-full border border-red-200 bg-white px-2.5 py-1 text-xs text-red-600 dark:border-red-200/20 dark:bg-[#731818] dark:text-red-50"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </article>
                );
              })}
              {!projectsLoading && projectsError && (
                <p role="status" className="text-sm leading-6 text-red-100">
                  {projectsError}
                </p>
              )}
              {!projectsLoading && !projectsError && projects.length === 0 && (
                <p role="status" className="text-sm leading-6 text-red-100">
                  Belum ada proyek di tabel Supabase.
                </p>
              )}
              {projectsLoading && (
                <p role="status" className="text-sm leading-6 text-red-100">
                  Memuat proyek...
                </p>
              )}
            </div>
          </section>

          <section
            id="experience"
            className="border-t border-red-100 py-20 dark:border-red-200/20"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-red-600 dark:text-red-200">
              Skills
            </p>
            <h2 className="mt-4 text-3xl font-bold text-red-600 dark:text-white">
              Languages and technologies I use
            </h2>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="rounded-[1.75rem] border-4 border-dashed border-red-600 bg-transparent p-5 ring-2 ring-white transition hover:-translate-y-1 hover:bg-white dark:border-red-300 dark:bg-transparent dark:hover:bg-[#9b2c2c]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-lg font-semibold text-red-600 dark:text-white">
                      {skill.name}
                    </p>
                    <span className="h-2 w-2 rounded-full bg-red-600" />
                  </div>
                  <p className="mt-2 text-sm leading-6 text-red-600/90 dark:text-red-100">
                    {skill.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section
            id="contact"
            className="border-t border-red-100 py-20 dark:border-red-200/20"
          >
            <div className="rounded-[1.75rem] border-4 border-dashed border-red-600 bg-transparent p-8 ring-2 ring-white transition hover:-translate-y-1 hover:bg-white dark:border-red-300 dark:bg-transparent dark:hover:bg-[#9b2c2c]">
              <div className="mx-auto max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-red-600 dark:text-red-100">
                  Contact
                </p>
                <h2 className="mt-4 text-3xl font-bold text-red-600 dark:text-white">
                  Contact me
                </h2>
                <p className="mt-4 text-red-600/90 dark:text-red-100">
                  Fill out the form below to send a message or discuss a
                  project.
                </p>

                <form
                  onSubmit={handleContactSubmit}
                  className="mt-8 space-y-5 text-left"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="space-y-2 text-sm font-medium text-red-600 dark:text-red-50">
                      Nama
                      <input
                        type="text"
                        name="name"
                        placeholder="Your name"
                        required
                        className="w-full rounded-xl border border-red-200 bg-transparent px-4 py-3 font-normal text-red-600 outline-none transition placeholder:text-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:border-red-200/30 dark:bg-white/10 dark:text-white dark:placeholder:text-red-100/60 dark:focus:ring-red-300/30"
                      />
                    </label>
                    <label className="space-y-2 text-sm font-medium text-red-600 dark:text-red-50">
                      Email
                      <input
                        type="email"
                        name="email"
                        placeholder="nama@email.com"
                        required
                        className="w-full rounded-xl border border-red-200 bg-transparent px-4 py-3 font-normal text-red-600 outline-none transition placeholder:text-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:border-red-200/30 dark:bg-white/10 dark:text-white dark:placeholder:text-red-100/60 dark:focus:ring-red-300/30"
                      />
                    </label>
                  </div>
                  <label className="block space-y-2 text-sm font-medium text-red-600 dark:text-red-50">
                    Message
                    <textarea
                      name="message"
                      rows={5}
                      placeholder="Tell me about the project you want to build..."
                      required
                      className="w-full resize-none rounded-xl border border-red-200 bg-transparent px-4 py-3 font-normal text-red-600 outline-none transition placeholder:text-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:border-red-200/30 dark:bg-white/10 dark:text-white dark:placeholder:text-red-100/60 dark:focus:ring-red-300/30"
                    />
                  </label>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-red-600 transition hover:bg-red-50 dark:bg-white dark:text-red-700 dark:hover:bg-red-50"
                  >
                    Send message
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-red-100 dark:border-red-200/20">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid gap-10 md:grid-cols-[1.5fr_1fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-red-600 dark:text-white/90">
                  Personal portfolio
                </p>
                <h2 className="mt-3 text-2xl font-bold text-red-600 dark:text-white">
                  BEKTI IBRAFIRMANSYAH
                </h2>
                <p className="mt-3 max-w-md leading-7 font-bold text-red-600/90 dark:text-white/90">
                  Software Engineering student at SMK Negeri 1 Pasuruan.
                </p>
                <div className="mt-5 space-y-2 text-sm text-red-600/90 dark:text-white/90">
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=ibrafirmansyahbekti%40gmail.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 transition font-bold hover:text-red-600 dark:hover:text-white/90"
                  >
                    <Mail className="h-4 w-4 text-red-600 dark:text-white" />
                    Email : ibrafirmansyahbekti@gmail.com
                  </a>

                  <a
                    href="https://www.instagram.com/bektii._.i"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 transition font-bold hover:text-red-600 dark:hover:text-white/90"
                  >
                    <Camera className="h-4 w-4 text-red-600 dark:text-white" />
                    Instagram : @Bekti
                  </a>
                </div>
              </div>

              <nav aria-label="Footer navigation">
                <p className="text-sm font-bold uppercase tracking-[0.28em]  text-red-600 dark:text-white/90">
                  Navigation
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm font-bold text-red-600/90 dark:text-white/90">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="transition hover:text-red-600 dark:hover:text-white/90"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </nav>
            </div>

            <div className="mt-10 border-t border-red-100 pt-5 text-sm text-red-600/90 dark:border-red-200/20 dark:text-white/90">
              @2026.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
