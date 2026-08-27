"use client";

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import {
  ArrowDown, ArrowUpRight, BrainCircuit, Check, Clipboard, Code2,
  DatabaseZap, Download, Gauge, Linkedin, Mail, Menu, MessageCircle, Phone,
  ServerCog, Sparkles, Trophy, Workflow, Wrench, X, Zap
} from 'lucide-react';
import { type LucideIcon } from 'lucide-react';
import FadeIn from './components/FadeIn';
import Magnet from './components/Magnet';

const premiumEase = [0.22, 1, 0.36, 1] as const;

const navItems = [
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills', id: 'skills' },
  { label: 'Contact', id: 'contact' },
];

const stats = [
  ['4+', 'Years experience'],
  ['Enterprise', 'Applications delivered'],
  ['SAP B1', 'Integrations'],
  ['AI', 'Solutions built'],
];

const experience = [
  {
    company: '10X Software Solutions',
    role: 'Technical Consultant',
    period: 'Aug 2023 — Present',
    points: [
      'Integrated AI Copilot within SAP B1 applications.',
      'Built WhatsApp approval bots.',
      'Developed ESS Portal using ASP.NET MVC and SAP HANA.',
      'Optimized HANA procedures improving performance by 30%.',
    ],
  },
  {
    company: 'Wipro Limited',
    role: 'Project Engineer',
    period: 'Mar 2021 — Nov 2022',
    points: [
      'Developed Commercial LRD platform.',
      'Reduced server resource consumption by 15%.',
      'Improved platform stability and performance.',
      'Worked within Agile delivery environments.',
    ],
  },
];

const projects: Array<{
  title: string;
  category: string;
  description: string;
  tech: string[];
  problem: string;
  impact: string;
  icon: LucideIcon;
  index: string;
}> = [
  {
    index: '01',
    category: 'AI & Enterprise Automation',
    icon: BrainCircuit,
    title: 'SAP B1 AI Copilot',
    description: 'Intelligent assistant embedded directly into enterprise SAP workflows for natural language querying, automated document lookup, and context-aware guided actions.',
    tech: ['SAP B1', 'AI Copilot', 'Service Layer', 'C#', 'Vector Search'],
    problem: 'Teams lost hours navigating complex nested SAP menus and manual database record lookups.',
    impact: 'Reduced query latency by 65% and streamlined repetitive workflow approvals.',
  },
  {
    index: '02',
    category: 'Conversational Enterprise',
    icon: MessageCircle,
    title: 'WhatsApp Approval Bot',
    description: 'Secure, real-time approval engine delivering actionable financial reports, invoice authorizations, and live ERP alerts directly to executive mobile devices.',
    tech: ['WhatsApp Business API', 'SAP B1', 'C#', 'SQL Server', 'Webhooks'],
    problem: 'Critical purchase and invoice approvals were stalled by desktop-only access.',
    impact: 'Accelerated enterprise turnaround times from 48 hours to under 15 minutes.',
  },
  {
    index: '03',
    category: 'Enterprise Web Portal',
    icon: ServerCog,
    title: 'Employee Self-Service Portal',
    description: 'Full-stack enterprise ESS portal engineered with ASP.NET MVC and high-throughput SAP HANA procedures for centralized employee lifecycle management.',
    tech: ['ASP.NET MVC', 'SAP HANA', 'Bootstrap', 'JavaScript', 'REST APIs'],
    problem: 'Disjointed manual HR requests caused compliance bottlenecks and operational friction.',
    impact: 'Centralized 500+ daily employee requests with automated audit trails and role-based ACLs.',
  },
  {
    index: '04',
    category: 'Data Engineering & BI',
    icon: DatabaseZap,
    title: 'Intelligent Reporting Engine',
    description: 'Automated multi-format enterprise reporting engine powered by deeply optimized SAP HANA procedures and automated scheduled distributions.',
    tech: ['SQL', 'SAP HANA', 'Automation', 'Python', 'Reporting Services'],
    problem: 'Manual multi-department reporting consumed hundreds of hours of manual engineering bandwidth.',
    impact: 'Accelerated recurring analytics delivery by 80% with sub-second execution speeds.',
  },
];

