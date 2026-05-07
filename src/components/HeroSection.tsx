import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Fundo gradiente azul escuro */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" />
      {/* Padrão de grade sutil */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

      <div className="container relative z-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display leading-[0.9] mb-6">
            A peça certa. <span className="text-gradient-amber">Na hora certa.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 font-light leading-relaxed">
            Distribuição de autopeças com qualidade garantida, atendimento especializado e entrega
            ágil para todo o Brasil.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contato"
              className="group bg-gradient-amber text-primary-foreground px-8 py-4 rounded-lg font-semibold text-base flex items-center justify-center gap-2 hover:opacity-90 transition-all animate-pulse-glow"
            >
              Solicitar Orçamento
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#produtos"
              className="border border-accent/40 text-foreground px-8 py-4 rounded-lg font-semibold text-base hover:bg-accent hover:text-accent-foreground transition-all text-center"
            >
              Ver Catálogo
            </a>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
