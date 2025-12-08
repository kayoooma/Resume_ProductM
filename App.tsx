import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence, useMotionTemplate, useMotionValue, Variants } from 'framer-motion';
import { 
  Sun, Moon, Globe, ArrowRight, Download, Mail, Phone, MapPin, 
  Linkedin, Github, ExternalLink, ArrowUpRight, Check, Sparkles, Target, Zap, 
  Layers, ChevronDown, Copy, Send, MessageCircle
} from 'lucide-react';
import { RESUME_DATA } from './constants';
import { Language } from './types';

// --- CONFIGURATION ---
// IMPORTANT: Save your photo as 'avatar.png' in the public/root folder next to index.html
const USER_PHOTO_URL = "./avatar.png"; 

// --- ANIMATION VARIANTS ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const revealText: Variants = {
  hidden: { y: '100%' },
  visible: { y: '0%', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

// --- SUB-COMPONENTS ---

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setHovering(
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') !== null || 
        target.closest('a') !== null
      );
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-primary pointer-events-none z-[9999] hidden md:block mix-blend-difference"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
        scale: hovering ? 2.5 : 1,
        backgroundColor: hovering ? 'rgba(59, 130, 246, 1)' : 'transparent',
        borderColor: hovering ? 'transparent' : '#3b82f6'
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.1 }}
    />
  );
};

const MagneticButton = ({ children, className, onClick, href }: any) => {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = (ref.current as HTMLElement).getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const { x, y } = position;
  
  const Component = href ? motion.a : motion.button;
  const props = href ? { href, target: "_blank", rel: "noreferrer" } : { onClick };

  return (
    <Component
      ref={ref as any}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
};

const CopyButton = ({ text, label }: { text: string, label: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button 
      onClick={handleCopy}
      className="group relative flex items-center gap-4 p-4 md:p-6 w-full bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all text-left"
    >
      <div className={`p-4 rounded-full ${copied ? 'bg-green-500/20 text-green-500' : 'bg-primary/20 text-primary'} transition-colors`}>
        {copied ? <Check size={24} /> : <Copy size={24} />}
      </div>
      <div>
        <div className="text-xs uppercase tracking-widest text-gray-400 mb-1">{label}</div>
        <div className="text-lg md:text-2xl font-bold text-white break-all">{text}</div>
      </div>
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-white text-black px-2 py-1 rounded">
        {copied ? 'Copied!' : 'Click to Copy'}
      </div>
    </button>
  );
};

const Marquee = ({ items }: { items: string[] }) => (
  <div className="relative flex overflow-x-hidden bg-primary text-white py-6 font-display font-bold uppercase tracking-wider text-xl md:text-3xl">
    <div className="absolute inset-0 bg-gradient-to-r from-primary via-blue-600 to-primary opacity-50 animate-pulse" />
    <div className="animate-marquee whitespace-nowrap flex space-x-12 px-4 relative z-10">
      {items.map((item, i) => <span key={i} className="flex items-center gap-6">{item} <span className="text-white/40">✦</span></span>)}
      {items.map((item, i) => <span key={`dup-${i}`} className="flex items-center gap-6">{item} <span className="text-white/40">✦</span></span>)}
      {items.map((item, i) => <span key={`dup2-${i}`} className="flex items-center gap-6">{item} <span className="text-white/40">✦</span></span>)}
    </div>
  </div>
);

const Navbar = ({ lang, setLang, darkMode, setDarkMode }: any) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "circOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-4' : 'py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className={`glass-panel rounded-full px-6 py-4 flex justify-between items-center transition-all ${
          scrolled ? 'bg-white/80 dark:bg-black/80 shadow-2xl backdrop-blur-xl border-gray-200/50 dark:border-white/10' : 'bg-transparent border-transparent'
        }`}>
          <a href="#" className="font-display font-bold text-2xl tracking-tighter hover:opacity-70 transition-opacity flex items-center gap-1">
            K<span className="text-primary animate-pulse">.</span>S
          </a>

          <div className="hidden md:flex items-center gap-10">
            {['About', 'Experience', 'Skills', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium hover:text-primary transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}
              className="px-4 py-2 rounded-full text-xs font-bold border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors uppercase tracking-widest"
            >
              {lang}
            </button>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-primary"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

const SpotlightCard = ({ children, className = "", delay = 0 }: any) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: any) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`group relative border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#111] overflow-hidden rounded-3xl ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(59, 130, 246, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </motion.div>
  );
};