const skills: Array<{ category: string; icon: LucideIcon; items: string[] }> = [
  { category: 'Backend', icon: ServerCog, items: ['C#', 'ASP.NET MVC', 'Python', 'Java'] },
  { category: 'Frontend', icon: Code2, items: ['Angular', 'JavaScript', 'HTML', 'CSS', 'Bootstrap', 'jQuery'] },
  { category: 'Database', icon: DatabaseZap, items: ['SAP HANA SQL', 'SQL Server', 'MySQL'] },
  { category: 'Integrations', icon: Workflow, items: ['SAP B1 Service Layer', 'AI Copilot', 'WhatsApp Business API'] },
  { category: 'Tools', icon: Wrench, items: ['Git', 'VS Code', 'SAP B1 Studio', 'Postman'] },
];

const achievements = [
  ['Best Performer of the Quarter', Trophy],
  ['AI Copilot implementation success', BrainCircuit],
  ['Enterprise automation initiatives', Workflow],
  ['Scalable architecture improvements', Sparkles],
  ['Performance optimization achievements', Gauge],
] as const;

/* ── Sticky Project Card Component ────────────────────────── */
function ProjectCard({
  project,
  index,
  totalCards,
  progress,
}: {
  project: (typeof projects)[0];
  index: number;
  totalCards: number;
  progress: MotionValue<number>;
}) {
  const Icon = project.icon;
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const range = [index / totalCards, 1];
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      className="sticky top-24 md:top-32 h-[85vh] flex items-start justify-center"
      style={{ paddingTop: `${index * 28}px` }}
    >
      <motion.div
        style={{
          scale,
          transformOrigin: 'top center',
        }}
        className="w-full h-full max-h-[720px] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col justify-between overflow-hidden shadow-[0_-16px_50px_rgba(0,0,0,0.85)] relative"
      >
        {/* Top Row: Index, Category & Icon Badge */}
        <div className="flex items-center justify-between gap-4 border-b border-[#D7E2EA]/20 pb-4 sm:pb-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="font-mono text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#D7E2EA]/40">
              {project.index}
            </span>
            <span className="rounded-full border-2 border-[#D7E2EA]/30 bg-[#D7E2EA]/5 px-3.5 py-1 font-mono text-[11px] uppercase tracking-widest text-[#D7E2EA]">
              {project.category}
            </span>
          </div>
          <div className="grid size-10 place-items-center rounded-full border border-[#D7E2EA]/20 bg-[#D7E2EA]/5 text-[#77dfc0]">
            <Icon size={18} aria-hidden="true" />
          </div>
        </div>

        {/* Middle/Bottom: Detailed 2-column Grid */}
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center my-auto py-2">
          <div>
            <h3 className="display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#D7E2EA]">
              {project.title}
            </h3>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#D7E2EA]/80">
              {project.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-[#D7E2EA]/25 bg-[#D7E2EA]/5 px-3.5 py-1.5 font-mono text-[11px] text-[#D7E2EA]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right Block: Problem Solved & Measurable Impact */}
          <div className="space-y-4 rounded-[28px] border border-[#D7E2EA]/20 bg-[#0C0C0C]/90 p-5 sm:p-6 backdrop-blur-md">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[.14em] text-[#ffbc6e]">Problem Solved</p>
              <p className="mt-1.5 text-sm leading-6 text-[#D7E2EA]">{project.problem}</p>
            </div>
            <div className="border-t border-[#D7E2EA]/15 pt-4">
              <p className="font-mono text-[10px] uppercase tracking-[.14em] text-[#77dfc0]">Measurable Impact</p>
              <p className="mt-1.5 text-sm leading-6 text-[#D7E2EA]/90">{project.impact}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Project Counter & Status */}
        <div className="flex items-center justify-between border-t border-[#D7E2EA]/15 pt-4 text-[11px] font-mono text-[#D7E2EA]/50 uppercase tracking-widest">
          <span>Project {project.index} / 0{totalCards}</span>
          <span className="flex items-center gap-1.5 text-[#77dfc0]">
            <span className="size-1.5 rounded-full bg-[#77dfc0] animate-pulse" /> Enterprise Production
          </span>
        </div>
      </motion.div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, note }: { eyebrow: string; title: string; note?: string }) {
  return (
    <div className="mb-12 grid gap-5 md:grid-cols-[1fr_280px] md:items-end">
      <div>
        <FadeIn y={15} duration={0.5}>
          <p className="eyebrow mb-5">{eyebrow}</p>
        </FadeIn>
        <FadeIn delay={0.1} y={30}>
          <h2 className="display max-w-3xl text-4xl font-semibold leading-[1.02] tracking-[-.055em] text-[#eaf9f5] sm:text-5xl lg:text-[4.35rem]">{title}</h2>
        </FadeIn>
      </div>
      {note && (
        <FadeIn delay={0.2} y={20}>
          <p className="border-l border-[rgba(119,223,192,.35)] pl-4 text-sm leading-6 text-[#8da7a7]">{note}</p>
        </FadeIn>
      )}
    </div>
  );
}

function ContactAction({ icon: Icon, label, value, href }: { icon: LucideIcon; label: string; value: string; href: string }) {
  const [copied, setCopied] = useState(false);
  async function copyValue() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }
  return (
    <div className="flex items-center justify-between gap-4 border-t hairline py-5">
      <a data-testid={`link-contact-${label.toLowerCase()}`} href={href} className="contact-link flex min-w-0 items-center gap-4 text-[#dff7f2]">
        <span className="grid size-11 shrink-0 place-items-center rounded-full border border-[rgba(119,223,192,.25)] bg-[rgba(119,223,192,.06)] text-[#77dfc0]"><Icon size={18} aria-hidden="true" /></span>
        <span className="min-w-0"><span className="block text-xs uppercase tracking-[.14em] text-[#769091]">{label}</span><span data-testid={`text-contact-${label.toLowerCase()}`} className="block truncate pt-1 text-sm sm:text-base">{value}</span></span>
      </a>
      <button data-testid={`button-copy-${label.toLowerCase()}`} type="button" onClick={copyValue} className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[rgba(194,224,222,.18)] px-3 py-2 text-xs text-[#91a8a8] transition hover:border-[#77dfc0] hover:text-[#dff7f2]">
        {copied ? <Check size={14} aria-hidden="true" /> : <Clipboard size={14} aria-hidden="true" />}
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}

function PortfolioHome() {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -90]);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Single tall scroll container for Projects section
  const projectsContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: projectsProgress } = useScroll({
    target: projectsContainerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const sections = ['hero', ...navItems.map((item) => item.id)].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.2, 0.6] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    setMobileNavOpen(false);
  };

  const totalProjects = projects.length;

  return (
    <main className="portfolio-page relative min-h-[100dvh]">
      {/* ── Progress Bar ──────────────────────────────────── */}
      <motion.div className="fixed left-0 top-0 z-[60] h-1 origin-left bg-[#77dfc0]" style={{ scaleX: progress }} />

      {/* ── Header / Nav ──────────────────────────────────── */}
      <header className="fixed left-0 right-0 top-0 z-50 px-4 py-4 sm:px-6 sm:py-5">
        <motion.nav
          className="glass mx-auto max-w-[1240px] rounded-[1.35rem] px-3 py-3 sm:rounded-full sm:px-5"
          aria-label="Main navigation"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: premiumEase }}
        >
          <div className="relative flex items-center justify-between">
            <Magnet padding={40} strength={5}>
              <a
                data-testid="link-home"
                href="#hero"
                onClick={() => scrollTo('hero')}
                className="group flex items-center"
                aria-label="Kalakonda Sairam Home"
              >
                <span className="grid size-9 place-items-center rounded-full bg-[#dff7f2] font-mono text-xs font-bold text-[#0a1719] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-105">
                  KS
                </span>
              </a>
            </Magnet>

            {/* Centered Navigation Links */}
            <div className="hidden items-center gap-8 md:flex absolute left-1/2 -translate-x-1/2">
              {navItems.map((item, i) => (
                <motion.a
                  data-testid={`link-nav-${item.id}`}
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => scrollTo(item.id)}
                  className={`nav-link text-xs font-medium tracking-wider uppercase ${activeSection === item.id ? 'active text-[#eaf9f5]' : 'text-[#9ab0b0]'}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.06, ease: premiumEase }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <Magnet padding={40} strength={5}>
                <a
                  data-testid="link-linkedin-header"
                  href="https://www.linkedin.com/in/sairam-kalakonda/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open LinkedIn profile"
                  className="grid size-9 place-items-center rounded-full border border-[rgba(194,224,222,.16)] text-[#9ab0b0] transition-colors hover:border-[#77dfc0] hover:text-[#dff7f2]"
                >
                  <Linkedin size={15} aria-hidden="true" />
                </a>
              </Magnet>
              <button
                data-testid="button-toggle-navigation"
                type="button"
                aria-expanded={mobileNavOpen}
                aria-controls="mobile-navigation"
                aria-label="Toggle navigation menu"
                onClick={() => setMobileNavOpen((open) => !open)}
                className="grid size-9 place-items-center rounded-full border border-[rgba(194,224,222,.16)] text-[#9ab0b0] md:hidden"
              >
                {mobileNavOpen ? <X size={17} aria-hidden="true" /> : <Menu size={17} aria-hidden="true" />}
              </button>
            </div>
          </div>
          <AnimatePresence initial={false}>
            {mobileNavOpen && (
              <motion.div id="mobile-navigation" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: premiumEase }} className="mt-3 overflow-hidden border-t hairline pt-2 md:hidden">
                {navItems.map((item, i) => (
                  <motion.a
                    data-testid={`link-mobile-nav-${item.id}`}
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => scrollTo(item.id)}
                    className="block rounded-xl px-3 py-3 text-sm text-[#9ab0b0] hover:bg-[rgba(119,223,192,.08)] hover:text-[#eaf9f5]"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </header>

      {/* ── Hero Section ──────────────────────────────────── */}
      <section id="hero" className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-5 pb-16 pt-32 sm:px-8 lg:px-10">
        <div className="hero-grid absolute inset-0 opacity-70" />
        <div className="grain absolute inset-0" />
        <div className="orbit orbit-a" /><div className="orbit orbit-b" />
        <motion.div style={{ y: heroY }} className="relative z-10 mx-auto flex w-full max-w-[1000px] flex-col items-center text-center">
          <FadeIn delay={0.15} y={20}>
            <p className="mb-7 inline-flex items-center gap-2 rounded-full border border-[rgba(119,223,192,.26)] bg-[rgba(119,223,192,.06)] px-4 py-2 font-mono text-[10px] uppercase tracking-[.14em] text-[#9fe9d0]">
              <span className="status-dot" />Available for intelligent enterprise systems
            </p>
          </FadeIn>
          <FadeIn delay={0.3} y={40} className="w-full">
            <p className="eyebrow justify-center mb-5">AI-enabled full stack engineer</p>
            <h1 data-testid="text-name" className="display mx-auto w-full max-w-5xl text-[clamp(1.85rem,7.2vw,6.4rem)] font-semibold leading-[1.08] tracking-[-.06em] text-[#eaf9f5] whitespace-nowrap">
              Kalakonda <span className="gradient-text-shimmer">Sairam<span className="text-[#ffbc6e]" style={{ WebkitTextFillColor: '#ffbc6e' }}>.</span></span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.5} y={25}>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-[#9ab0b0] sm:text-xl">
              Building Intelligent Enterprise Experiences.<br />Transforming SAP Workflows with AI.
            </p>
          </FadeIn>
          <FadeIn delay={0.65} y={20} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Magnet padding={80} strength={5}>
              <a href="#projects" className="cta-primary inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#dff7f2] px-6 text-sm font-semibold text-[#0a1719] shadow-[0_12px_30px_rgba(119,223,192,.14)] hover:bg-white">
                View selected work <ArrowDown size={16} aria-hidden="true" />
              </a>
            </Magnet>
            <Magnet padding={80} strength={5}>
              <a href="/K_Sairam_Resume.pdf" download className="cta-primary inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-[rgba(194,224,222,.2)] bg-[rgba(194,224,222,.05)] px-6 text-sm font-semibold text-[#dff7f2] hover:border-[rgba(119,223,192,.55)] hover:bg-[rgba(119,223,192,.08)]">
                Download resume <Download size={16} aria-hidden="true" />
              </a>
            </Magnet>
          </FadeIn>
          <FadeIn delay={0.9} y={10}>
            <div className="mt-16 flex items-center justify-center gap-4 text-[#769091]">
              <span className="scroll-cue h-px w-12 origin-left bg-[#77dfc0]" />
              <span className="font-mono text-[10px] uppercase tracking-[.16em]">Scroll to explore</span>
              <span className="scroll-cue h-px w-12 origin-right bg-[#77dfc0]" />
            </div>
          </FadeIn>
        </motion.div>
      </section>

      {/* ── About Section ─────────────────────────────────── */}
      <section id="about" className="section-wrap">
        <SectionHeading eyebrow="About / 01" title="Enterprise engineering with an AI-first operating model." note="Reliable architecture, practical automation, measurable gains." />
        <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
          <FadeIn>
            <p data-testid="text-biography" className="text-xl leading-9 text-[#a9bcbc] sm:text-2xl">
              Kalakonda Sairam is an AI-enabled full stack engineer with 4+ years of experience delivering enterprise-grade solutions across ASP.NET MVC, Angular, SAP Business One, and SAP HANA. His work connects reliable application architecture with practical AI Copilot implementations, workflow automation, and measurable performance gains.
            </p>
          </FadeIn>
          <div className="grid grid-cols-2 gap-x-10 gap-y-10 lg:pt-2">
            {stats.map(([value, label], index) => (
              <FadeIn key={label} delay={index * 0.1} x={index % 2 === 0 ? -20 : 20} y={0}>
                <div className="metric">
                  <strong data-testid={`text-stat-${index}`}>{value}</strong>
                  <span>{label}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Experience Section ────────────────────────────── */}
      <section id="experience" className="section-wrap border-t hairline">
        <SectionHeading eyebrow="Experience / 02" title="Built inside high-pressure enterprise delivery environments." note="A bias toward the useful: ship, measure, refine." />
        <div className="relative space-y-6">
          <div className="timeline-line absolute bottom-4 left-[7px] top-4 hidden w-px md:block" />
          {experience.map((item, index) => (
            <FadeIn key={item.company} delay={index * 0.15} x={-30} y={0} className="relative md:pl-14">
              <span className="absolute left-0 top-8 hidden size-4 rounded-full border-2 border-[#77dfc0] bg-[#071014] md:block" />
              <article data-testid={`card-experience-${index}`} className="glass glass-interactive rounded-[1.75rem] p-6 sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><p className="font-mono text-[10px] uppercase tracking-[.16em] text-[#77dfc0]">0{index + 1} / {item.role}</p><h3 className="display mt-3 text-3xl font-semibold tracking-[-.04em] text-[#eaf9f5]">{item.company}</h3></div><p className="w-fit rounded-full border border-[rgba(194,224,222,.17)] px-3 py-2 font-mono text-[10px] text-[#8da7a7]">{item.period}</p></div>
                <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                  {item.points.map((point, pi) => (
                    <FadeIn key={point} delay={0.1 + pi * 0.08} y={12}>
                      <li data-testid={`text-experience-point-${index}-${pi}`} className="flex gap-3 text-sm leading-6 text-[#a9bcbc]"><Zap size={15} className="mt-1 shrink-0 text-[#ffbc6e]" aria-hidden="true" />{point}</li>
                    </FadeIn>
                  ))}
                </ul>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Selected Work Section — Sticky Stacking Cards ──── */}
      <section
        id="projects"
        ref={projectsContainerRef}
        className="section-wrap relative border-t hairline pb-24"
        style={{ minHeight: `${totalProjects * 100}vh` }}
      >
        <SectionHeading
          eyebrow="Selected work / 03"
          title="Systems that turn enterprise friction into intelligent workflows."
          note="The work lives where software meets the way teams actually operate."
        />
        
        <div className="relative mt-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              totalCards={totalProjects}
              progress={projectsProgress}
            />
          ))}
        </div>
      </section>

      {/* ── Skills Section ────────────────────────────────── */}
      <section id="skills" className="section-wrap border-t hairline">
        <SectionHeading eyebrow="Capabilities / 04" title="A practical stack for SAP-aware, AI-enabled product engineering." note="Deep where it matters. Comfortable across the whole system." />
        <FadeIn>
          <div className="overflow-hidden rounded-[2rem] border border-[rgba(194,224,222,.13)] bg-[rgba(17,34,39,.42)] backdrop-blur-[18px]">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <FadeIn key={skill.category} delay={index * 0.08} y={15}>
                  <div className={`flex flex-col gap-5 px-7 py-6 sm:flex-row sm:items-center sm:gap-8 sm:px-9 sm:py-7 ${index < skills.length - 1 ? 'border-b border-[rgba(194,224,222,.1)]' : ''}`}>
                    <div className="flex shrink-0 items-center gap-3 sm:w-44">
                      <span className="grid size-9 place-items-center rounded-xl border border-[rgba(119,223,192,.2)] bg-[rgba(119,223,192,.06)] text-[#77dfc0]">
                        <Icon size={16} aria-hidden="true" />
                      </span>
                      <h3 className="font-mono text-[11px] font-medium uppercase tracking-[.14em] text-[#77dfc0]">{skill.category}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      {skill.items.map((item, ii) => (
                        <FadeIn key={item} delay={0.15 + ii * 0.04} scale={0.9} y={8}>
                          <span data-testid={`text-skill-${item.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="skill-pill rounded-full border border-[rgba(194,224,222,.14)] bg-[rgba(194,224,222,.05)] px-4 py-2.5 text-[13px] text-[#b8cece]">{item}</span>
                        </FadeIn>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </FadeIn>
      </section>

      {/* ── Achievements Section ──────────────────── */}
      <section id="achievements" className="section-wrap border-t hairline">
        <SectionHeading eyebrow="Recognition / 05" title="Outcomes shaped by measurable engineering impact." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {achievements.map(([achievement, Icon], index) => (
            <FadeIn key={achievement} delay={index * 0.08} y={25} scale={0.95}>
              <article data-testid={`card-achievement-${index}`} className="achievement-card glass group relative min-h-[190px] overflow-hidden rounded-[1.5rem] p-5">
                <div className="absolute -right-4 -top-5 size-24 rounded-full bg-[rgba(119,223,192,.1)] blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:bg-[rgba(255,188,110,.18)]" />
                <Icon size={21} className="relative text-[#ffbc6e]" aria-hidden="true" />
                <p className="relative mt-12 text-base font-semibold leading-6 text-[#dff7f2]">{achievement}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Contact Section ───────────────────────────────── */}
      <section id="contact" className="section-wrap border-t hairline pb-16">
        <SectionHeading eyebrow="Contact / 06" title="Let's build something intelligent." note="Good systems begin with a clear problem and a direct conversation." />
        <div className="grid gap-7 lg:grid-cols-2 lg:items-stretch">
          <FadeIn x={-30} y={0}>
            <div className="contact-cta relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] p-8 sm:p-10">
              <div>
                <div className="mb-8 flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-full bg-[#0a1719]/10"><Mail size={18} aria-hidden="true" /></span>
                  <span className="font-mono text-[10px] uppercase tracking-[.16em] text-[#0a1719]/50">Open to opportunities</span>
                </div>
                <h3 className="display max-w-lg text-2xl font-semibold leading-[1.2] tracking-[-.04em] text-[#0a1719] sm:text-[1.75rem]">
                  Available for enterprise full-stack engineering, SAP B1 extensions, AI copilots, and workflow automation.
                </h3>
              </div>
              <Magnet padding={100} strength={4}>
                <a data-testid="link-start-conversation" href="mailto:sairamkalakonda1998@gmail.com" className="cta-primary group mt-10 inline-flex w-fit items-center gap-3 rounded-full bg-[#0a1719] px-6 py-3.5 text-sm font-semibold text-[#dff7f2] hover:gap-4 hover:bg-[#112227]">
                  Start a conversation <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:rotate-45" aria-hidden="true" />
                </a>
              </Magnet>
            </div>
          </FadeIn>
          <FadeIn delay={0.15} x={30} y={0}>
            <div className="flex h-full flex-col rounded-[2rem] border border-[rgba(194,224,222,.13)] bg-[rgba(17,34,39,.54)] backdrop-blur-[18px]">
              <div className="flex-1 px-7 pt-7 sm:px-9 sm:pt-9">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[.16em] text-[#77dfc0]">Get in touch</p>
                <p className="max-w-sm text-sm leading-6 text-[#8da7a7]">Reach out through any of the channels below. I typically respond within 24 hours.</p>
              </div>
              <div className="mt-auto px-7 pb-2 sm:px-9 sm:pb-3">
                <ContactAction icon={Mail} label="Email" value="sairamkalakonda1998@gmail.com" href="mailto:sairamkalakonda1998@gmail.com" />
                <ContactAction icon={Phone} label="Phone" value="+91 7013883110" href="tel:+917013883110" />
                <ContactAction icon={Linkedin} label="LinkedIn" value="linkedin.com/in/sairam-kalakonda" href="https://www.linkedin.com/in/sairam-kalakonda/" />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────── */}
      <FadeIn y={10}>
        <footer className="border-t hairline px-5 py-8 sm:px-8">
          <div className="mx-auto flex max-w-[1240px] flex-col justify-between gap-3 text-xs text-[#769091] sm:flex-row"><span>Designed and engineered by Kalakonda Sairam.</span><span className="font-mono">© {new Date().getFullYear()} / KS</span></div>
        </footer>
      </FadeIn>
    </main>
  );
}

export default PortfolioHome;
