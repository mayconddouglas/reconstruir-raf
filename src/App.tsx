/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, ReactNode } from 'react';
import { ArrowRight, CheckCircle, ChevronRight, ChevronLeft, ChevronDown, Star, Menu, MessageCircle, Phone, X, Instagram, Mail, MapPin, ShieldCheck, Clock, Award } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionTemplate } from 'motion/react';
import QuoteModal from './components/QuoteModal';
import { BackToTopButton } from './components/BackToTopButton';

import imgRes01 from './assets/images/portfolio_res_01_1783826741118.jpg';
import imgCom02 from './assets/images/portfolio_com_02_1783826755169.jpg';
import imgInt03 from './assets/images/portfolio_int_03_1783826766616.jpg';
import imgRes04 from './assets/images/portfolio_res_04_1783826777189.jpg';
import imgCom05 from './assets/images/portfolio_com_05_1783826788612.jpg';
import imgRes06 from './assets/images/portfolio_res_06_1783826800747.jpg';
import imgInt07 from './assets/images/portfolio_int_07_1783826812968.jpg';
import imgCom08 from './assets/images/portfolio_com_08_1783826823609.jpg';

const NAV_LINKS = [
  { id: 'sobre', label: 'Sobre Nós' },
  { id: 'servicos', label: 'Especialidades' },
  { id: 'portfolio', label: 'Portfólio' },
  { id: 'depoimentos', label: 'Depoimentos' },
  { id: 'contato', label: 'Contato' },
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Maurício Albuquerque",
    role: "Proprietário",
    text: "A Reconstruir entregou nossa casa rigorosamente dentro do prazo e sem qualquer desvio no orçamento planejado. A equipe técnica nos deu total tranquilidade do início ao fim da construção.",
    rating: 5,
    code: "SYS // TST-01",
    tag: "OBRA RESIDENCIAL",
    bgImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=50&fm=webp",
  },
  {
    id: 2,
    name: "Juliana Mendes",
    role: "Diretora de Operações",
    text: "Reformamos nossa sede comercial de 1.200m² sem parar nossas atividades operacionais. A equipe foi extremamente organizada, limpa e cumpriu todas as metas de segurança e prazos.",
    rating: 5,
    code: "SYS // TST-02",
    tag: "OBRA COMERCIAL",
    bgImage: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=50&fm=webp",
  },
  {
    id: 3,
    name: "Ricardo Vasconcelos",
    role: "Arquiteto",
    text: "Como arquiteto, exijo fidelidade total nas especificações técnicas. A Reconstruir executa os acabamentos, paginações e iluminação com perfeição e rigor técnico absoluto.",
    rating: 5,
    code: "SYS // TST-03",
    tag: "PARCERIA TÉCNICA",
    bgImage: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=50&fm=webp",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

// ==========================================
// ENHANCEMENT 1: LUXURY SCREEN PRELOADER
// ==========================================
interface LuxuryPreloaderProps {
  onComplete: () => void;
}

function LuxuryPreloader({ onComplete }: LuxuryPreloaderProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        y: "-100%",
        transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] }
      }}
      className="fixed inset-0 bg-neutral-950 z-[9999] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Subtle blueprint grid line decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40" />
      
      <div className="relative flex flex-col items-center max-w-xs w-full text-center space-y-6 px-6">
        {/* Decorative architectural blade */}
        <motion.div 
          initial={{ height: 0 }}
          animate={{ height: "48px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-[1.5px] bg-primary mb-2"
        />

        <div className="space-y-1">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-4xl font-heading font-light tracking-[0.2em] text-white uppercase"
          >
            RECONSTRUIR
          </motion.h2>
        </div>

        {/* Luxury loading progress indicator */}
        <div className="w-full h-[1px] bg-white/5 relative overflow-hidden mt-6">
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
            onAnimationComplete={onComplete}
            className="absolute inset-0 bg-primary origin-left"
          />
        </div>
      </div>
    </motion.div>
  );
}

// ==========================================
// ENHANCEMENT 3: PORTFOLIO SCROLL PARALLAX CARD
// ==========================================
interface PortfolioCardProps {
  idCode: string;
  area: string;
  title: string;
  imgUrl: string;
  widthClass: string;
  heightClass: string;
  index: number;
}

