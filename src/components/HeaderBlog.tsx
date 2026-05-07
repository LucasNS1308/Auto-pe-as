import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Info, Package, Phone, Settings } from 'lucide-react';

const SCROLL_THRESHOLD_PX = 80;

const navLinks = [
  { href: '/', Icon: Home, label: 'Home' },
  { href: '/#sobre', Icon: Info, label: 'Sobre' },
  { href: '/#produtos', Icon: Package, label: 'Produtos' },
  { href: '/#contato', Icon: Phone, label: 'Contato' },
];

const Logo = () => (
  <div className="flex items-center gap-2">
    <Settings className="h-6 w-6 text-primary" />
    <span className="font-semibold text-foreground text-sm">AutoPeças Brasil</span>
  </div>
);

const HeaderBlog = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD_PX);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-md' : 'bg-transparent'}`}>
        <div className="container flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <ArrowLeft className="h-5 w-5 text-foreground opacity-60 group-hover:opacity-100 transition-opacity" />
            <Logo />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg group hover:bg-primary/10 transition-colors">
                <link.Icon className="h-5 w-5 text-primary opacity-70 group-hover:opacity-100 transition-opacity" />
                <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors font-medium">{link.label}</span>
              </a>
            ))}
          </nav>

          <button
            className="md:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10 rounded-lg hover:bg-primary/10 transition-colors"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Abrir menu"
          >
            <span className={`block h-0.5 w-6 bg-foreground rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 w-6 bg-foreground rounded transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-6 bg-foreground rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div key="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden" onClick={closeMenu} />
            <motion.nav key="drawer" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-card border-l border-border flex flex-col pt-20 pb-8 px-6 md:hidden">
              <Link to="/" className="flex items-center gap-2 mb-8" onClick={closeMenu}>
                <ArrowLeft className="h-5 w-5 text-foreground" />
                <Logo />
              </Link>
              <div className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.a key={link.label} href={link.href} onClick={closeMenu} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-primary/10 transition-colors group">
                    <link.Icon className="h-6 w-6 text-primary opacity-70 group-hover:opacity-100 transition-opacity" />
                    <span className="text-base text-foreground group-hover:text-primary transition-colors font-medium">{link.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default HeaderBlog;
