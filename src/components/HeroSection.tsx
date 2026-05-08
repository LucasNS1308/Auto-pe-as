import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      <div className="container relative z-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          {/* ── Text Split on Hover ── */}
          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              position: 'relative',
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontFamily: '"Bebas Neue", sans-serif',
              lineHeight: 1,
              height: '1.15em',
              width: '100%',
              marginBottom: '3rem',
              cursor: 'default',
              userSelect: 'none',
            }}
          >
            {/* Metade superior — sobe no hover */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: hovered ? '-52px' : '0',
                width: '100%',
                height: '52.5%',
                color: '#003087',
                overflow: 'hidden',
                zIndex: 3,
                textTransform: 'uppercase',
                fontWeight: 700,
                transition: 'top 0.5s ease-in-out',
              }}
            >
              RDF Importadora
            </div>

            {/* Metade inferior — desce no hover */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: hovered ? '36px' : '0',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(180deg, transparent 52.5%, #003087 52.5%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                zIndex: 1,
                textTransform: 'uppercase',
                fontWeight: 700,
                transition: 'top 0.5s ease-in-out',
              }}
            >
              RDF Importadora
            </div>

            {/* Subtítulo — só aparece no hover */}
            <div
              style={{
                position: 'absolute',
                top: '40%',
                left: 0,
                width: '100%',
                transform: 'translateY(-40%)',
                textAlign: 'left',
                zIndex: 2,
                fontSize: 'clamp(0.75rem, 1.5vw, 1rem)',
                color: '#CC2936',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                opacity: hovered ? 1 : 0,
                transition: 'opacity 0.35s ease-in-out',
                pointerEvents: 'none',
              }}
            >
              Importadora e Distribuidora de Peças Automotivas
            </div>
          </div>

          {/* Parágrafo descritivo */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mt-16 mb-10 font-light leading-relaxed">
            A RDF é a mais completa importadora e distribuidora de peças automotivas por atacado.
            Qualidade garantida, entrega ágil para todo o Brasil.
          </p>

          {/* Botões */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contato"
              className="group bg-gradient-amber text-white px-8 py-4 rounded-lg font-semibold text-base flex items-center justify-center gap-2 hover:opacity-90 transition-all animate-pulse-glow"
            >
              Solicitar Orçamento
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#produtos"
              className="border border-primary/40 text-primary px-8 py-4 rounded-lg font-semibold text-base hover:bg-primary/10 transition-all text-center"
            >
              Ver Catálogo
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