// --- MAIN PAGE COMPONENT ---

export default function App() {
  const [lang, setLang] = useState<Language>('ru');
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  
  const content = RESUME_DATA[lang];
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -300]);
  
  // Theme Toggle Effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Preloader Logic
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-dark z-[100] flex items-center justify-center text-white">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-7xl font-bold tracking-tighter mb-8"
          >
            KS<span className="text-primary">.</span>
          </motion.div>
          <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              className="h-full bg-primary box-shadow-[0_0_20px_rgba(59,130,246,0.8)]"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#050505] text-slate-900 dark:text-slate-200 overflow-hidden selection:bg-primary selection:text-white">
      <CustomCursor />
      <Navbar lang={lang} setLang={setLang} darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* AMBIENT BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse duration-[10000ms]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse duration-[8000ms]" />
      </div>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-4 pt-20 overflow-hidden">
        <div className="max-w-7xl w-full mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-24">
          
          {/* Text Content */}
          <div className="md:w-[55%] order-2 md:order-1 relative z-20 pt-10 md:pt-0">
             <motion.div 
               initial={{ opacity: 0, x: -20 }} 
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.2 }}
               className="flex items-center gap-2 mb-6"
             >
               <span className="w-12 h-[1px] bg-primary"></span>
               <span className="text-primary font-bold tracking-widest uppercase text-sm">{content.hero.greeting}</span>
             </motion.div>

            <div className="overflow-hidden">
              <motion.h1 
                variants={staggerContainer}
                initial="hidden" 
                animate="visible"
                className="font-display font-bold text-[13vw] md:text-[8rem] leading-[0.9] tracking-tighter"
              >
                <motion.div variants={revealText} className="text-slate-900 dark:text-white">PRODUCT</motion.div>
                <motion.div variants={revealText} className="text-gray-400 dark:text-gray-600 flex items-center gap-4">
                  OWNER <span className="text-primary text-4xl md:text-6xl animate-bounce">↓</span>
                </motion.div>
              </motion.h1>
            </div>
            
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-lg my-8 md:my-12 font-light leading-relaxed border-l-2 border-primary/30 pl-6"
            >
              {content.hero.description}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-wrap gap-6"
            >
              <MagneticButton 
                href="#contact"
                className="px-10 py-5 bg-primary text-white rounded-full font-bold text-lg hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.6)] transition-all flex items-center gap-3"
              >
                {content.hero.cta_primary} <ArrowRight size={20} />
              </MagneticButton>
              <MagneticButton 
                onClick={() => window.print()}
                className="px-10 py-5 bg-transparent border border-gray-300 dark:border-gray-700 rounded-full font-bold text-lg hover:bg-white dark:hover:bg-white/10 transition-colors flex items-center gap-3"
              >
                {content.hero.cta_secondary} <Download size={20} />
              </MagneticButton>
            </motion.div>
          </div>

          {/* Hero Image - FIXED to use user photo */}
          <motion.div 
            style={{ y: y1 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: "circOut" }}
            className="md:w-[45%] order-1 md:order-2 relative"
          >
            <div className="relative w-80 h-[26rem] md:w-[500px] md:h-[650px] mx-auto group">
              {/* Refined clean frame for photo */}
              <div className="relative h-full w-full rounded-[2rem] overflow-hidden shadow-2xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-white/10">
                <img 
                  src={USER_PHOTO_URL} 
                  alt="Komil Sultonov" 
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                />
                
                {/* Subtle Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-white uppercase tracking-widest border border-white/20 mb-3">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Open to Work
                  </div>
                </div>
              </div>

              {/* Decorative Element Behind */}
              <div className="absolute -z-10 top-10 -right-10 w-full h-full rounded-[2rem] border-2 border-dashed border-primary/30 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-500" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* MARQUEE SECTION */}
      <section className="py-20 bg-white dark:bg-black border-y border-gray-100 dark:border-white/5">
        <Marquee items={["Product Management", "Data Analytics", "Strategy", "User Research", "Agile Leadership", "AI Integration", "Growth"]} />
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid md:grid-cols-12 gap-16">
            <div className="md:col-span-5">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="sticky top-40"
              >
                <h2 className="text-xs font-bold tracking-[0.3em] text-primary uppercase mb-6 flex items-center gap-2">
                  <span className="w-8 h-[2px] bg-primary"></span> About Me
                </h2>
                <h3 className="text-5xl md:text-7xl font-display font-bold leading-[0.9] mb-10">
                  Bridging <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Business</span> <br/>
                  & Technology.
                </h3>
                <div className="p-8 bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/10 backdrop-blur-sm">
                   <p className="font-serif italic text-2xl text-gray-500 dark:text-gray-400">
                     "I don't just manage products; I engineer value systems that scale."
                   </p>
                </div>
              </motion.div>
            </div>
            
            <div className="md:col-span-7 space-y-10 pt-8">
              {content.about.content.map((paragraph, idx) => (
                <motion.p 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-xl md:text-2xl font-light leading-relaxed text-gray-700 dark:text-gray-300 first-letter:text-5xl first-letter:font-bold first-letter:mr-2 first-letter:float-left first-letter:text-primary"
                >
                  {paragraph}
                </motion.p>
              ))}
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-16">
                {content.about.stats.map((stat, idx) => (
                  <SpotlightCard key={idx} className="p-8 flex flex-col items-center justify-center text-center group bg-white dark:bg-white/5">
                    <div className="text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-primary to-blue-600 mb-2 group-hover:scale-110 transition-transform">{stat.value}</div>
                    <div className="text-xs uppercase tracking-widest text-gray-500 font-semibold">{stat.label}</div>
                  </SpotlightCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="py-32 bg-gray-50 dark:bg-[#080808] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-24">
             <motion.h2 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[12vw] md:text-[8rem] font-display font-bold text-gray-200 dark:text-[#151515] leading-none select-none"
            >
              CAREER
            </motion.h2>
            <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               className="hidden md:flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-primary pb-8"
            >
              Scroll Down <ArrowRight className="animate-bounce" />
            </motion.div>
          </div>

          <div className="relative border-l-2 border-gray-200 dark:border-gray-800 ml-4 md:ml-0">
            {content.experience.items.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="group md:pl-16 relative mb-24 last:mb-0"
              >
                {/* Timeline Dot */}
                <div className="absolute left-[-5px] md:left-[-9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-white dark:border-black group-hover:scale-150 transition-transform duration-300" />

                <div className="grid md:grid-cols-12 gap-8 md:gap-16">
                  <div className="md:col-span-4">
                     <span className="inline-block px-4 py-2 rounded-full bg-white dark:bg-white/10 border border-gray-200 dark:border-white/5 text-sm font-bold text-primary mb-4 shadow-sm">
                       {item.period}
                     </span>
                     <h3 className="text-3xl font-display font-bold leading-tight group-hover:text-primary transition-colors mb-2">{item.company}</h3>
                     <div className="text-lg text-gray-500 font-medium">{item.role}</div>
                     <div className="flex flex-wrap gap-2 mt-6">
                      {item.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-md bg-gray-100 dark:bg-white/5 text-xs text-gray-600 dark:text-gray-400 font-semibold uppercase tracking-wide">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-8">
                    <SpotlightCard className="p-8 md:p-10 bg-white dark:bg-[#0F0F0F]">
                      <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed font-light">
                        {item.description}
                      </p>
                      <div className="space-y-4">
                        {item.achievements.map((ach, i) => (
                          <div key={i} className="flex items-start gap-4 group/item">
                            <div className="min-w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 mt-1 group-hover/item:scale-110 transition-transform">
                              <Check size={14} />
                            </div>
                            <span className="text-gray-700 dark:text-gray-300">{ach}</span>
                          </div>
                        ))}
                      </div>
                    </SpotlightCard>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS BENTO GRID */}
      <section id="skills" className="py-32 px-4 relative">
         {/* Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-to-r from-primary/5 to-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-gray-200 dark:border-white/10 pb-12">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-5xl md:text-7xl font-display font-bold"
            >
              Professional <br/>
              <span className="text-primary italic font-serif">Arsenal</span>
            </motion.h2>
            <p className="text-gray-500 max-w-sm mt-6 md:mt-0 text-right text-lg">
              A curated stack of tools and methodologies I use to drive product success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-auto md:h-[650px]">
            {/* Management - Large Block */}
            <SpotlightCard className="md:col-span-2 md:row-span-2 p-10 flex flex-col justify-between">
              <div>
                 <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-primary mb-8">
                    <Target size={32} />
                 </div>
                 <h3 className="text-3xl font-bold mb-6">Management</h3>
                 <p className="text-gray-500 mb-8 max-w-sm">Expertise in leading cross-functional teams and delivering complex projects using modern methodologies.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {content.skills.categories[0].skills.map(skill => (
                  <span key={skill} className="px-5 py-2.5 bg-white dark:bg-white/5 rounded-xl text-lg font-medium border border-gray-100 dark:border-white/5 shadow-sm hover:border-primary/50 transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </SpotlightCard>

            {/* AI & Tech - Tall Block */}
            <SpotlightCard className="md:col-span-1 md:row-span-2 p-8 bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />
               <div className="relative z-10 h-full flex flex-col">
                  <Zap size={32} className="text-yellow-400 mb-8" />
                  <h3 className="text-2xl font-bold mb-6">Tech & AI</h3>
                  <div className="flex-1 flex flex-col justify-center space-y-4">
                     {content.skills.categories[1].skills.map(skill => (
                      <div key={skill} className="flex items-center justify-between border-b border-white/10 pb-3 hover:pl-2 transition-all cursor-default">
                        <span className="font-medium">{skill}</span>
                      </div>
                     ))}
                  </div>
               </div>
            </SpotlightCard>

            {/* Marketing - Wide Block */}
            <SpotlightCard className="md:col-span-1 md:row-span-1 p-8 flex flex-col justify-center bg-purple-500/5 border-purple-500/20">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                <Sparkles className="text-purple-500" /> Marketing
              </h3>
              <div className="flex flex-wrap gap-2">
                 {content.skills.categories[2].skills.map(skill => (
                  <span key={skill} className="text-xs px-2 py-1 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-300">
                    {skill}
                  </span>
                 ))}
              </div>
            </SpotlightCard>

             {/* Languages - Small Block */}
             <SpotlightCard className="md:col-span-1 md:row-span-1 p-8 flex flex-col justify-center bg-primary text-white">
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Globe size={24} /> Languages
              </h3>
              <p className="text-blue-100 font-medium">
                Russian (Native)<br/>
                Uzbek (C2)<br/>
                English (B2)
              </p>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION - REDESIGNED */}
      <section id="contact" className="py-20 md:py-32 relative overflow-hidden bg-[#050505] text-white">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150 mix-blend-overlay"></div>
        <motion.div 
           style={{ y: y2 }}
           className="absolute top-[-50%] left-[-20%] w-[1000px] h-[1000px] bg-primary/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen" 
        />
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 mb-24">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-bold text-primary mb-8 border border-white/10">
                   <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/> Available for Work
                </div>
                <h2 className="text-5xl md:text-8xl font-display font-bold mb-8 tracking-tighter leading-none">
                  Let's create <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">impact.</span>
                </h2>
                <p className="text-xl text-gray-400 max-w-lg leading-relaxed mb-12">
                  I'm currently looking for new opportunities in Product Management. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                </p>

                <div className="flex gap-4">
                  <MagneticButton href="https://t.me/+998881116612" className="flex items-center gap-3 px-8 py-4 bg-[#229ED9] text-white rounded-full font-bold hover:brightness-110 transition-all">
                    <Send size={20} /> Telegram
                  </MagneticButton>
                  <MagneticButton href="https://wa.me/998881116612" className="flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-full font-bold hover:brightness-110 transition-all">
                    <MessageCircle size={20} /> WhatsApp
                  </MagneticButton>
                </div>
              </motion.div>
            </div>

            <div className="flex flex-col gap-6 justify-center">
              <CopyButton text={content.contact.email} label="Email Address" />
              <CopyButton text={content.contact.phone} label="Phone Number" />
              
              <div className="grid grid-cols-2 gap-6 mt-4">
                 <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <Linkedin size={24} /> LinkedIn
                 </a>
                 <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <Github size={24} /> GitHub
                 </a>
              </div>
            </div>
          </div>
            
          <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm font-medium uppercase tracking-widest">
            <p>© 2025 Komil Sultonov.</p>
            <p>{content.contact.location}</p>
          </div>
        </div>
      </section>

      {/* Floating Action Button for Mobile */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="md:hidden fixed bottom-6 right-6 z-40"
      >
        <a href="#contact" className="flex items-center justify-center w-14 h-14 bg-primary text-white rounded-full shadow-lg border-2 border-white dark:border-black">
          <Mail size={24} />
        </a>
      </motion.div>
    </div>
  );
}