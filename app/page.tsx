"use client";

import Lenis from "lenis";
import {
  motion,
  type Variants,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform
} from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  Check,
  Clipboard,
  Code2,
  DatabaseZap,
  Download,
  Gauge,
  Linkedin,
  Mail,
  MessageCircle,
  Phone,
  ServerCog,
  Sparkles,
  Trophy,
  type LucideIcon,
  Workflow,
  Zap
} from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const subtitles = [
  "Building Intelligent Enterprise Experiences.",
  "Transforming SAP Workflows with AI.",
  "Crafting Scalable .NET Applications."
];

const premiumEase = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 38, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: premiumEase }
  }
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.08
    }
  }
};

const stats = [
  ["4+", "Years Experience"],
  ["Enterprise", "Applications Delivered"],
  ["SAP B1", "Integrations"],
  ["AI", "Solutions Built"]
];

const experience = [
  {
    company: "10X Software Solutions",
    role: "Technical Consultant",
    period: "Aug 2023 - Present",
    points: [
      "Integrated AI Copilot within SAP B1 applications.",
      "Built WhatsApp approval bots.",
      "Developed ESS Portal using ASP.NET MVC and SAP HANA.",
      "Optimized HANA procedures improving performance by 30%."
    ]
  },
  {
    company: "Wipro Limited",
    role: "Project Engineer",
    period: "Mar 2021 - Nov 2022",
    points: [
      "Developed Commercial LRD platform.",
      "Reduced server resource consumption by 15%.",
      "Improved platform stability and performance.",
      "Worked within Agile delivery environments."
    ]
  }
];

const projects = [
  {
    icon: BrainCircuit,
    title: "SAP B1 AI Copilot",
    description: "Intelligent assistant embedded into enterprise applications.",
    tech: ["SAP B1", "AI Copilot", "Service Layer"],
    problem: "Teams needed faster answers and guided actions inside SAP workflows.",
    impact: "Reduced decision friction with embedded AI assistance."
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Approval Bot",
    description: "Real-time approvals, reports, and alerts integrated with SAP.",
    tech: ["WhatsApp API", "SAP B1", "C#"],
    problem: "Approval cycles were delayed by desktop-only workflows.",
    impact: "Enabled mobile-first decisions with live enterprise context."
  },
  {
    icon: ServerCog,
    title: "Employee Self-Service Portal",
    description: "ASP.NET MVC application powered by SAP HANA.",
    tech: ["ASP.NET MVC", "SAP HANA", "Bootstrap"],
    problem: "Employee requests needed a reliable self-service layer.",
    impact: "Centralized ESS workflows with enterprise-grade controls."
  },
  {
    icon: DatabaseZap,
    title: "Intelligent Reporting Engine",
    description: "Automated multi-format report generation system.",
    tech: ["SQL", "SAP HANA", "Automation"],
    problem: "Manual reporting consumed delivery bandwidth.",
    impact: "Accelerated recurring insights across operational teams."
  }
];

const skills = {
  Backend: ["C#", "ASP.NET MVC", "Python", "Java"],
  Frontend: ["Angular", "JavaScript", "HTML", "CSS", "Bootstrap", "jQuery"],
  Database: ["SAP HANA SQL", "SQL Server", "MySQL"],
  Integrations: ["SAP B1 Service Layer", "AI Copilot", "WhatsApp Business API"],
  Tools: ["Git"]
};

const achievements = [
  ["Best Performer of the Quarter", Trophy],
  ["AI Copilot implementation success", Bot],
  ["Enterprise automation initiatives", Workflow],
  ["Scalable architecture improvements", Sparkles],
  ["Performance optimization achievements", Gauge]
];