function PortfolioCard({ idCode, area, title, imgUrl, widthClass, heightClass, index }: PortfolioCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover="hover"
      variants={{
        hover: { y: -6 }
      }}
      className={`group relative overflow-hidden cursor-pointer bg-neutral-900 border border-white/5 hover:border-primary/25 transition-all duration-500 rounded-2xl ${widthClass} ${heightClass}`}
    >
      {/* Active Blade Transition */}
      <motion.div 
        className="absolute left-0 bg-primary/20 group-hover:bg-primary transition-colors duration-500 z-30"
        initial={{ height: "40px", width: "2px", top: "32px" }}
        variants={{
          hover: { height: "100%", width: "4px", top: "0px" }
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Image Container with Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img 
          src={imgUrl} 
          alt={title} 
          className="absolute inset-0 w-full h-full object-cover origin-center"
          variants={{
            hover: { scale: 1.04 }
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          referrerPolicy="no-referrer"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/25 to-neutral-950/10 pointer-events-none" />
      </div>

      {/* Glassmorphic Caption Banner */}
      <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 p-5 rounded-xl bg-neutral-950/75 backdrop-blur-md border border-white/5 z-20 transition-all duration-500 group-hover:bg-neutral-950/90 group-hover:border-primary/20">
        <div className="flex items-center justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] md:text-[10px] text-primary uppercase tracking-widest font-semibold">{idCode}</span>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-wider">{area}</span>
            </div>
            <h4 className="font-heading text-lg md:text-xl font-light text-foreground group-hover:text-white transition-colors">{title}</h4>
          </div>
          <div className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/5 transition-colors duration-300">
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-300" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ==========================================
// ENHANCEMENT 4: ELEGANT TEXT REVEAL MASKS
// ==========================================
function RevealHeading({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ==========================================
// NEW ENHANCEMENT: PROGRESSIVE STAGGER REVEAL
// ==========================================
const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05
    }
  }
};

const staggerItemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const aboutItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

interface RevealStaggerProps {
  children: ReactNode;
  className?: string;
  once?: boolean;
  margin?: string;
}

function RevealStagger({ children, className = "", once = true, margin = "-50px" }: RevealStaggerProps) {
  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function RevealItem({ children, className = "", variants = staggerItemVariants }: { children: ReactNode; className?: string; variants?: any }) {
  return (
    <motion.div
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}


function AnimatedNumber({ value, active, duration = 1.2 }: { value: number; active: boolean; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) {
      setCount(0);
      return;
    }
    
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [active, value, duration]);

  return <span>{count}</span>;
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const heroRef = useRef<HTMLDivElement>(null);

  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isHoveringTestimonials, setIsHoveringTestimonials] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const portfolioScrollRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);

  const [cardsActive, setCardsActive] = useState(false);

  const { scrollYProgress: portfolioScrollY } = useScroll({
    target: portfolioScrollRef,
    offset: ["start start", "end end"]
    });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (scrollRef.current) {
        const scrollWidth = scrollRef.current.scrollWidth;
        const clientWidth = scrollRef.current.clientWidth;
        setTranslateX(Math.max(0, scrollWidth - clientWidth));
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    const timer1 = setTimeout(handleResize, 150);
    const timer2 = setTimeout(handleResize, 600);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const portfolioX = useTransform(portfolioScrollY, [0, 1], [0, -translateX]);

  useEffect(() => {
    if (isHoveringTestimonials) return;
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000); // changes every 6 seconds
    return () => clearInterval(interval);
  }, [isHoveringTestimonials]);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);
  
  const col1Images = [
    imgRes01,
    imgCom02,
    imgInt03,
    imgRes04,
    imgCom05
  ];

  const col2Images = [
    imgRes06,
    imgInt07,
    imgCom08,
    imgRes01,
    imgCom02
  ];

  const col3Images = [
    imgInt03,
    imgRes04,
    imgCom05,
    imgRes06,
    imgInt07
  ];

  const fullCol1 = [...col1Images, ...col1Images];
  const fullCol2 = [...col2Images, ...col2Images];
  const fullCol3 = [...col3Images, ...col3Images];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = NAV_LINKS.map(link => document.getElementById(link.id));
      let currentActive = '';
      
      for (const section of sections) {
        if (section) {
          const rect = section.getBoundingClientRect();
          // Check if section is in the top half of the viewport
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= 0) {
            currentActive = section.id;
          }
        }
      }
      setActiveSection(currentActive);
      
      const hero = heroRef.current;
      let shouldShowNav = false;
      if (hero) {
        shouldShowNav = hero.getBoundingClientRect().bottom <= 100;
      } else {
        shouldShowNav = window.scrollY > window.innerHeight * 0.5;
      }
      setShowNav(shouldShowNav);
      if (!shouldShowNav) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { scrollYProgress } = useScroll();

  const x1 = useTransform(scrollYProgress, [0, 0.4], ["0%", "-30%"]);
  const x2 = useTransform(scrollYProgress, [0, 0.4], ["-30%", "0%"]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      {/* Dynamic reading progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[3.5px] bg-primary origin-left z-[999] pointer-events-none" 
        style={{ scaleX: scrollYProgress }} 
      />

      {/* Luxury Preloader */}
      <AnimatePresence>
        {isLoading && (
          <LuxuryPreloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Navigation */}
      <AnimatePresence>
        {showNav && (
          <motion.nav 
            initial={{ y: -50, opacity: 0 }}
            animate={{ 
              y: 0, 
              opacity: 1,
            }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 w-full z-50 transition-all duration-500 pointer-events-none ${
              scrolled ? 'pt-2.5' : 'pt-5 md:pt-6'
            }`}
          >
            <div 
              className={`mx-auto w-[95%] max-w-[1400px] flex items-center justify-between px-4 md:px-6 py-2.5 md:py-3 border transition-all duration-500 pointer-events-auto rounded-[5px] ${
                scrolled 
                  ? 'bg-background/85 backdrop-blur-xl border-white/5 shadow-xl' 
                  : 'bg-background/40 backdrop-blur-md border-white/5 shadow-none'
              }`}
            >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-primary-foreground rounded-[3px]" />
            </div>
            <span className="font-heading font-semibold tracking-wider uppercase text-sm">Reconstruir</span>
          </div>
          
          <div className="hidden lg:flex items-center relative gap-0.5 xl:gap-2">
            {NAV_LINKS.map((link, i) => (
              <a 
                key={link.id}
                href={`#${link.id}`} 
                className={`relative px-2.5 xl:px-4 py-1.5 xl:py-2 text-xs xl:text-sm font-medium transition-colors z-10 flex items-center gap-1.5 xl:gap-2 ${
                  activeSection === link.id ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className="hidden xl:flex items-center justify-center w-5 h-5 rounded-full border border-white/20 text-[9px] font-mono opacity-80">
                  0{i + 1}
                </span>
                {link.label}
                {activeSection === link.id && (
                  <motion.div 
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-white/5 rounded-[5px] -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex">
            <a href="https://wa.me/5581999999999" target="_blank" rel="noreferrer" className="px-3 h-7 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold tracking-wider uppercase flex items-center gap-1 hover:bg-primary/90 transition-all duration-300">
              FALAR NO WHATSAPP
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          <button 
            className="lg:hidden text-foreground p-1.5 z-50 relative pointer-events-auto flex flex-col justify-center items-center w-9 h-9 gap-[5px] focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            <motion.span
              animate={isMobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-5 h-0.5 bg-foreground rounded-full block origin-center"
            />
            <motion.span
              animate={isMobileMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="w-5 h-0.5 bg-foreground rounded-full block origin-center"
            />
            <motion.span
              animate={isMobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-5 h-0.5 bg-foreground rounded-full block origin-center"
            />
          </button>
        </div>
      </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-24 px-6 lg:hidden flex flex-col"
          >
            <div className="flex flex-col gap-4 text-base font-medium mt-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a 
                  key={link.id}
                  href={`#${link.id}`} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + (i * 0.1), duration: 0.4 }}
                  className={`border-b border-white/5 pb-3.5 flex items-center gap-3 ${activeSection === link.id ? 'text-primary' : 'text-foreground/90'}`}
                >
                  <span className="flex items-center justify-center w-6 h-6 rounded-full border border-white/20 text-[10px] font-mono text-muted-foreground">
                    0{i + 1}
                  </span>
                  {link.label}
                </motion.a>
              ))}
              
              <motion.a 
                href="https://wa.me/5581999999999" 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-8 h-12 rounded-full bg-primary text-primary-foreground text-xs font-mono uppercase tracking-wider font-semibold flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                Falar no WhatsApp
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="space-y-32 pb-32">
        {/* Hero Section */}
        <section ref={heroRef} className="relative w-full h-screen flex items-end overflow-hidden">
          {/* Immersive Background Image with Dark Atmosphere Overlay */}
          <div className="absolute inset-0 z-0">
            <motion.div 
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: isLoading ? 0 : 1, scale: isLoading ? 1.05 : 1 }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              className="w-full h-full"
            >
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80" 
                alt="Reconstruir Engenharia - Residência Alto Padrão" 
                className="w-full h-full object-cover filter brightness-90 contrast-[1.02]"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            
            {/* Multi-layered cinematic gradient overlays for pristine text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-neutral-950/20 z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/60 via-transparent to-neutral-950/30 z-10" />
            
            {/* Soft Ambient Light Blobs in the corners */}
            <div className="absolute top-0 left-0 w-[50vw] h-[50vw] rounded-full bg-primary/5 blur-[120px] mix-blend-screen pointer-events-none z-10" />
            <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] rounded-full bg-blue-500/5 blur-[120px] mix-blend-screen pointer-events-none z-10" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay z-10 pointer-events-none" />
          </div>

          {/* Cinematic Layout Container - Matches screenshot structure */}
          <div className="absolute inset-0 z-20 flex items-end pb-12 sm:pb-16 md:pb-20 lg:pb-24 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 max-w-[1500px] mx-auto w-full">
            <div className="grid lg:grid-cols-12 gap-8 items-end w-full">
              {/* Left Column: Huge Uppercase Display Typography & Description */}
              <div className="lg:col-span-8 space-y-6 sm:space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 40 : 0 }}
                  transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h1 className="font-heading text-[1.95rem] xs:text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5.4rem] font-normal uppercase tracking-normal leading-[1.05] text-white">
                    SUA OBRA ENTREGUE <br className="hidden sm:inline" />
                    NO PRAZO E SEM <br />
                    <span className="text-[#9BE2E6] font-medium tracking-wide bg-gradient-to-r from-[#9BE2E6] via-[#b3eff2] to-[#88d5d9] bg-clip-text text-transparent block sm:inline">
                      SURPRESAS NO ORÇAMENTO.
                    </span>
                  </h1>
                </motion.div>
                
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 30 : 0 }}
                  transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="text-neutral-300 text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-lg text-balance"
                >
                  Construímos e reformamos imóveis residenciais e comerciais de alto padrão com total previsibilidade. Planejamento técnico rigoroso, controle de custos em tempo real e entrega rigorosamente no prazo.
                </motion.p>
              </div>

              {/* Right Column: Dynamic Action Button & Subtle Scroll Indicator */}
              <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-6 sm:gap-8 justify-end">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: isLoading ? 0 : 1, scale: isLoading ? 0.95 : 1 }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                >
                  <button 
                    onClick={() => setIsQuoteModalOpen(true)}
                    className="px-6 py-3.5 sm:px-7 sm:py-4 rounded-full bg-[#9BE2E6] text-neutral-950 text-[11px] sm:text-xs font-bold tracking-widest flex items-center gap-4 transition-all duration-300 hover:bg-[#82c9cd] hover:scale-[1.02] active:scale-95 group shadow-lg cursor-pointer"
                  >
                    <span className="uppercase">Solicitar Orçamento</span>
                    <div className="w-8 h-8 rounded-full bg-neutral-950 text-[#9BE2E6] flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <ArrowRight className="w-4 h-4 -rotate-45" />
                    </div>
                  </button>
                </motion.div>

                {/* Minimalist vertical scroll design key */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isLoading ? 0 : 0.6 }}
                  transition={{ duration: 1.2, delay: 0.7 }}
                  className="hidden sm:flex items-center gap-3 text-[10px] text-neutral-400 uppercase tracking-[0.2em]"
                >
                  <span>Explorar</span>
                  <div className="w-8 h-[1px] bg-neutral-600" />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Sliding Image Runway Section */}
        <section className="w-full relative py-12 md:py-20 overflow-hidden select-none bg-background">
          <div className="w-[95%] max-w-[1500px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 mb-8">
            <span className="text-[10px] md:text-[11px] font-mono tracking-[0.25em] uppercase text-primary font-medium block">
              // Portfólio em Foco
            </span>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-light tracking-tight mt-2 text-foreground">
              Nossa Precisão em Detalhes
            </h2>
          </div>
          <div className="flex flex-col gap-6 sm:gap-8 w-full max-w-[100vw]">
            {/* Row 1 - Slides left */}
            <motion.div 
              style={{ x: x1 }}
              className="flex gap-4 sm:gap-6 whitespace-nowrap"
            >
              {[...col1Images, ...col3Images, ...col2Images].map((url, idx) => (
                <div 
                  key={idx} 
                  className="relative flex-shrink-0 w-[240px] sm:w-[320px] md:w-[380px] aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden group shadow-xl border border-white/5 bg-neutral-900"
                >
                  <img 
                    src={url} 
                    alt={`Reconstruir Projeto - ${idx}`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 sm:p-5">
                    <div>
                      <p className="text-[9px] sm:text-xs text-primary font-mono uppercase tracking-wider mb-0.5">PROJETO PREMIUM</p>
                      <h4 className="text-white text-xs sm:text-sm font-heading font-medium">Reconstruir Engenharia</h4>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Row 2 - Slides right */}
            <motion.div 
              style={{ x: x2 }}
              className="flex gap-4 sm:gap-6 whitespace-nowrap"
            >
              {[...col2Images, ...col1Images, ...col3Images].map((url, idx) => (
                <div 
                  key={idx} 
                  className="relative flex-shrink-0 w-[240px] sm:w-[320px] md:w-[380px] aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden group shadow-xl border border-white/5 bg-neutral-900"
                >
                  <img 
                    src={url} 
                    alt={`Reconstruir Projeto - ${idx}`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 sm:p-5">
                    <div>
                      <p className="text-[9px] sm:text-xs text-primary font-mono uppercase tracking-wider mb-0.5">ACABAMENTO EXTRAORDINÁRIO</p>
                      <h4 className="text-white text-xs sm:text-sm font-heading font-medium">Reconstruir Engenharia</h4>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Separator */}
        <div className="max-w-4xl lg:max-w-5xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
          <hr className="border-border" />
        </div>

        {/* About Section */}
        <section id="sobre" className="relative w-full py-24 sm:py-32 md:py-40 bg-background scroll-mt-24">
          <div className="max-w-4xl lg:max-w-5xl mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-12">
            
            {/* Intro Content */}
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start relative mb-16 sm:mb-24">
              {/* Left Column (Section Indicator) */}
              <div className="lg:col-span-4 space-y-1.5">
                <span className="text-[10px] md:text-[11px] font-mono tracking-[0.25em] uppercase text-primary font-medium block">
                  (01) Sobre Nós
                </span>
                <p className="text-muted-foreground text-xs md:text-sm font-light uppercase tracking-widest block">
                  Compromisso com o seu patrimônio.
                </p>
              </div>

              {/* Right Column (Intro Texts) */}
              <div className="lg:col-span-8 space-y-6">
                <h3 className="font-heading text-3xl md:text-5xl lg:text-[3.5rem] font-light tracking-tight text-balance leading-[1.25] text-foreground">
                  Construímos com rigor técnico para proteger e valorizar seu investimento.
                </h3>
                <p className="text-base md:text-lg font-light text-muted-foreground/90 leading-relaxed max-w-2xl mt-4">
                  A Reconstruir é especializada em engenharia de alto padrão. Unimos planejamento financeiro rígido a uma execução milimétrica, eliminando surpresas e atrasos. Cuidamos de todas as etapas para que você tenha tranquilidade absoluta.
                </p>
              </div>
            </div>

            {/* The 3 Glass Cards Grid */}
            <div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-12 sm:mt-16"
            >
              {/* Card 1: 10 Anos */}
              <div className="relative group rounded-[2rem] bg-neutral-950/40 backdrop-blur-3xl border border-white/[0.06] p-8 sm:p-10 flex flex-col justify-between overflow-hidden min-h-[360px] sm:min-h-[380px] shadow-2xl">
                {/* Subtle light reflections on glass card borders */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                
                {/* Subtle dark image background with low opacity for visual texture */}
                <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-[0.05] mix-blend-luminosity filter brightness-40 blur-[0.5px]">
                  <img 
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=50" 
                    alt="Fundo Experiência" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Top of Card */}
                <div className="relative z-10 flex justify-between items-center mb-8">
                  <div className="w-10 h-10 rounded-full bg-white/[0.02] border border-white/10 flex items-center justify-center backdrop-blur-md">
                    <Clock className="w-4 h-4 text-white/70" />
                  </div>
                  <span className="text-[9px] font-mono tracking-[0.25em] text-primary uppercase font-medium">
                    // EXPERIÊNCIA
                  </span>
                </div>

                {/* Main Content (Numeric and Text) */}
                <div className="relative z-10 space-y-6">
                  <div className="flex items-baseline font-heading">
                    <span className="text-6xl sm:text-7xl font-light text-white tracking-tighter leading-none">
                      10
                    </span>
                    <span className="text-primary text-3xl font-light ml-1 select-none font-mono">+</span>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-lg font-heading font-light text-white tracking-tight leading-tight">
                      10 Anos de Experiência
                    </h4>
                    <p className="text-xs text-neutral-400 font-light leading-relaxed">
                      Mais de uma década entregando obras complexas residenciais e comerciais com transparência de custos.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2: Garantia Total */}
              <div className="relative group rounded-[2rem] bg-neutral-950/40 backdrop-blur-3xl border border-white/[0.06] p-8 sm:p-10 flex flex-col justify-between overflow-hidden min-h-[360px] sm:min-h-[380px] shadow-2xl">
                {/* Subtle light reflections on glass card borders */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                
                {/* Subtle dark image background with low opacity for visual texture */}
                <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-[0.05] mix-blend-luminosity filter brightness-40 blur-[0.5px]">
                  <img 
                    src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=50" 
                    alt="Fundo Segurança" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Top of Card */}
                <div className="relative z-10 flex justify-between items-center mb-8">
                  <div className="w-10 h-10 rounded-full bg-white/[0.02] border border-white/10 flex items-center justify-center backdrop-blur-md">
                    <ShieldCheck className="w-4 h-4 text-white/70" />
                  </div>
                  <span className="text-[9px] font-mono tracking-[0.25em] text-[#9BE2E6] uppercase font-medium">
                    // SEGURANÇA
                  </span>
                </div>

                {/* Main Content (Numeric and Text) */}
                <div className="relative z-10 space-y-6">
                  <div className="flex items-baseline font-heading">
                    <span className="text-6xl sm:text-7xl font-light text-white tracking-tighter leading-none">
                      100
                    </span>
                    <span className="text-[#9BE2E6] text-3xl font-light ml-1 select-none font-mono">%</span>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-lg font-heading font-light text-white tracking-tight leading-tight">
                      Garantia de Entrega
                    </h4>
                    <p className="text-xs text-neutral-400 font-light leading-relaxed">
                      Garantimos o cumprimento fiel do projeto e assistência técnica completa no pós-obra.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3: Conformidade NBR */}
              <div className="relative group rounded-[2rem] bg-neutral-950/40 backdrop-blur-3xl border border-white/[0.06] p-8 sm:p-10 flex flex-col justify-between overflow-hidden min-h-[360px] sm:min-h-[380px] shadow-2xl">
                {/* Subtle light reflections on glass card borders */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                
                {/* Subtle dark image background with low opacity for visual texture */}
                <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-[0.05] mix-blend-luminosity filter brightness-40 blur-[0.5px]">
                  <img 
                    src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=50" 
                    alt="Fundo Engenharia" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Top of Card */}
                <div className="relative z-10 flex justify-between items-center mb-8">
                  <div className="w-10 h-10 rounded-full bg-white/[0.02] border border-white/10 flex items-center justify-center backdrop-blur-md">
                    <Award className="w-4 h-4 text-white/70" />
                  </div>
                  <span className="text-[9px] font-mono tracking-[0.25em] text-primary uppercase font-medium">
                    // ENGENHARIA
                  </span>
                </div>

                {/* Main Content (Numeric and Text) */}
                <div className="relative z-10 space-y-6">
                  <div className="flex items-baseline font-heading">
                    <span className="text-6xl sm:text-7xl font-light text-white tracking-tighter leading-none">
                      100
                    </span>
                    <span className="text-primary text-3xl font-light ml-1 select-none font-mono">%</span>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-lg font-heading font-light text-white tracking-tight leading-tight">
                      Rigor Técnico Total
                    </h4>
                    <p className="text-xs text-neutral-400 font-light leading-relaxed">
                      Todas as obras seguem rigorosamente as normas técnicas da ABNT, assegurando máxima segurança e valorização do imóvel.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Expertise Section */}
        <section id="servicos" className="px-4 sm:px-6 md:px-10 lg:px-12 scroll-mt-32">
          <div className="max-w-4xl lg:max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Left Column (Sticky Indicator) */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-3 space-y-1.5 lg:sticky lg:top-32"
              >
                <span className="text-[10px] md:text-[11px] font-mono tracking-[0.25em] uppercase text-primary font-medium block">
                  (02) Especialidades
                </span>
                <p className="text-muted-foreground text-xs md:text-sm font-light uppercase tracking-widest block">
                  Engenharia e Soluções.
                </p>
              </motion.div>

              {/* Right Column (Content) */}
              <RevealStagger className="lg:col-span-9 space-y-8">
                {/* Service 1 */}
                <RevealItem>
                  <motion.div 
                    whileHover="hover"
                    variants={{
                      hover: { y: -4 }
                    }}
                    className="relative group overflow-hidden rounded-2xl bg-neutral-900/20 backdrop-blur-sm border border-white/5 hover:border-primary/25 transition-all duration-500 p-1"
                  >
                    {/* Left structural "Blade" indicator */}
                    <motion.div 
                      className="absolute left-0 bg-primary/20 group-hover:bg-primary transition-colors duration-500"
                      initial={{ height: "32px", width: "2px", top: "24px" }}
                      variants={{
                        hover: { height: "100%", width: "3.5px", top: "0px" }
                      }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    />
                    
                    <div className="grid md:grid-cols-12 gap-6 items-center">
                      <div className="md:col-span-5 h-[240px] md:h-[280px] lg:h-[320px] overflow-hidden rounded-[1.25rem] relative m-2">
                        <img 
                          src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=60&fm=webp" 
                          alt="Instalação Elétrica" 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 to-transparent pointer-events-none" />
                      </div>
                      <div className="md:col-span-7 p-6 md:pr-10 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center justify-center rounded-full bg-primary/10 text-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-wider">
                            Carro-chefe
                          </span>
                          <span className="font-mono text-[9px] text-muted-foreground/30 group-hover:text-primary/40 transition-colors duration-500">
                            SYS // EL-01
                          </span>
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-heading text-xl md:text-2xl font-medium text-foreground">Sistemas Elétricos</h3>
                          <p className="text-xs md:text-sm text-muted-foreground/75 leading-relaxed font-light">
                            Instalações elétricas seguras e dimensionadas com precisão de carga para o seu imóvel. Total conformidade técnica para evitar sobrecargas e garantir máxima eficiência energética.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </RevealItem>

                {/* Service 2 */}
                <RevealItem>
                  <motion.div 
                    whileHover="hover"
                    variants={{
                      hover: { y: -4 }
                    }}
                    className="relative group overflow-hidden rounded-2xl bg-neutral-900/20 backdrop-blur-sm border border-white/5 hover:border-primary/25 transition-all duration-500 p-1"
                  >
                    {/* Left structural "Blade" indicator */}
                    <motion.div 
                      className="absolute left-0 bg-primary/20 group-hover:bg-primary transition-colors duration-500"
                      initial={{ height: "32px", width: "2px", top: "24px" }}
                      variants={{
                        hover: { height: "100%", width: "3.5px", top: "0px" }
                      }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    />
                    
                    <div className="grid md:grid-cols-12 gap-6 items-center">
                      <div className="md:col-span-5 h-[240px] md:h-[280px] lg:h-[320px] overflow-hidden rounded-[1.25rem] relative m-2 md:order-2">
                        <img 
                          src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=60&fm=webp" 
                          alt="Pintura e Acabamento" 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 to-transparent pointer-events-none" />
                      </div>
                      <div className="md:col-span-7 p-6 md:pl-10 space-y-4 md:order-1">
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center justify-center rounded-full bg-white/5 text-muted-foreground px-3 py-1 text-[10px] font-semibold uppercase tracking-wider">
                            Alto Padrão
                          </span>
                          <span className="font-mono text-[9px] text-muted-foreground/30 group-hover:text-primary/40 transition-colors duration-500">
                            SYS // PA-02
                          </span>
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-heading text-xl md:text-2xl font-medium text-foreground">Pintura e Acabamento Premium</h3>
                          <p className="text-xs md:text-sm text-muted-foreground/75 leading-relaxed font-light">
                            Acabamento impecável com aplicação de tintas e materiais de linha superior. Superfícies lisas, uniformes e de alta durabilidade, elevando a estética e o valor de mercado do seu imóvel.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </RevealItem>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Service 3 */}
                  <RevealItem>
                    <motion.div 
                      whileHover="hover"
                      variants={{
                        hover: { y: -4 }
                      }}
                      className="relative group overflow-hidden rounded-2xl bg-neutral-900/20 backdrop-blur-sm border border-white/5 hover:border-primary/25 transition-all duration-500 p-1"
                    >
                      {/* Left structural "Blade" indicator */}
                      <motion.div 
                        className="absolute left-0 bg-primary/20 group-hover:bg-primary transition-colors duration-500"
                        initial={{ height: "32px", width: "2px", top: "24px" }}
                        variants={{
                          hover: { height: "100%", width: "3.5px", top: "0px" }
                        }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      />
                      
                      <div className="space-y-4">
                        <div className="h-[180px] md:h-[200px] lg:h-[240px] overflow-hidden rounded-[1.25rem] relative m-2">
                          <img 
                            src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=500&q=60&fm=webp" 
                            alt="Gesso" 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            decoding="async"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 to-transparent pointer-events-none" />
                        </div>
                        <div className="p-6 pt-2 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/60">Gesso & Drywall</span>
                            <span className="font-mono text-[9px] text-muted-foreground/30 group-hover:text-primary/40 transition-colors duration-500">
                              SYS // GS-03
                            </span>
                          </div>
                          <div className="space-y-1.5">
                            <h3 className="font-heading text-lg font-medium text-foreground">Gesso e Drywall</h3>
                            <p className="text-xs md:text-sm text-muted-foreground/75 leading-relaxed font-light">
                              Forros de gesso modernos, sancas decorativas e divisórias de drywall. Alinhamento milimétrico e superfícies prontas para receber qualquer projeto luminotécnico.
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </RevealItem>

                  {/* Service 4 */}
                  <RevealItem>
                    <motion.div 
                      whileHover="hover"
                      variants={{
                        hover: { y: -4 }
                      }}
                      className="relative group overflow-hidden rounded-2xl bg-[#853C2D] border-none shadow-[0_12px_24px_-8px_rgba(133,60,45,0.35)] transition-all duration-500 p-1"
                    >
                      {/* Left structural "Blade" indicator */}
                      <motion.div 
                        className="absolute left-0 bg-white/25 group-hover:bg-white transition-colors duration-500"
                        initial={{ height: "32px", width: "2px", top: "24px" }}
                        variants={{
                          hover: { height: "100%", width: "3.5px", top: "0px" }
                        }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      />
                      
                      <div className="space-y-4">
                        <div className="h-[180px] md:h-[200px] lg:h-[240px] overflow-hidden rounded-[1.25rem] relative m-2">
                          <img 
                            src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=500&q=60&fm=webp" 
                            alt="Revestimentos" 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            decoding="async"
                          />
                          <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                        </div>
                        <div className="p-6 pt-2 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-orange-100/70">Pisos & Revestimentos</span>
                            <span className="font-mono text-[9px] text-orange-200/40 group-hover:text-white/60 transition-colors duration-500">
                              SYS // RV-04
                            </span>
                          </div>
                          <div className="space-y-1.5">
                            <h3 className="font-heading text-lg font-medium text-white">Pisos e Revestimentos</h3>
                            <p className="text-xs md:text-sm text-orange-50/90 leading-relaxed font-normal">
                              Assentamento profissional de mármores, porcelanatos e pedras naturais. Paginação inteligente com alinhamento preciso, nivelamento perfeito e desperdício mínimo de material.
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </RevealItem>
                </div>
              </RevealStagger>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section 
          id="portfolio" 
          ref={portfolioScrollRef}
          className="relative h-[450vh] sm:h-[550vh] w-full"
        >
          <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden px-4 sm:px-6 md:px-10 lg:px-12 py-4 sm:py-6 md:py-8">
            <div className="w-[95%] max-w-[1500px] mx-auto space-y-4 sm:space-y-6 md:space-y-8">
              {/* Header block spanning the entire width */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-4 sm:pb-5">
                <div className="space-y-1.5 max-w-2xl">
                  <span className="text-[10px] md:text-[11px] font-mono tracking-[0.25em] uppercase text-primary font-medium block">
                    (03) Nosso Portfólio
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-light tracking-tight text-foreground leading-[1.2] text-balance">
                    Projetos reais <span className="text-white font-normal">executados com absoluto rigor e fidelidade técnica</span>.
                  </h3>
                </div>
                <div className="flex items-center gap-4">
                  <span className="hidden md:inline font-mono text-[10px] text-muted-foreground/30 uppercase tracking-widest">// Role para baixo</span>
                  <a 
                    href="https://www.instagram.com/redecoracaogeral" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center gap-1.5 text-primary text-[10px] font-mono uppercase tracking-wider hover:text-primary/80 transition-colors"
                  >
                    Ver no Instagram <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Dynamic Horizontal Track */}
              <div className="relative w-full overflow-hidden" ref={scrollRef}>
                <motion.div 
                  style={{ x: portfolioX }} 
                  className="flex gap-6 md:gap-8 w-max pr-12 py-2"
                >
                  <div className="w-[300px] sm:w-[500px] md:w-[700px] lg:w-[850px] xl:w-[980px] 2xl:w-[1100px] flex-shrink-0">
                    <PortfolioCard 
                      idCode="// PROJETO RES-01"
                      area="450m²"
                      title="Residência Unifamiliar Contemporânea"
                      imgUrl={imgRes01}
                      widthClass="w-full"
                      heightClass="h-[400px] sm:h-[50vh] md:h-[58vh] lg:h-[62vh] xl:h-[65vh] 2xl:h-[68vh]"
                      index={0}
                    />
                  </div>

                  <div className="w-[300px] sm:w-[500px] md:w-[700px] lg:w-[850px] xl:w-[980px] 2xl:w-[1100px] flex-shrink-0">
                    <PortfolioCard 
                      idCode="// PROJETO COM-02"
                      area="1.200m²"
                      title="Escritório Corporativo de Alto Padrão"
                      imgUrl={imgCom02}
                      widthClass="w-full"
                      heightClass="h-[400px] sm:h-[50vh] md:h-[58vh] lg:h-[62vh] xl:h-[65vh] 2xl:h-[68vh]"
                      index={1}
                    />
                  </div>

                  <div className="w-[300px] sm:w-[500px] md:w-[700px] lg:w-[850px] xl:w-[980px] 2xl:w-[1100px] flex-shrink-0">
                    <PortfolioCard 
                      idCode="// PROJETO INT-03"
                      area="180m²"
                      title="Apartamento Residencial de Luxo"
                      imgUrl={imgInt03}
                      widthClass="w-full"
                      heightClass="h-[400px] sm:h-[50vh] md:h-[58vh] lg:h-[62vh] xl:h-[65vh] 2xl:h-[68vh]"
                      index={2}
                    />
                  </div>

                  <div className="w-[300px] sm:w-[500px] md:w-[700px] lg:w-[850px] xl:w-[980px] 2xl:w-[1100px] flex-shrink-0">
                    <PortfolioCard 
                      idCode="// PROJETO RES-04"
                      area="620m²"
                      title="Residência com Área de Lazer Integrada"
                      imgUrl={imgRes04}
                      widthClass="w-full"
                      heightClass="h-[400px] sm:h-[50vh] md:h-[58vh] lg:h-[62vh] xl:h-[65vh] 2xl:h-[68vh]"
                      index={3}
                    />
                  </div>

                  <div className="w-[300px] sm:w-[500px] md:w-[700px] lg:w-[850px] xl:w-[980px] 2xl:w-[1100px] flex-shrink-0">
                    <PortfolioCard 
                      idCode="// PROJETO COM-05"
                      area="3.400m²"
                      title="Reforma de Área Comum Comercial"
                      imgUrl={imgCom05}
                      widthClass="w-full"
                      heightClass="h-[400px] sm:h-[50vh] md:h-[58vh] lg:h-[62vh] xl:h-[65vh] 2xl:h-[68vh]"
                      index={4}
                    />
                  </div>

                  <div className="w-[300px] sm:w-[500px] md:w-[700px] lg:w-[850px] xl:w-[980px] 2xl:w-[1100px] flex-shrink-0">
                    <PortfolioCard 
                      idCode="// PROJETO RES-06"
                      area="290m²"
                      title="Residência de Campo"
                      imgUrl={imgRes06}
                      widthClass="w-full"
                      heightClass="h-[400px] sm:h-[50vh] md:h-[58vh] lg:h-[62vh] xl:h-[65vh] 2xl:h-[68vh]"
                      index={5}
                    />
                  </div>

                  <div className="w-[300px] sm:w-[500px] md:w-[700px] lg:w-[850px] xl:w-[980px] 2xl:w-[1100px] flex-shrink-0">
                    <PortfolioCard 
                      idCode="// PROJETO INT-07"
                      area="95m²"
                      title="Cozinha Gourmet Planejada"
                      imgUrl={imgInt07}
                      widthClass="w-full"
                      heightClass="h-[400px] sm:h-[50vh] md:h-[58vh] lg:h-[62vh] xl:h-[65vh] 2xl:h-[68vh]"
                      index={6}
                    />
                  </div>

                  <div className="w-[300px] sm:w-[500px] md:w-[700px] lg:w-[850px] xl:w-[980px] 2xl:w-[1100px] flex-shrink-0">
                    <PortfolioCard 
                      idCode="// PROJETO COM-08"
                      area="750m²"
                      title="Clínica de Saúde e Bem-Estar"
                      imgUrl={imgCom08}
                      widthClass="w-full"
                      heightClass="h-[400px] sm:h-[50vh] md:h-[58vh] lg:h-[62vh] xl:h-[65vh] 2xl:h-[68vh]"
                      index={7}
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="depoimentos" className="px-4 sm:px-6 md:px-10 lg:px-12 scroll-mt-32">
          <div className="max-w-4xl lg:max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Left Column (Sticky Indicator) */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-3 space-y-1.5 lg:sticky lg:top-32"
              >
                <span className="text-[10px] md:text-[11px] font-mono tracking-[0.25em] uppercase text-primary font-medium block">
                  (04) Depoimentos
                </span>
                <p className="text-muted-foreground text-xs md:text-sm font-light uppercase tracking-widest block">
                  Quem Constrói Conosco.
                </p>
              </motion.div>

              {/* Right Column (Content) */}
              <div className="lg:col-span-9 space-y-12">
                <RevealStagger className="space-y-8">
                  <RevealItem>
                    <h3 className="font-heading text-2xl md:text-4xl lg:text-[2.75rem] font-light tracking-tight text-balance leading-[1.2] text-foreground">
                      A satisfação de quem <span className="text-white font-normal">construiu ou reformou com total tranquilidade</span>.
                    </h3>
                  </RevealItem>

                  <RevealItem>
                    <div 
                      onMouseEnter={() => setIsHoveringTestimonials(true)}
                      onMouseLeave={() => setIsHoveringTestimonials(false)}
                      className="relative group overflow-hidden rounded-2xl bg-neutral-900/20 backdrop-blur-sm border border-white/5 hover:border-primary/25 transition-all duration-500 p-8 md:p-12"
                    >
                      {/* Active Blade Transition */}
                      <motion.div 
                        className="absolute left-0 bg-primary/20 group-hover:bg-primary transition-colors duration-500 z-30"
                        initial={{ height: "40px", width: "2px", top: "32px" }}
                        whileHover={{ height: "100%", width: "4px", top: "0px" }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      />

                      {/* Dynamic Background Image Transition based on Active Testimonial's Project */}
                      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activeTestimonial}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 0.07, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute inset-0 w-full h-full bg-cover bg-center filter grayscale contrast-[1.3] brightness-50"
                            style={{ backgroundImage: `url(${TESTIMONIALS[activeTestimonial].bgImage})` }}
                          />
                        </AnimatePresence>
                        {/* Soft vignette overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-950/60 opacity-80" />
                      </div>

                      {/* Aesthetic blueprint grid lines overlay */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity duration-500" />

                      <div className="relative z-10 flex flex-col justify-between h-full min-h-[280px]">
                        {/* Rating stars and top decoration */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            {[...Array(TESTIMONIALS[activeTestimonial].rating)].map((_, idx) => (
                              <Star key={idx} className="w-4 h-4 fill-primary text-primary" />
                            ))}
                          </div>
                          <span className="font-mono text-[9px] text-muted-foreground/30 group-hover:text-primary/40 transition-colors duration-500">
                            {TESTIMONIALS[activeTestimonial].code}
                          </span>
                        </div>

                        {/* Big quote content with elegant crossfade animation */}
                        <div className="my-8">
                          <AnimatePresence mode="wait">
                            <motion.p 
                              key={activeTestimonial}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                              className="font-heading text-lg md:text-xl font-light text-foreground group-hover:text-white transition-colors leading-relaxed italic"
                            >
                              "{TESTIMONIALS[activeTestimonial].text}"
                            </motion.p>
                          </AnimatePresence>
                        </div>

                        {/* Author details and navigation footer */}
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-6 border-t border-white/5">
                          <div className="min-h-[5rem] sm:min-h-[4.5rem] h-auto">
                            <AnimatePresence mode="wait">
                              <motion.div 
                                key={activeTestimonial}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                className="space-y-1"
                              >
                                <span className="font-mono text-[9px] md:text-[10px] text-primary uppercase tracking-widest font-semibold block">
                                  // {TESTIMONIALS[activeTestimonial].tag}
                                </span>
                                <h4 className="font-heading text-base md:text-lg font-medium text-foreground">{TESTIMONIALS[activeTestimonial].name}</h4>
                                <p className="text-xs text-muted-foreground/75 font-light">{TESTIMONIALS[activeTestimonial].role}</p>
                              </motion.div>
                            </AnimatePresence>
                          </div>

                          {/* Navigation Buttons and dots */}
                          <div className="flex items-center gap-4 self-end sm:self-auto">
                            {/* Dot Indicators */}
                            <div className="flex items-center gap-1.5">
                              {TESTIMONIALS.map((_, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setActiveTestimonial(idx)}
                                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                    activeTestimonial === idx 
                                      ? 'bg-primary w-4' 
                                      : 'bg-white/20 hover:bg-white/40'
                                  }`}
                                  aria-label={`Ir para depoimento ${idx + 1}`}
                                />
                              ))}
                            </div>

                            {/* Arrow Buttons */}
                            <div className="flex items-center gap-1">
                              <button 
                                onClick={() => setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                                className="w-8 h-8 rounded-full border border-white/10 hover:border-white/20 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-white/5 transition-all duration-300"
                                aria-label="Depoimento anterior"
                              >
                                <ChevronLeft className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length)}
                                className="w-8 h-8 rounded-full border border-white/10 hover:border-white/20 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-white/5 transition-all duration-300"
                                aria-label="Próximo depoimento"
                              >
                                <ChevronRight className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </RevealItem>
                </RevealStagger>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contato" className="px-4 sm:px-6 md:px-10 lg:px-12 scroll-mt-32">
          <div className="max-w-4xl lg:max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Left Column (Sticky Indicator) */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-3 space-y-1.5 lg:sticky lg:top-32"
              >
                <span className="text-[10px] md:text-[11px] font-mono tracking-[0.25em] uppercase text-primary font-medium block">
                  (05) Contato
                </span>
                <p className="text-muted-foreground text-xs md:text-sm font-light uppercase tracking-widest block">
                  Fale com um Engenheiro.
                </p>
              </motion.div>

              {/* Right Column (Content Card) */}
              <div className="lg:col-span-9">
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  whileHover="hover"
                  variants={{
                    hover: { y: -4 }
                  }}
                  className="group relative overflow-hidden rounded-2xl bg-neutral-900/20 backdrop-blur-sm border border-white/5 hover:border-primary/25 transition-all duration-500 p-8 md:p-12"
                >
                  {/* Active Blade Transition */}
                  <motion.div 
                    className="absolute left-0 bg-primary/20 group-hover:bg-primary transition-colors duration-500 z-30"
                    initial={{ height: "40px", width: "2px", top: "32px" }}
                    variants={{
                      hover: { height: "100%", width: "4.5px", top: "0px" }
                    }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />

                  {/* Aesthetic blueprint grid lines overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity duration-500" />
                  
                  <RevealStagger className="relative z-10 space-y-8">
                    <div className="space-y-4 text-left">
                      <RevealItem>
                        <h3 className="font-heading text-3xl md:text-5xl font-light tracking-tight text-balance leading-[1.15] text-foreground">
                          Construa ou reforme seu imóvel com <span className="text-white font-normal">total segurança e orçamento garantido</span>.
                        </h3>
                      </RevealItem>
                      <RevealItem>
                        <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-light max-w-2xl">
                          Agende uma reunião técnica com nossos engenheiros. Analisamos seu projeto de arquitetura para apresentar soluções inteligentes de viabilidade e um cronograma físico-financeiro detalhado e sem surpresas.
                        </p>
                      </RevealItem>
                    </div>

                    <RevealItem>
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                        <a 
                          href="https://wa.me/5581999999999" 
                          target="_blank"
                          rel="noreferrer"
                          className="h-12 px-6 rounded-full bg-primary text-primary-foreground text-xs font-mono uppercase tracking-wider font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/10"
                        >
                          Chamar no WhatsApp
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                        <button 
                          onClick={() => setIsQuoteModalOpen(true)}
                          className="h-12 px-6 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-foreground text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 hover:border-white/20 transition-all duration-300 cursor-pointer"
                        >
                          Solicitar Orçamento
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </RevealItem>
                  </RevealStagger>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-neutral-950/20 backdrop-blur-sm pt-20 pb-12 px-4 sm:px-6 md:px-10 lg:px-12">
        <div className="max-w-4xl lg:max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16">
            {/* Left Column (Brand Identity & Philosophy) */}
            <div className="lg:col-span-3 space-y-6">
              <div className="space-y-1.5">
                <span className="text-[10px] md:text-[11px] font-mono tracking-[0.25em] uppercase text-primary font-medium block">
                  RECONSTRUIR
                </span>
                <p className="text-muted-foreground text-xs md:text-sm font-light uppercase tracking-widest block">
                  Engenharia & Arquitetura.
                </p>
              </div>

              <div className="flex items-center gap-2.5 pt-2">
                <div className="w-6 h-6 bg-primary/10 border border-primary/20 rounded flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-primary rounded-sm" />
                </div>
                <span className="font-heading font-light text-base tracking-widest uppercase text-white">Reconstruir</span>
              </div>
              
              <p className="text-muted-foreground text-xs md:text-sm leading-relaxed font-light max-w-sm">
                Construções e reformas de alto padrão sob o rigor técnico de engenharia. Transparência, precisão de cronograma e fidelidade ao seu projeto.
              </p>
            </div>

            {/* Right Column (Navigation & Details) */}
            <div className="lg:col-span-9 grid sm:grid-cols-2 md:grid-cols-3 gap-12 sm:gap-8">
              {/* Contato Column */}
              <div className="space-y-4">
                <span className="font-mono text-[9px] md:text-[10px] text-primary uppercase tracking-widest font-semibold block">
                  // CONTATO
                </span>
                <ul className="space-y-3.5 text-xs md:text-sm font-light text-muted-foreground">
                  <li className="flex items-center gap-2.5 hover:text-white transition-colors duration-300">
                    <MapPin className="w-4 h-4 text-primary/75" />
                    <span>Pernambuco, BR</span>
                  </li>
                  <li className="flex items-center gap-2.5 hover:text-white transition-colors duration-300">
                    <Phone className="w-4 h-4 text-primary/75" />
                    <span>(81) 99999-9999</span>
                  </li>
                  <li className="flex items-center gap-2.5 hover:text-white transition-colors duration-300">
                    <Mail className="w-4 h-4 text-primary/75" />
                    <span>contato@reconstruir.com</span>
                  </li>
                </ul>
              </div>

              {/* Links Column */}
              <div className="space-y-4">
                <span className="font-mono text-[9px] md:text-[10px] text-primary uppercase tracking-widest font-semibold block">
                  // NAVEGAÇÃO
                </span>
                <ul className="space-y-3 text-xs md:text-sm font-light text-muted-foreground">
                  <li>
                    <a href="#sobre" className="hover:text-white hover:underline decoration-primary/50 underline-offset-4 transition-colors duration-300">
                      Sobre Nós
                    </a>
                  </li>
                  <li>
                    <a href="#servicos" className="hover:text-white hover:underline decoration-primary/50 underline-offset-4 transition-colors duration-300">
                      Nossos Serviços
                    </a>
                  </li>
                  <li>
                    <a href="#portfolio" className="hover:text-white hover:underline decoration-primary/50 underline-offset-4 transition-colors duration-300">
                      Portfólio
                    </a>
                  </li>
                  <li>
                    <a href="#depoimentos" className="hover:text-white hover:underline decoration-primary/50 underline-offset-4 transition-colors duration-300">
                      Depoimentos
                    </a>
                  </li>
                </ul>
              </div>

              {/* Status/Clock/Standards Column */}
              <div className="space-y-4">
                <span className="font-mono text-[9px] md:text-[10px] text-primary uppercase tracking-widest font-semibold block">
                  // SISTEMA GESTÃO
                </span>
                <div className="space-y-3.5 text-xs font-mono text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                    <span>PADRÃO ISO 9001:2015</span>
                  </p>
                  <p className="text-[11px] leading-relaxed font-light">
                    Metodologia ágil de planejamento integrada ao cumprimento estrito de prazos e orçamentos.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Fine Print */}
          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] md:text-xs font-mono text-muted-foreground">
            <p>© {new Date().getFullYear()} RECONSTRUIR. Projetando e executando o amanhã.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition-colors duration-300">TERMOS //</a>
              <a href="#" className="hover:text-white transition-colors duration-300">PRIVACIDADE</a>
            </div>
          </div>
        </div>
      </footer>

      <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
      <BackToTopButton />
    </div>
  );
}

