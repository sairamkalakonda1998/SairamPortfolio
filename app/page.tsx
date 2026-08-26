"use client";

import { useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  ArrowDown, ArrowUpRight, BrainCircuit, BriefcaseBusiness, Check, Clipboard, Code2,
  DatabaseZap, Download, Gauge, Linkedin, Mail, Menu, MessageCircle, Phone, ScrollText,
  ServerCog, Sparkles, Trophy, Workflow, Wrench, X, Zap,
} from 'lucide-react';
import { type LucideIcon } from 'lucide-react';

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
  description: string;
  tech: string[];
  problem: string;
  impact: string;
  icon: LucideIcon;
  index: string;
}> = [
  {
    index: '01',
    icon: BrainCircuit,
    title: 'SAP B1 AI Copilot',
    description: 'Intelligent assistant embedded into enterprise applications.',
    tech: ['SAP B1', 'AI Copilot', 'Service Layer'],
    problem: 'Teams needed faster answers and guided actions inside SAP workflows.',
    impact: 'Reduced decision friction with embedded AI assistance.',
  },
  {
    index: '02',
    icon: MessageCircle,
    title: 'WhatsApp Approval Bot',
    description: 'Real-time approvals, reports, and alerts integrated with SAP.',
    tech: ['WhatsApp API', 'SAP B1', 'C#'],
    problem: 'Approval cycles were delayed by desktop-only workflows.',
    impact: 'Enabled mobile-first decisions with live enterprise context.',
  },
  {
    index: '03',
    icon: ServerCog,
    title: 'Employee Self-Service Portal',
    description: 'ASP.NET MVC application powered by SAP HANA.',
    tech: ['ASP.NET MVC', 'SAP HANA', 'Bootstrap'],
    problem: 'Employee requests needed a reliable self-service layer.',
    impact: 'Centralized ESS workflows with enterprise-grade controls.',
  },
  {
    index: '04',
    icon: DatabaseZap,
    title: 'Intelligent Reporting Engine',
    description: 'Automated multi-format report generation system.',
    tech: ['SQL', 'SAP HANA', 'Automation'],
    problem: 'Manual reporting consumed delivery bandwidth.',
    impact: 'Accelerated recurring insights across operational teams.',
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

function MotionReveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      className={`reveal ${className}`}
      initial={reducedMotion ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.72, delay, ease: premiumEase }}
    >
      {children}
    </motion.div>
  );
}

