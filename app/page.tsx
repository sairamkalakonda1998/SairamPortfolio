"use client";

import {
  motion,
  type Variants,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
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
  Menu,
  MessageCircle,
  Phone,
  ScrollText,
  ServerCog,
  Sparkles,
  Trophy,
  type LucideIcon,
  Wrench,
  Workflow,
  X,
  Zap
} from "lucide-react";
import Image from "next/image";
import Script from "next/script";
import { useEffect, useMemo, useRef, useState } from "react";

declare global {
  interface Window {
    gsap?: {
      registerPlugin: (...plugins: unknown[]) => void;
      set: (target: unknown, vars: Record<string, unknown>) => void;
      to: (target: unknown, vars: Record<string, unknown>) => { kill: () => void; progress?: (value: number) => void };
      from: (target: unknown, vars: Record<string, unknown>) => { kill: () => void };
      fromTo: (
        target: unknown,
        fromVars: Record<string, unknown>,
        toVars: Record<string, unknown>
      ) => { kill: () => void; progress?: (value: number) => void };
      timeline: (vars?: Record<string, unknown>) => {
        fromTo: (
          target: unknown,
          fromVars: Record<string, unknown>,
          toVars: Record<string, unknown>,
          position?: number
        ) => unknown;
        set: (target: unknown, vars: Record<string, unknown>, position?: number) => unknown;
        to: (target: unknown, vars: Record<string, unknown>) => unknown;
        kill: () => void;
        progress?: (value: number) => void;
      };
    };
    ScrollTrigger?: {
      create: (vars: Record<string, unknown>) => { kill: () => void };
      getAll: () => Array<{ kill: () => void }>;
      maxScroll?: (target: Window) => number;
      refresh: () => void;
      update: () => void;
    };
  }
}

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

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return isMobile;
}

function createZoomVariant({
  desktopScale,
  mobileScale,
  y = 0,
  rotateX = 0,
  delay = 0,
  staggerChildren = 0,
  reducedMotion = false,
  isMobile = false
}: {
  desktopScale: number;
  mobileScale: number;
  y?: number;
  rotateX?: number;
  delay?: number;
  staggerChildren?: number;
  reducedMotion?: boolean;
  isMobile?: boolean;
}): Variants {
  return {
    hidden: {
      opacity: 0,
      scale: reducedMotion ? 1 : isMobile ? mobileScale : desktopScale,
      y: reducedMotion ? 0 : y,
      rotateX: reducedMotion ? 0 : rotateX
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.5,
        delay,
        ease: premiumEase,
        staggerChildren,
        delayChildren: staggerChildren ? 0.12 : 0
      }
    }
  };
}

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

const sectionCoins: Array<{
  id: string;
  label: string;
  shortLabel?: string;
  icon?: LucideIcon;
  iconName?: string;
}> = [
  { id: "hero", label: "Hero", shortLabel: "KS" },
  { id: "about", label: "About", icon: ScrollText, iconName: "scroll-text" },
  { id: "experience", label: "Experience", icon: BriefcaseBusiness, iconName: "briefcase-business" },
  { id: "projects", label: "Projects", icon: Code2, iconName: "code-2" },
  { id: "skills", label: "Skills", icon: Wrench, iconName: "wrench" },
  { id: "achievements", label: "Achievements", icon: Trophy, iconName: "trophy" },
  { id: "contact", label: "Contact", icon: Mail, iconName: "mail" }
];