function Section({
  id,
  eyebrow,
  title,
  children,
  className = ""
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative px-5 py-16 sm:px-8 sm:py-24 lg:px-10 ${className}`}>
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
        className="mx-auto max-w-7xl"
      >
        <motion.div variants={fadeUp} className="mb-8 max-w-3xl sm:mb-12">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.26em] text-cyanite/80">
            {eyebrow}
          </p>
          <h2 className="text-balance text-4xl font-semibold tracking-[-0.02em] text-pearl sm:text-5xl lg:text-6xl">
            {title}
          </h2>
        </motion.div>
        {children}
      </motion.div>
    </section>
  );
}

function MagneticButton({
  children,
  href,
  variant = "primary",
  download
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "secondary";
  download?: boolean;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  return (
    <motion.a
      href={href}
      download={download}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * 0.18);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.18);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x, y }}
      whileTap={{ scale: 0.98 }}
      className={`group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition ${
        variant === "primary"
          ? "bg-pearl text-ink shadow-glow hover:bg-white"
          : "border border-white/14 bg-white/[0.04] text-pearl backdrop-blur-xl hover:border-white/28 hover:bg-white/[0.08]"
      }`}
    >
      {children}
    </motion.a>
  );
}

function RotatingSubtitle() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % subtitles.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <motion.p
      key={subtitles[index]}
      initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.55 }}
      className="min-h-[4.75rem] text-balance text-xl leading-8 text-haze sm:min-h-[2rem] sm:text-2xl"
    >
      {subtitles[index]}
    </motion.p>
  );
}

function ParticleField() {
  const particles = useMemo(
    () =>
      Array.from({ length: 34 }, (_, i) => ({
        id: i,
        left: `${(i * 29) % 100}%`,
        top: `${(i * 47) % 100}%`,
        size: 2 + ((i * 7) % 4),
        delay: (i % 8) * 0.22,
        duration: 7 + (i % 6)
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-cyanite/60 shadow-[0_0_18px_rgba(125,211,252,0.8)]"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size
          }}
          animate={{
            y: [0, -36, 0],
            opacity: [0.12, 0.7, 0.12],
            scale: [1, 1.45, 1]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

function ContactAction({
  icon: Icon,
  label,
  value,
  href
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copyValue() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <motion.div
      variants={fadeUp}
      className="group flex flex-col gap-4 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between"
    >
      <a href={href} className="flex min-w-0 items-center gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-full border border-white/12 bg-white/[0.04] text-cyanite transition group-hover:border-cyanite/40 group-hover:bg-cyanite/10">
          <Icon size={19} aria-hidden="true" />
        </span>
        <span className="min-w-0">
          <span className="block text-sm text-haze">{label}</span>
          <span className="block break-words text-base font-medium text-pearl">{value}</span>
        </span>
      </a>
      <button
        type="button"
        onClick={copyValue}
        className="inline-flex h-10 w-fit items-center justify-center gap-2 rounded-full border border-white/12 px-4 text-sm text-haze transition hover:border-white/28 hover:text-pearl"
      >
        {copied ? <Check size={16} aria-hidden="true" /> : <Clipboard size={16} aria-hidden="true" />}
        {copied ? "Copied" : "Copy"}
      </button>
    </motion.div>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.2 });
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, 150]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glow = useMotionTemplate`radial-gradient(520px circle at ${mouseX}px ${mouseY}px, rgba(125, 211, 252, 0.14), transparent 44%)`;

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    let frame = 0;

    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }

    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  useAnimationFrame(() => {
    const root = document.documentElement;
    root.style.setProperty("--scroll-progress", `${scrollYProgress.get()}`);
  });

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_50%_0%,rgba(45,82,110,0.22),transparent_30%),linear-gradient(180deg,#050608_0%,#080b10_45%,#050608_100%)]"
      onMouseMove={(event) => {
        mouseX.set(event.clientX);
        mouseY.set(event.clientY);
      }}
    >
      <motion.div className="fixed left-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-cyanite via-ion to-ember" style={{ scaleX: progress }} />
      <motion.div className="pointer-events-none fixed inset-0 z-10" style={{ background: glow }} />

      <header className="fixed left-0 right-0 top-0 z-40 px-4 py-4 sm:px-8 sm:py-5 lg:px-10">
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-ink/48 px-4 py-3 backdrop-blur-2xl">
          <a href="#hero" className="text-sm font-semibold tracking-wide text-pearl">
            KS
          </a>
          <div className="hidden items-center gap-6 text-sm text-haze md:flex">
            {["About", "Experience", "Projects", "Skills", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-pearl">
                {item}
              </a>
            ))}
          </div>
          <a
            href="https://www.linkedin.com/in/sairam-kalakonda/"
            target="_blank"
            rel="noreferrer"
            aria-label="Open LinkedIn profile"
            className="grid size-9 place-items-center rounded-full border border-white/10 text-haze transition hover:border-white/24 hover:text-pearl"
          >
            <Linkedin size={16} aria-hidden="true" />
          </a>
        </nav>
      </header>

      <section id="hero" className="relative flex min-h-[92svh] items-center px-5 pb-10 pt-24 sm:min-h-screen sm:px-8 sm:pb-16 sm:pt-28 lg:px-10">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image
            src="/images/hero-technology-backdrop.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(5,6,8,0.18),#050608_72%)]" />
        </motion.div>
        <ParticleField />
        <div className="noise absolute inset-0 opacity-35" />
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="relative z-20 mx-auto grid w-full max-w-7xl items-end gap-8 sm:gap-12 lg:grid-cols-[1.15fr_0.85fr]"
        >
          <div>
            <motion.p variants={fadeUp} className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-sm text-haze backdrop-blur-xl">
              <Sparkles size={15} className="text-cyanite" aria-hidden="true" />
              Enterprise AI, SAP B1, and scalable full-stack delivery
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-balance text-5xl font-semibold tracking-[-0.05em] text-white sm:text-7xl lg:text-8xl">
              Kalakonda Sairam
            </motion.h1>
            <motion.h2 variants={fadeUp} className="mt-4 text-2xl font-medium tracking-[-0.01em] text-cyanite sm:mt-5 sm:text-3xl">
              AI-Enabled Full Stack Engineer
            </motion.h2>
            <motion.div variants={fadeUp} className="mt-4 max-w-2xl sm:mt-6">
              <RotatingSubtitle />
            </motion.div>
            <motion.div variants={fadeUp} className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row">
              <MagneticButton href="#projects">
                View Projects <ArrowDown size={17} aria-hidden="true" />
              </MagneticButton>
              <MagneticButton href="/Kalakonda-Sairam-Resume.txt" variant="secondary" download>
                Download Resume <Download size={17} aria-hidden="true" />
              </MagneticButton>
            </motion.div>
          </div>
          <motion.div variants={fadeUp} className="hidden justify-self-end lg:block">
            <div className="relative w-[360px] rounded-[2rem] border border-white/12 bg-white/[0.04] p-5 shadow-lift backdrop-blur-2xl">
              <div className="absolute -inset-px rounded-[2rem] bg-gradient-to-br from-cyanite/30 via-transparent to-ember/20 opacity-70" />
              <div className="relative space-y-4">
                {["SAP B1 Copilot", "WhatsApp approvals", "HANA optimization", "ASP.NET MVC portals"].map((item, index) => (
                  <motion.div
                    key={item}
                    animate={{ x: [0, index % 2 ? -6 : 6, 0] }}
                    transition={{ duration: 5 + index, repeat: Infinity, ease: "easeInOut" }}
                    className="rounded-2xl border border-white/10 bg-ink/58 p-4"
                  >
                    <p className="text-sm text-haze">Capability 0{index + 1}</p>
                    <p className="mt-1 font-medium text-pearl">{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <Section id="about" eyebrow="About" title="Enterprise engineering with an AI-first operating model.">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.p variants={fadeUp} className="text-balance text-xl leading-9 text-haze sm:text-2xl">
            Kalakonda Sairam is an AI-enabled full stack engineer with 4+ years of experience delivering enterprise-grade solutions across ASP.NET MVC, Angular, SAP Business One, and SAP HANA. His work connects reliable application architecture with practical AI Copilot implementations, workflow automation, and measurable performance gains.
          </motion.p>
          <motion.div variants={stagger} className="grid grid-cols-2 gap-4">
            {stats.map(([value, label]) => (
              <motion.div
                key={label}
                variants={fadeUp}
                whileHover={{ y: -6, scale: 1.02 }}
                className="rounded-3xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl"
              >
                <p className="text-4xl font-semibold tracking-[-0.04em] text-white">{value}</p>
                <p className="mt-3 text-sm leading-6 text-haze">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      <Section id="experience" eyebrow="Experience" title="Built inside high-pressure enterprise delivery environments.">
        <div className="relative">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-cyanite/0 via-cyanite/40 to-cyanite/0 md:block" />
          <div className="space-y-8">
            {experience.map((item, index) => (
              <motion.article
                key={item.company}
                variants={fadeUp}
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: index % 2 ? 38 : -38 }}
                viewport={{ once: true, amount: 0.25 }}
                className="relative rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl md:ml-14 md:p-8"
              >
                <span className="absolute -left-[3.85rem] top-8 hidden size-8 rounded-full border border-cyanite/40 bg-ink shadow-[0_0_26px_rgba(125,211,252,0.35)] md:block" />
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold tracking-[-0.02em] text-white">{item.company}</h3>
                    <p className="mt-2 text-cyanite">{item.role}</p>
                  </div>
                  <p className="rounded-full border border-white/10 px-4 py-2 text-sm text-haze">{item.period}</p>
                </div>
                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-6 text-haze">
                      <Zap size={16} className="mt-1 shrink-0 text-ion" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </Section>

      <Section id="projects" eyebrow="Projects" title="Selected systems that turn enterprise friction into intelligent workflows.">
        <motion.div variants={stagger} className="grid gap-5 md:grid-cols-2">
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <motion.article
                key={project.title}
                variants={fadeUp}
                whileHover={{ y: -8, scale: 1.015 }}
                className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-6 shadow-lift backdrop-blur-xl md:min-h-[320px]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyanite/14 via-transparent to-ember/10 opacity-0 transition duration-500 group-hover:opacity-100" />
                <div className="relative">
                  <motion.div
                    whileHover={{ rotate: -6, scale: 1.08 }}
                    className="mb-7 grid size-14 place-items-center rounded-2xl border border-white/12 bg-ink/70 text-cyanite"
                  >
                    <Icon size={24} aria-hidden="true" />
                  </motion.div>
                  <h3 className="text-2xl font-semibold tracking-[-0.02em] text-white">{project.title}</h3>
                  <p className="mt-3 text-base leading-7 text-haze">{project.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-haze">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-7 grid gap-4 opacity-100 transition duration-500 md:translate-y-5 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                    <p className="text-sm leading-6 text-haze">
                      <span className="text-pearl">Problem solved:</span> {project.problem}
                    </p>
                    <p className="text-sm leading-6 text-haze">
                      <span className="text-pearl">Business impact:</span> {project.impact}
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </Section>

      <Section id="skills" eyebrow="Skills" title="A practical stack for SAP-aware, AI-enabled product engineering.">
        <motion.div variants={stagger} className="grid gap-5 lg:grid-cols-5">
          {Object.entries(skills).map(([category, items]) => (
            <motion.div key={category} variants={fadeUp} className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
              <h3 className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-cyanite">
                <Code2 size={16} aria-hidden="true" />
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill, index) => (
                  <motion.span
                    key={skill}
                    animate={{ y: [0, index % 2 ? 5 : -5, 0] }}
                    transition={{ duration: 4 + index * 0.22, repeat: Infinity, ease: "easeInOut" }}
                    className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-2 text-sm text-haze shadow-sm"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <Section id="achievements" eyebrow="Achievements" title="Recognition and outcomes shaped by measurable engineering impact.">
        <motion.div variants={stagger} className="grid gap-4 md:grid-cols-5">
          {achievements.map(([achievement, icon]) => {
            const Icon = icon as typeof Trophy;
            return (
              <motion.div
                key={achievement as string}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5"
              >
                <div className="absolute inset-x-8 -top-16 h-28 rounded-full bg-cyanite/20 blur-3xl transition group-hover:bg-cyanite/30" />
                <Icon size={22} className="relative text-ember" aria-hidden="true" />
                <p className="relative mt-6 text-base font-medium leading-7 text-pearl">{achievement as string}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </Section>

      <Section id="contact" eyebrow="Contact" title="Let's Build Something Intelligent">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div variants={fadeUp} className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-xl sm:p-9">
            <p className="text-xl leading-9 text-haze">
              Available for enterprise full-stack engineering, SAP Business One extensions, AI copilots, workflow automation, and performance-focused application modernization.
            </p>
            <a
              href="mailto:sairamkalakonda1998@gmail.com"
              className="mt-8 inline-flex items-center gap-2 text-lg font-semibold text-pearl transition hover:text-cyanite"
            >
              Start a conversation <ArrowUpRight size={20} aria-hidden="true" />
            </a>
          </motion.div>
          <motion.div variants={stagger} className="rounded-[2rem] border border-white/10 bg-ink/58 px-6 backdrop-blur-xl">
            <ContactAction icon={Mail} label="Email" value="sairamkalakonda1998@gmail.com" href="mailto:sairamkalakonda1998@gmail.com" />
            <ContactAction icon={Phone} label="Phone" value="+91 7013883110" href="tel:+917013883110" />
            <ContactAction icon={Linkedin} label="LinkedIn" value="https://www.linkedin.com/in/sairam-kalakonda/" href="https://www.linkedin.com/in/sairam-kalakonda/" />
          </motion.div>
        </div>
      </Section>

      <footer className="px-5 py-10 text-center text-sm text-haze sm:px-8 lg:px-10">
        Designed and engineered by Kalakonda Sairam.
      </footer>
    </main>
  );
}