function MagneticLink({ children, href, variant = 'primary', download = false }: { children: ReactNode; href: string; variant?: 'primary' | 'quiet'; download?: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      data-testid={`link-${href.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'action'}`}
      href={href}
      download={download || undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={hovered ? { y: -3 } : { y: 0 }}
      transition={{ duration: 0.25, ease: premiumEase }}
      className={`inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-5 text-sm font-semibold ${variant === 'primary'
        ? 'bg-[#dff7f2] text-[#0a1719] shadow-[0_12px_30px_rgba(119,223,192,.14)] hover:bg-white'
        : 'border border-[rgba(194,224,222,.2)] bg-[rgba(194,224,222,.05)] text-[#dff7f2] hover:border-[rgba(119,223,192,.55)] hover:bg-[rgba(119,223,192,.08)]'}`}
    >
      {children}
    </motion.a>
  );
}

function SectionHeading({ eyebrow, title, note }: { eyebrow: string; title: string; note?: string }) {
  return (
    <div className="mb-12 grid gap-5 md:grid-cols-[1fr_280px] md:items-end">
      <div>
        <p className="eyebrow mb-5">{eyebrow}</p>
        <h2 className="display max-w-3xl text-4xl font-semibold leading-[1.02] tracking-[-.055em] text-[#eaf9f5] sm:text-5xl lg:text-[4.35rem]">{title}</h2>
      </div>
      {note && <p className="border-l border-[rgba(119,223,192,.35)] pl-4 text-sm leading-6 text-[#8da7a7]">{note}</p>}
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

  return (
    <main className="portfolio-page relative min-h-[100dvh] overflow-hidden">
      <motion.div className="fixed left-0 top-0 z-[60] h-1 origin-left bg-[#77dfc0]" style={{ scaleX: progress }} />
      <header className="fixed left-0 right-0 top-0 z-50 px-4 py-4 sm:px-6 sm:py-5">
        <nav className="glass mx-auto max-w-[1240px] rounded-[1.35rem] px-3 py-3 sm:rounded-full sm:px-5" aria-label="Main navigation">
          <div className="flex items-center justify-between gap-4">
            <a data-testid="link-home" href="#hero" onClick={() => scrollTo('hero')} className="group flex items-center gap-3 text-sm font-semibold tracking-[.08em] text-[#eaf9f5]">
              <span className="grid size-8 place-items-center rounded-full bg-[#dff7f2] font-mono text-xs font-bold text-[#0a1719] transition group-hover:rotate-12">KS</span>
              <span className="hidden sm:block">KALAKONDA SAIRAM</span>
            </a>
            <div className="hidden items-center gap-7 md:flex">
              {navItems.map((item) => (
                <a data-testid={`link-nav-${item.id}`} key={item.id} href={`#${item.id}`} onClick={() => scrollTo(item.id)} className={`nav-link text-xs font-medium ${activeSection === item.id ? 'active' : ''}`}>{item.label}</a>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <a data-testid="link-linkedin-header" href="https://www.linkedin.com/in/sairam-kalakonda/" target="_blank" rel="noreferrer" aria-label="Open LinkedIn profile" className="grid size-9 place-items-center rounded-full border border-[rgba(194,224,222,.16)] text-[#9ab0b0] transition hover:border-[#77dfc0] hover:text-[#dff7f2]"><Linkedin size={15} aria-hidden="true" /></a>
              <button data-testid="button-toggle-navigation" type="button" aria-expanded={mobileNavOpen} aria-controls="mobile-navigation" aria-label="Toggle navigation menu" onClick={() => setMobileNavOpen((open) => !open)} className="grid size-9 place-items-center rounded-full border border-[rgba(194,224,222,.16)] text-[#9ab0b0] md:hidden">
                {mobileNavOpen ? <X size={17} aria-hidden="true" /> : <Menu size={17} aria-hidden="true" />}
              </button>
            </div>
          </div>
          <AnimatePresence initial={false}>
            {mobileNavOpen && (
              <motion.div id="mobile-navigation" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mt-3 overflow-hidden border-t hairline pt-2 md:hidden">
                {navItems.map((item) => <a data-testid={`link-mobile-nav-${item.id}`} key={item.id} href={`#${item.id}`} onClick={() => scrollTo(item.id)} className="block rounded-xl px-3 py-3 text-sm text-[#9ab0b0] hover:bg-[rgba(119,223,192,.08)] hover:text-[#eaf9f5]">{item.label}</a>)}
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      <section id="hero" className="relative flex min-h-[100dvh] items-center overflow-hidden px-5 pb-16 pt-32 sm:px-8 lg:px-10">
        <div className="hero-grid absolute inset-0 opacity-70" />
        <div className="grain absolute inset-0" />
        <div className="orbit orbit-a" /><div className="orbit orbit-b" />
        <motion.div style={{ y: heroY }} className="relative z-10 mx-auto w-full max-w-[1240px]">
          <div className="grid items-end gap-14 lg:grid-cols-[1.12fr_.88fr]">
            <div>
              <MotionReveal>
                <p className="mb-7 inline-flex items-center gap-2 rounded-full border border-[rgba(119,223,192,.26)] bg-[rgba(119,223,192,.06)] px-4 py-2 font-mono text-[10px] uppercase tracking-[.14em] text-[#9fe9d0]"><span className="status-dot" /> Available for intelligent enterprise systems</p>
              </MotionReveal>
              <MotionReveal delay={.07}>
                <p className="eyebrow mb-5">AI-enabled full stack engineer</p>
                <h1 data-testid="text-name" className="display max-w-4xl text-[clamp(3.6rem,10vw,8.8rem)] font-semibold leading-[.86] tracking-[-.08em] text-[#eaf9f5]">Kalakonda<br /><span className="text-[#77dfc0]">Sairam<span className="text-[#ffbc6e]">.</span></span></h1>
              </MotionReveal>
              <MotionReveal delay={.15}>
                <p className="mt-8 max-w-xl text-lg leading-8 text-[#9ab0b0] sm:text-xl">Building Intelligent Enterprise Experiences.<br />Transforming SAP Workflows with AI.</p>
              </MotionReveal>
              <MotionReveal delay={.22} className="mt-9 flex flex-col gap-3 sm:flex-row">
                <MagneticLink href="#projects">View selected work <ArrowDown size={16} aria-hidden="true" /></MagneticLink>
                <MagneticLink href="/K_Sairam_Resume.pdf" variant="quiet" download>Download resume <Download size={16} aria-hidden="true" /></MagneticLink>
              </MotionReveal>
            </div>
            <MotionReveal delay={.3} className="hidden lg:block">
              <div className="glass relative overflow-hidden rounded-[2rem] p-6 shadow-[0_30px_80px_rgba(0,0,0,.3)]">
                <div className="mb-8 flex items-center justify-between border-b hairline pb-4 font-mono text-[10px] uppercase tracking-[.16em] text-[#769091]"><span>System / Sairam</span><span>01—04</span></div>
                <div className="space-y-3">
                  {['SAP B1 Copilot', 'WhatsApp approvals', 'HANA optimization', 'ASP.NET MVC portals'].map((item, index) => (
                    <div data-testid={`card-capability-${index + 1}`} key={item} className="group flex items-center justify-between rounded-2xl border border-[rgba(194,224,222,.11)] bg-[rgba(5,18,21,.62)] p-4 transition hover:border-[rgba(119,223,192,.35)]">
                      <div><p className="font-mono text-[10px] text-[#769091]">CAPABILITY 0{index + 1}</p><p className="mt-1 text-sm font-semibold text-[#dff7f2]">{item}</p></div><ArrowUpRight size={17} className="text-[#769091] transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#77dfc0]" aria-hidden="true" />
                    </div>
                  ))}
                </div>
                <div className="mt-7 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.14em] text-[#77dfc0]"><span className="size-1.5 rounded-full bg-[#77dfc0]" /> Enterprise-grade by default</div>
              </div>
            </MotionReveal>
          </div>
          <div className="mt-20 flex items-center gap-4 text-[#769091]"><span className="scroll-cue h-px w-12 origin-left bg-[#77dfc0]" /><span className="font-mono text-[10px] uppercase tracking-[.16em]">Scroll to explore</span></div>
        </motion.div>
      </section>

      <section id="about" className="section-wrap">
        <SectionHeading eyebrow="About / 01" title="Enterprise engineering with an AI-first operating model." note="Reliable architecture, practical automation, measurable gains." />
        <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
          <MotionReveal><p data-testid="text-biography" className="text-xl leading-9 text-[#a9bcbc] sm:text-2xl">Kalakonda Sairam is an AI-enabled full stack engineer with 4+ years of experience delivering enterprise-grade solutions across ASP.NET MVC, Angular, SAP Business One, and SAP HANA. His work connects reliable application architecture with practical AI Copilot implementations, workflow automation, and measurable performance gains.</p></MotionReveal>
          <div className="grid grid-cols-2 gap-x-10 gap-y-10 lg:pt-2">{stats.map(([value, label], index) => <MotionReveal key={label} delay={index * .07}><div className="metric"><strong data-testid={`text-stat-${index}`}>{value}</strong><span>{label}</span></div></MotionReveal>)}</div>
        </div>
      </section>

      <section id="experience" className="section-wrap border-t hairline">
        <SectionHeading eyebrow="Experience / 02" title="Built inside high-pressure enterprise delivery environments." note="A bias toward the useful: ship, measure, refine." />
        <div className="relative space-y-6">
          <div className="timeline-line absolute bottom-4 left-[7px] top-4 hidden w-px md:block" />
          {experience.map((item, index) => (
            <MotionReveal key={item.company} delay={index * .1} className="relative md:pl-14">
              <span className="absolute left-0 top-8 hidden size-4 rounded-full border-2 border-[#77dfc0] bg-[#071014] md:block" />
              <article data-testid={`card-experience-${index}`} className="glass rounded-[1.75rem] p-6 sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><p className="font-mono text-[10px] uppercase tracking-[.16em] text-[#77dfc0]">0{index + 1} / {item.role}</p><h3 className="display mt-3 text-3xl font-semibold tracking-[-.04em] text-[#eaf9f5]">{item.company}</h3></div><p className="w-fit rounded-full border border-[rgba(194,224,222,.17)] px-3 py-2 font-mono text-[10px] text-[#8da7a7]">{item.period}</p></div>
                <ul className="mt-8 grid gap-4 sm:grid-cols-2">{item.points.map((point) => <li data-testid={`text-experience-point-${index}-${item.points.indexOf(point)}`} key={point} className="flex gap-3 text-sm leading-6 text-[#a9bcbc]"><Zap size={15} className="mt-1 shrink-0 text-[#ffbc6e]" aria-hidden="true" />{point}</li>)}</ul>
              </article>
            </MotionReveal>
          ))}
        </div>
      </section>

      <section id="projects" className="section-wrap border-t hairline">
        <SectionHeading eyebrow="Selected work / 03" title="Systems that turn enterprise friction into intelligent workflows." note="The work lives where software meets the way teams actually operate." />
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return <MotionReveal key={project.title} delay={index * .08}><article data-testid={`card-project-${index}`} className="project-card glass group min-h-[360px] rounded-[1.75rem] p-6 sm:p-8">
              <div className="relative z-10 flex h-full flex-col"><div className="mb-10 flex items-center justify-between"><div className="grid size-12 place-items-center rounded-2xl border border-[rgba(119,223,192,.24)] bg-[rgba(119,223,192,.07)] text-[#77dfc0]"><Icon size={22} aria-hidden="true" /></div><span className="font-mono text-[10px] tracking-[.16em] text-[#769091]">{project.index}</span></div><h3 className="display text-3xl font-semibold tracking-[-.045em] text-[#eaf9f5]">{project.title}</h3><p className="mt-3 max-w-md leading-7 text-[#9ab0b0]">{project.description}</p><div className="mt-5 flex flex-wrap gap-2">{project.tech.map((tech) => <span key={tech} className="skill-pill rounded-full border border-[rgba(194,224,222,.14)] px-3 py-1.5 font-mono text-[10px] text-[#8da7a7]">{tech}</span>)}</div><div className="mt-auto grid gap-3 border-t hairline pt-5 md:translate-y-3 md:opacity-0 md:transition md:duration-500 md:group-hover:translate-y-0 md:group-hover:opacity-100"><p className="text-xs leading-5 text-[#8da7a7]"><span className="text-[#dff7f2]">Problem solved / </span>{project.problem}</p><p className="text-xs leading-5 text-[#8da7a7]"><span className="text-[#dff7f2]">Business impact / </span>{project.impact}</p></div></div>
            </article></MotionReveal>;
          })}
        </div>
      </section>

      <section id="skills" className="section-wrap border-t hairline">
        <SectionHeading eyebrow="Capabilities / 04" title="A practical stack for SAP-aware, AI-enabled product engineering." note="Deep where it matters. Comfortable across the whole system." />
        <MotionReveal>
          <div className="overflow-hidden rounded-[2rem] border border-[rgba(194,224,222,.13)] bg-[rgba(17,34,39,.42)] backdrop-blur-[18px]">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div key={skill.category} className={`flex flex-col gap-5 px-7 py-6 sm:flex-row sm:items-center sm:gap-8 sm:px-9 sm:py-7 ${index < skills.length - 1 ? 'border-b border-[rgba(194,224,222,.1)]' : ''}`}>
                  <div className="flex shrink-0 items-center gap-3 sm:w-44">
                    <span className="grid size-9 place-items-center rounded-xl border border-[rgba(119,223,192,.2)] bg-[rgba(119,223,192,.06)] text-[#77dfc0]">
                      <Icon size={16} aria-hidden="true" />
                    </span>
                    <h3 className="font-mono text-[11px] font-medium uppercase tracking-[.14em] text-[#77dfc0]">{skill.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {skill.items.map((item) => (
                      <span data-testid={`text-skill-${item.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} key={item} className="skill-pill rounded-full border border-[rgba(194,224,222,.14)] bg-[rgba(194,224,222,.05)] px-4 py-2.5 text-[13px] text-[#b8cece]">{item}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </MotionReveal>
      </section>

      <section id="achievements" className="section-wrap border-t hairline">
        <SectionHeading eyebrow="Recognition / 05" title="Outcomes shaped by measurable engineering impact." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{achievements.map(([achievement, Icon], index) => <MotionReveal key={achievement} delay={index * .06}><article data-testid={`card-achievement-${index}`} className="glass group relative min-h-[190px] overflow-hidden rounded-[1.5rem] p-5 transition hover:-translate-y-1 hover:border-[rgba(119,223,192,.4)]"><div className="absolute -right-4 -top-5 size-24 rounded-full bg-[rgba(119,223,192,.1)] blur-2xl transition group-hover:bg-[rgba(255,188,110,.18)]" /><Icon size={21} className="relative text-[#ffbc6e]" aria-hidden="true" /><p className="relative mt-12 text-base font-semibold leading-6 text-[#dff7f2]">{achievement}</p></article></MotionReveal>)}</div>
      </section>

      <section id="contact" className="section-wrap border-t hairline pb-16">
        <SectionHeading eyebrow="Contact / 06" title="Let's build something intelligent." note="Good systems begin with a clear problem and a direct conversation." />
        <div className="grid gap-7 lg:grid-cols-2 lg:items-stretch">
          <MotionReveal>
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
              <a data-testid="link-start-conversation" href="mailto:sairamkalakonda1998@gmail.com" className="group mt-10 inline-flex w-fit items-center gap-3 rounded-full bg-[#0a1719] px-6 py-3.5 text-sm font-semibold text-[#dff7f2] transition hover:gap-4 hover:bg-[#112227]">
                Start a conversation <ArrowUpRight size={16} className="transition group-hover:rotate-45" aria-hidden="true" />
              </a>
            </div>
          </MotionReveal>
          <MotionReveal delay={.1}>
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
          </MotionReveal>
        </div>
      </section>

      <footer className="border-t hairline px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-[1240px] flex-col justify-between gap-3 text-xs text-[#769091] sm:flex-row"><span>Designed and engineered by Kalakonda Sairam.</span><span className="font-mono">© {new Date().getFullYear()} / KS</span></div>
      </footer>
    </main>
  );
}

export default PortfolioHome;