function coinSideFor(sectionId: string) {
  const index = sectionCoins.findIndex((section) => section.id === sectionId);
  return index % 2 === 0 ? "right" : "left";
}

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
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const coinSide = coinSideFor(id);
  const headerZoom = createZoomVariant({
    desktopScale: 1.1,
    mobileScale: 1.04,
    reducedMotion: Boolean(reducedMotion),
    isMobile
  });
  const coinSlot = <div className="coin-slot" data-section={id} data-side={coinSide} />;
  const headingCopy = (
    <motion.div
      variants={headerZoom}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.7 }}
      className="section-heading-copy max-w-3xl"
    >
      <p className="mb-4 text-sm font-medium uppercase tracking-[0.26em] text-cyanite/80">
        {eyebrow}
      </p>
      <h2 className="text-balance text-4xl font-semibold tracking-[-0.02em] text-pearl sm:text-5xl lg:text-6xl">
        {title}
      </h2>
    </motion.div>
  );

  return (
    <section id={id} className={`relative px-5 py-16 sm:px-8 sm:py-24 lg:px-10 ${className}`}>
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
        className="relative z-20 mx-auto max-w-7xl"
      >
        <div className={`section-heading-wrapper section-heading--${coinSide} mb-8 sm:mb-12`}>
          {coinSide === "left" ? (
            <>
              {coinSlot}
              {headingCopy}
            </>
          ) : (
            <>
              {headingCopy}
              {coinSlot}
            </>
          )}
        </div>
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

function CoinGlyph({ sectionId }: { sectionId: string }) {
  const section = sectionCoins.find((item) => item.id === sectionId) ?? sectionCoins[0];

  if (section.shortLabel) {
    return <span className="coin-monogram">{section.shortLabel}</span>;
  }

  const Icon = section.icon ?? Code2;
  return <Icon aria-hidden="true" strokeWidth={2.2} />;
}

function CoinFaceStack() {
  return (
    <span className="coin-face-stack">
      {sectionCoins.map((section) => (
        <span
          key={section.id}
          className={`coin-face-icon ${section.id === "hero" ? "is-active" : ""}`}
          data-coin-icon={section.id}
        >
          <CoinGlyph sectionId={section.id} />
        </span>
      ))}
    </span>
  );
}

function HeadingPathCoin() {
  const coinRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const coin = coinRef.current;
    if (!coin) return;

    let resizeTimer = 0;
    let activeIcon = "hero";
    let lastImpact = "";
    let setupAttempts = 0;
    let playedEntrance = false;
    let cleanupTriggers: Array<{ kill: () => void }> = [];
    let snapTimer = 0;
    let snapFrame = 0;
    let landingTimer = 0;
    let isSnapping = false;

    const setActiveIcon = (sectionId: string) => {
      if (activeIcon === sectionId) return;
      activeIcon = sectionId;
      coin.querySelectorAll<HTMLElement>("[data-coin-icon]").forEach((icon) => {
        icon.classList.toggle("is-active", icon.dataset.coinIcon === sectionId);
      });
    };

    const impact = () => {
      const gsap = window.gsap;
      if (!gsap) return;
      const target = coin.querySelector<HTMLElement>(".coin-inner") ?? coin;
      gsap.to(target, {
        scale: 1.08,
        duration: 0.15,
        ease: "back.out(1.7)",
        yoyo: true,
        repeat: 1
      });
      gsap.to(target, {
        boxShadow: "0 24px 58px rgba(0,0,0,0.34), 0 0 48px rgba(125,211,252,0.72)",
        duration: 0.18,
        yoyo: true,
        repeat: 1,
        ease: "power2.out"
      });
    };

    const getWaypoints = () =>
      Array.from(document.querySelectorAll<HTMLElement>(".coin-slot"))
        .map((slot) => {
          const rect = slot.getBoundingClientRect();
          return {
            section: slot.dataset.section ?? "",
            side: slot.dataset.side ?? "right",
            slot,
            width: rect.width,
            height: rect.height,
            scrollY: 0,
            center: {
              x: rect.left + rect.width / 2 + window.scrollX,
              y: rect.top + rect.height / 2 + window.scrollY
            }
          };
        })
        .filter((point) => point.section && point.width > 0 && point.height > 0)
        .sort(
          (a, b) =>
            sectionCoins.findIndex((section) => section.id === a.section) -
            sectionCoins.findIndex((section) => section.id === b.section)
        );

    const killSetup = () => {
      window.clearTimeout(snapTimer);
      window.clearTimeout(landingTimer);
      if (snapFrame) window.cancelAnimationFrame(snapFrame);
      snapFrame = 0;
      isSnapping = false;
      cleanupTriggers.forEach((trigger) => trigger.kill());
      cleanupTriggers = [];
    };

    const build = () => {
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;

      if (!gsap || !ScrollTrigger) {
        if (setupAttempts < 80) {
          setupAttempts += 1;
          window.setTimeout(build, 100);
        }
        return;
      }

      killSetup();
      gsap.registerPlugin(ScrollTrigger);
      setActiveIcon(activeIcon);

      const waypoints = getWaypoints();
      if (!waypoints.length) return;
      const maxScroll = Math.max(1, ScrollTrigger.maxScroll?.(window) ?? document.documentElement.scrollHeight - window.innerHeight);
      type Waypoint = (typeof waypoints)[number];
      type CoinTransition = {
        index: number;
        from: Waypoint;
        to: Waypoint;
        startY: number;
        endY: number;
        progress: number;
        tween: ReturnType<typeof gsap.fromTo>;
      };
      type SectionRange = {
        index: number;
        point: Waypoint;
        startY: number;
        endY: number;
        sectionBottom: number;
      };

      const first = waypoints[0];
      gsap.set(coin, {
        x: first.center.x,
        y: first.center.y,
        xPercent: -50,
        yPercent: -50,
        opacity: 1,
        rotationY: 0
      });

      const transitions: CoinTransition[] = [];

      const landAt = (point: Waypoint, index: number, withImpact = true) => {
        coin.classList.remove("is-traveling");
        gsap.set(coin, {
          x: point.center.x,
          y: point.center.y,
          rotationY: reducedMotion ? 0 : index * 360,
          opacity: 1
        });
        setActiveIcon(point.section);
        if (withImpact && lastImpact !== point.section) {
          lastImpact = point.section;
          impact();
        }
      };

      const activeElementBlocksSnap = () => {
        const activeElement = document.activeElement as HTMLElement | null;
        return Boolean(
          activeElement &&
            activeElement !== document.body &&
          activeElement.closest("input, textarea, select, button, [contenteditable='true']")
        );
      };

      const activeTransitionForScroll = () => {
        const scrollY = window.scrollY;
        return transitions.find((transition) => scrollY > transition.startY + 1 && scrollY < transition.endY - 1) ?? null;
      };
      let updateRestingCoinPosition = () => {};

      const cancelSnap = () => {
        isSnapping = false;
        window.clearTimeout(snapTimer);
        window.clearTimeout(landingTimer);
        if (snapFrame) window.cancelAnimationFrame(snapFrame);
        snapFrame = 0;
      };

      const finishSnap = (targetY: number, point: Waypoint, index: number) => {
        isSnapping = false;
        snapFrame = 0;
        window.clearTimeout(landingTimer);
        window.scrollTo({ top: targetY, left: 0, behavior: "auto" });
        ScrollTrigger.update();
        landAt(point, index);
        landingTimer = window.setTimeout(() => {
          if (Math.abs(window.scrollY - targetY) < 3) landAt(point, index);
        }, 720);
      };

      const startSnap = (transition: CoinTransition, targetProgress: 0 | 1) => {
        const point = targetProgress === 1 ? transition.to : transition.from;
        const pointIndex = targetProgress === 1 ? transition.index + 1 : transition.index;
        const targetY = Math.min(Math.max(targetProgress === 1 ? transition.endY : transition.startY, 0), maxScroll);
        const startY = window.scrollY;
        const distance = targetY - startY;

        cancelSnap();

        if (Math.abs(distance) < 2 || maxScroll <= 1) {
          finishSnap(targetY, point, pointIndex);
          return;
        }

        if (reducedMotion) {
          window.scrollTo({ top: targetY, left: 0, behavior: "auto" });
          finishSnap(targetY, point, pointIndex);
          return;
        }

        const startedAt = performance.now();
        const isMobileViewport = window.matchMedia("(max-width: 767px)").matches;
        const duration = isMobileViewport ? 500 : 620;
        isSnapping = true;

        const tick = (now: number) => {
          if (!isSnapping) return;

          const progress = Math.min((now - startedAt) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const nextY = startY + distance * eased;
          window.scrollTo({ top: nextY, left: 0, behavior: "auto" });
          ScrollTrigger.update();

          if (progress < 1) {
            snapFrame = window.requestAnimationFrame(tick);
            return;
          }

          finishSnap(targetY, point, pointIndex);
        };

        snapFrame = window.requestAnimationFrame(tick);
      };

      const snapToTransitionEndpoint = () => {
        if (activeElementBlocksSnap()) return;

        const transition = activeTransitionForScroll();
        if (!transition) return;

        const span = Math.max(1, transition.endY - transition.startY);
        const progress = Math.min(Math.max((window.scrollY - transition.startY) / span, 0), 1);
        startSnap(transition, progress > 0.15 ? 1 : 0);
      };

      const scheduleSnap = () => {
        if (isSnapping) return;
        window.clearTimeout(snapTimer);
        const isMobileViewport = window.matchMedia("(max-width: 767px)").matches;
        snapTimer = window.setTimeout(snapToTransitionEndpoint, isMobileViewport ? 120 : 180);
      };

      const onScrollActivity = () => {
        if (!isSnapping) {
          updateRestingCoinPosition();
          scheduleSnap();
        }
      };

      const onScrollInput = () => {
        if (isSnapping) cancelSnap();
        updateRestingCoinPosition();
        scheduleSnap();
      };

      const onKeyDown = (event: KeyboardEvent) => {
        if (!["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) return;
        onScrollInput();
      };

      window.addEventListener("scroll", onScrollActivity, { passive: true });
      window.addEventListener("wheel", onScrollInput, { passive: true });
      window.addEventListener("touchmove", onScrollInput, { passive: true });
      window.addEventListener("keydown", onKeyDown);
      cleanupTriggers.push({
        kill: () => {
          window.clearTimeout(snapTimer);
          window.clearTimeout(landingTimer);
          cancelSnap();
          window.removeEventListener("scroll", onScrollActivity);
          window.removeEventListener("wheel", onScrollInput);
          window.removeEventListener("touchmove", onScrollInput);
          window.removeEventListener("keydown", onKeyDown);
        }
      });

      if (!playedEntrance) {
        playedEntrance = true;
        gsap.from(coin.querySelector<HTMLElement>(".coin-inner") ?? coin, {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
          onComplete: impact
        });
      }

      const isMobileViewport = window.matchMedia("(max-width: 767px)").matches;
      const boundaryOffset = Math.min(window.innerHeight * (isMobileViewport ? 0.34 : 0.38), isMobileViewport ? 220 : 360);
      const fallbackHalfSpan = Math.min(window.innerHeight * 0.18, isMobileViewport ? 150 : 220);

      for (let index = 0; index < waypoints.length - 1; index += 1) {
        const from = waypoints[index];
        const to = waypoints[index + 1];
        const fromSection = from.slot.closest("section") as HTMLElement | null;
        const toSection = to.slot.closest("section") as HTMLElement | null;
        const boundaryY =
          toSection?.offsetTop ??
          (fromSection ? fromSection.offsetTop + fromSection.offsetHeight : to.center.y - window.innerHeight / 2);
        let startY = Math.min(Math.max(boundaryY - window.innerHeight + boundaryOffset, 0), maxScroll);
        let endY = Math.min(Math.max(boundaryY - boundaryOffset, 0), maxScroll);

        if (endY <= startY + 24) {
          const centerY = Math.min(Math.max(boundaryY - window.innerHeight / 2, 0), maxScroll);
          startY = Math.min(Math.max(centerY - fallbackHalfSpan, 0), maxScroll);
          endY = Math.min(Math.max(centerY + fallbackHalfSpan, 0), maxScroll);
        }

        const previous = transitions[transitions.length - 1];
        if (previous && startY <= previous.endY) {
          startY = Math.min(previous.endY + 1, maxScroll);
          endY = Math.max(endY, Math.min(startY + 80, maxScroll));
        }

        if (endY <= startY) continue;

        const tween = gsap.fromTo(
          coin,
          {
            x: from.center.x,
            y: from.center.y,
            rotationY: reducedMotion ? 0 : index * 360
          },
          {
            x: to.center.x,
            y: to.center.y,
            rotationY: reducedMotion ? 0 : (index + 1) * 360,
            duration: 1,
            ease: "none",
            paused: true,
            immediateRender: false
          }
        );
        const transition: CoinTransition = {
          index,
          from,
          to,
          startY,
          endY,
          progress: 0,
          tween
        };
        transitions.push(transition);

        const trigger = ScrollTrigger.create({
          trigger: document.documentElement,
          start: () => transition.startY,
          end: () => transition.endY,
          invalidateOnRefresh: true,
          onUpdate: (self: { progress: number }) => {
            transition.progress = self.progress;
            transition.tween.progress?.(self.progress);
            coin.classList.toggle("is-traveling", self.progress > 0.02 && self.progress < 0.98);
            setActiveIcon(self.progress >= 0.5 ? to.section : from.section);
          },
          onLeave: () => {
            transition.progress = 1;
            transition.tween.progress?.(1);
            landAt(to, index + 1);
          },
          onLeaveBack: () => {
            transition.progress = 0;
            transition.tween.progress?.(0);
            landAt(from, index);
          }
        });

        cleanupTriggers.push(trigger, { kill: () => tween.kill() });
      }

      const sectionRanges: SectionRange[] = waypoints.map((point, index) => {
        const section = point.slot.closest("section") as HTMLElement | null;
        const previousTransition = transitions[index - 1];
        const nextTransition = transitions[index];
        const startY = previousTransition ? previousTransition.endY : 0;
        const endY = nextTransition ? nextTransition.startY : maxScroll;
        return {
          index,
          point,
          startY,
          endY: Math.max(startY, endY),
          sectionBottom: section ? section.offsetTop + section.offsetHeight : point.center.y + window.innerHeight
        };
      });

      updateRestingCoinPosition = () => {
        if (activeTransitionForScroll()) return;

        const scrollY = window.scrollY;
        const currentRange =
          sectionRanges.find((range) => scrollY >= range.startY - 1 && scrollY <= range.endY + 1) ??
          sectionRanges.reduce((current, range) => (scrollY >= range.startY ? range : current), sectionRanges[0]);
        if (!currentRange) return;

        const stickyTop = isMobileViewport ? 88 : 112;
        const stickyCenterY = scrollY + stickyTop + currentRange.point.height / 2;
        const maxSectionY = Math.max(currentRange.point.center.y, currentRange.sectionBottom - currentRange.point.height / 2);
        const y = Math.min(Math.max(currentRange.point.center.y, stickyCenterY), maxSectionY);

        coin.classList.remove("is-traveling");
        gsap.set(coin, {
          x: currentRange.point.center.x,
          y,
          rotationY: reducedMotion ? 0 : currentRange.index * 360,
          opacity: 1
        });
        setActiveIcon(currentRange.point.section);
      };

      const syncCoinToScroll = () => {
        const activeTransition = activeTransitionForScroll();
        if (activeTransition) {
          const span = Math.max(1, activeTransition.endY - activeTransition.startY);
          const progress = Math.min(Math.max((window.scrollY - activeTransition.startY) / span, 0), 1);
          activeTransition.tween.progress?.(progress);
          setActiveIcon(progress >= 0.5 ? activeTransition.to.section : activeTransition.from.section);
          coin.classList.toggle("is-traveling", progress > 0.02 && progress < 0.98);
          return;
        }

        let landedIndex = 0;
        transitions.forEach((transition) => {
          if (window.scrollY >= transition.endY - 1) landedIndex = transition.index + 1;
        });
        updateRestingCoinPosition();
        if (!sectionRanges.length) landAt(waypoints[landedIndex], landedIndex, false);
      };

      ScrollTrigger.refresh();
      syncCoinToScroll();
    };

    const scheduleBuild = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(build, 200);
    };

    const buildAfterStableLayout = () => {
      const fontReady = document.fonts?.ready ?? Promise.resolve();
      fontReady.then(() => {
        requestAnimationFrame(() => requestAnimationFrame(build));
      });
    };

    if (document.readyState === "complete") {
      buildAfterStableLayout();
    } else {
      window.addEventListener("load", buildAfterStableLayout, { once: true });
    }
    window.addEventListener("resize", scheduleBuild);

    return () => {
      window.clearTimeout(resizeTimer);
      window.removeEventListener("load", buildAfterStableLayout);
      window.removeEventListener("resize", scheduleBuild);
      killSetup();
    };
  }, [reducedMotion]);

  return (
    <div className="coin-travel-layer" aria-hidden="true">
      <div ref={coinRef} className="heading-coin">
        <div className="coin-shell coin-inner">
          <span className="coin-face coin-face-front" data-coin-face>
            <CoinFaceStack />
          </span>
          <span className="coin-face coin-face-back" data-coin-face>
            <CoinFaceStack />
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.2 });
  const heroY = useTransform(heroScrollProgress, [0, 1], [0, reducedMotion ? 0 : isMobile ? 52 : 150]);
  const heroBackdropScale = useTransform(heroScrollProgress, [0, 1], [1, reducedMotion ? 1 : isMobile ? 1.06 : 1.15]);
  const heroHeadingScale = useTransform(heroScrollProgress, [0, 0.85], [1, reducedMotion ? 1 : isMobile ? 0.98 : 0.93]);
  const heroHeadingOpacity = useTransform(heroScrollProgress, [0, 0.85], [1, reducedMotion ? 1 : 0.36]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glow = useMotionTemplate`radial-gradient(520px circle at ${mouseX}px ${mouseY}px, rgba(125, 211, 252, 0.14), transparent 44%)`;
  const statZoom = useMemo(
    () =>
      createZoomVariant({
        desktopScale: 0.8,
        mobileScale: 0.95,
        reducedMotion: Boolean(reducedMotion),
        isMobile
      }),
    [isMobile, reducedMotion]
  );
  const experienceZoom = useMemo(
    () =>
      createZoomVariant({
        desktopScale: 0.9,
        mobileScale: 0.95,
        y: 30,
        staggerChildren: 0.1,
        reducedMotion: Boolean(reducedMotion),
        isMobile
      }),
    [isMobile, reducedMotion]
  );
  const projectZoom = useMemo(
    () =>
      createZoomVariant({
        desktopScale: 0.85,
        mobileScale: 0.95,
        rotateX: 7,
        staggerChildren: 0.08,
        reducedMotion: Boolean(reducedMotion),
        isMobile
      }),
    [isMobile, reducedMotion]
  );
  const tagFade = useMemo(
    () =>
      createZoomVariant({
        desktopScale: 0.96,
        mobileScale: 0.98,
        delay: 0.1,
        reducedMotion: Boolean(reducedMotion),
        isMobile
      }),
    [isMobile, reducedMotion]
  );
  const skillPop = useMemo(
    () =>
      createZoomVariant({
        desktopScale: 0.7,
        mobileScale: 0.95,
        staggerChildren: 0.08,
        reducedMotion: Boolean(reducedMotion),
        isMobile
      }),
    [isMobile, reducedMotion]
  );

  useAnimationFrame(() => {
    const root = document.documentElement;
    root.style.setProperty("--scroll-progress", `${scrollYProgress.get()}`);
  });

  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" strategy="afterInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" strategy="afterInteractive" />
      <main
        className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_50%_0%,rgba(45,82,110,0.22),transparent_30%),linear-gradient(180deg,#050608_0%,#080b10_45%,#050608_100%)]"
        onMouseMove={(event) => {
          mouseX.set(event.clientX);
          mouseY.set(event.clientY);
        }}
      >
      <motion.div className="fixed left-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-cyanite via-ion to-ember" style={{ scaleX: progress }} />
      <motion.div className="pointer-events-none fixed inset-0 z-10" style={{ background: glow }} />
      <HeadingPathCoin />

      <header className="fixed left-0 right-0 top-0 z-40 px-4 py-4 sm:px-8 sm:py-5 lg:px-10">
        <nav className="mx-auto max-w-7xl rounded-[1.75rem] border border-white/10 bg-ink/48 px-3 py-3 backdrop-blur-2xl sm:flex sm:items-center sm:gap-3 sm:rounded-full sm:px-4">
          <div className="flex items-center gap-3">
            <a href="#hero" className="text-sm font-semibold tracking-wide text-pearl">
              KS
            </a>
            <div className="hidden min-w-0 flex-1 items-center justify-center gap-6 px-1 text-sm text-haze sm:flex">
              {["About", "Experience", "Projects", "Skills", "Contact"].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="shrink-0 transition hover:text-pearl">
                  {item}
                </a>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setIsMobileNavOpen((open) => !open)}
              aria-expanded={isMobileNavOpen}
              aria-controls="mobile-navigation"
              aria-label="Toggle navigation menu"
              className="ml-auto grid size-9 place-items-center rounded-full border border-white/10 text-haze transition hover:border-white/24 hover:text-pearl sm:hidden"
            >
              {isMobileNavOpen ? <X size={17} aria-hidden="true" /> : <Menu size={17} aria-hidden="true" />}
            </button>
            <a
              href="https://www.linkedin.com/in/sairam-kalakonda/"
              target="_blank"
              rel="noreferrer"
              aria-label="Open LinkedIn profile"
              className="grid size-9 place-items-center rounded-full border border-white/10 text-haze transition hover:border-white/24 hover:text-pearl"
            >
              <Linkedin size={16} aria-hidden="true" />
            </a>
          </div>
          {isMobileNavOpen && (
            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.24, ease: premiumEase }}
              className="mt-3 overflow-hidden border-t border-white/10 pt-2 sm:hidden"
            >
              {["About", "Experience", "Projects", "Skills", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMobileNavOpen(false)}
                  className="block rounded-2xl px-3 py-2.5 text-sm text-haze transition hover:bg-white/[0.06] hover:text-pearl"
                >
                  {item}
                </a>
              ))}
            </motion.div>
          )}
        </nav>
      </header>

      <section ref={heroRef} id="hero" className="relative flex min-h-[92svh] items-center px-5 pb-10 pt-24 sm:min-h-screen sm:px-8 sm:pb-16 sm:pt-28 lg:px-10">
        <motion.div style={{ y: heroY, scale: heroBackdropScale }} className="absolute inset-0">
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
          style={{ scale: heroHeadingScale, opacity: heroHeadingOpacity }}
          className="relative z-20 mx-auto grid w-full max-w-7xl origin-top items-end gap-8 sm:gap-12 lg:grid-cols-[1.15fr_0.85fr]"
        >
          <div>
            <motion.p variants={fadeUp} className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-sm text-haze backdrop-blur-xl">
              <Sparkles size={15} className="text-cyanite" aria-hidden="true" />
              Enterprise AI, SAP B1, and scalable full-stack delivery
            </motion.p>
            <div className="section-heading-wrapper section-heading--right hero-heading-wrapper">
              <motion.h1 variants={fadeUp} className="text-balance text-5xl font-semibold tracking-[-0.05em] text-white sm:text-7xl lg:text-8xl">
                Kalakonda Sairam
              </motion.h1>
              <div className="coin-slot" data-section="hero" data-side="right" />
            </div>
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
              <MagneticButton href="/K_Sairam_Resume.pdf" variant="secondary" download>
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
            {stats.map(([value, label], index) => (
              <motion.div
                key={label}
                variants={statZoom}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.55 }}
                transition={{ delay: index * 0.1 }}
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
            {experience.map((item) => (
              <motion.article
                key={item.company}
                variants={experienceZoom}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.32 }}
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
                    <motion.li key={point} variants={fadeUp} className="flex gap-3 text-sm leading-6 text-haze">
                      <Zap size={16} className="mt-1 shrink-0 text-ion" aria-hidden="true" />
                      {point}
                    </motion.li>
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
                variants={projectZoom}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.28 }}
                whileHover={{ y: -8, scale: 1.015 }}
                className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-6 shadow-lift backdrop-blur-xl [transform-style:preserve-3d] md:min-h-[320px]"
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
                      <motion.span key={tech} variants={tagFade} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-haze">
                        {tech}
                      </motion.span>
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
            <motion.div
              key={category}
              variants={skillPop}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.42 }}
              className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5"
            >
              <h3 className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-cyanite">
                <Code2 size={16} aria-hidden="true" />
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={skillPop}
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
    </>
  );
}
