import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WHATSAPP_CONTACTS = [
  {
    label: 'Matriz — São Paulo',
    phone: '(11) 3000-0001',
    href: 'https://wa.me/5511930000001',
  },
  {
    label: 'Filial — Belo Horizonte',
    phone: '(31) 3000-0002',
    href: 'https://wa.me/5531930000002',
  },
  {
    label: 'Filial — Curitiba',
    phone: '(41) 3000-0003',
    href: 'https://wa.me/5541930000003',
  },
];

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 fill-green-500">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const CTAButton = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        onClick={() => setMenuOpen((prev) => !prev)}
        className="bg-primary border-2 border-orange-400 text-black font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 transition-all duration-200"
      >
        Fale com um especialista
      </button>

      {/* Menu desktop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="desktop-menu"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className="hidden sm:block absolute left-1/2 -translate-x-1/2 w-72 bg-card border border-border rounded-xl p-3 shadow-xl z-50"
            style={{ bottom: 'calc(100% + 12px)' }}
          >
            {WHATSAPP_CONTACTS.map((contact) => (
              <a key={contact.href} href={contact.href} target="_blank" rel="noopener noreferrer" onClick={closeMenu} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted/50 transition-colors">
                <WhatsAppIcon />
                <div>
                  <p className="text-sm font-medium text-foreground">{contact.label}</p>
                  <p className="text-xs text-muted-foreground">{contact.phone}</p>
                </div>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="sm:hidden fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={closeMenu}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.18 }}
              className="w-[calc(100%-2rem)] max-w-sm bg-card border border-border rounded-xl p-3 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="px-3 pt-2 pb-1 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Escolha uma unidade
              </p>
              {WHATSAPP_CONTACTS.map((contact) => (
                <a key={contact.href} href={contact.href} target="_blank" rel="noopener noreferrer" onClick={closeMenu} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted/50 transition-colors">
                  <WhatsAppIcon />
                  <div>
                    <p className="text-sm font-medium text-foreground">{contact.label}</p>
                    <p className="text-xs text-muted-foreground">{contact.phone}</p>
                  </div>
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CTAButton;
