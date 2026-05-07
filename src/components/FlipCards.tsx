import { motion } from 'framer-motion';
import { Circle, Layers, Settings, Zap, Square, GitBranch, RotateCcw, Star } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const cards: { Icon: LucideIcon; title: string; desc: string }[] = [
  {
    Icon: Circle,
    title: 'Freios',
    desc: 'Pastilhas, discos, tambores e fluidos de freio das melhores marcas para máxima segurança.',
  },
  {
    Icon: Layers,
    title: 'Suspensão',
    desc: 'Amortecedores, molas, pivôs e buchas para conforto e estabilidade em qualquer terreno.',
  },
  {
    Icon: Settings,
    title: 'Motor',
    desc: 'Filtros, correias, velas, juntas e kits completos para manter o motor sempre em dia.',
  },
  {
    Icon: Zap,
    title: 'Elétrica',
    desc: 'Baterias, alternadores, sensores e módulos eletrônicos com compatibilidade garantida.',
  },
  {
    Icon: Square,
    title: 'Funilaria',
    desc: 'Para-choques, faróis, lanternas e peças de carroceria para reposição rápida.',
  },
  {
    Icon: GitBranch,
    title: 'Transmissão',
    desc: 'Embreagens, câmbios, semi-eixos e kits de transmissão para todas as aplicações.',
  },
  {
    Icon: RotateCcw,
    title: 'Pneus',
    desc: 'Linha completa de pneus para passeio, utilitários e pesados com as marcas mais confiáveis.',
  },
  {
    Icon: Star,
    title: 'Acessórios',
    desc: 'Tapetes, películas, alarmes e itens de personalização para deixar o veículo completo.',
  },
];

const FlipCards = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-6xl font-display mb-3">
            Categorias que fazem a <span className="text-gradient-amber">diferença</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Passe o mouse para conhecer cada categoria
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="group relative h-[300px] rounded-xl overflow-hidden border border-border
                         hover:border-primary/40 transition-colors cursor-pointer"
            >
              {/* FRENTE: Ícone centralizado */}
              <div
                className="absolute inset-0 flex items-center justify-center
                           bg-gradient-card
                           transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
                           group-hover:-translate-y-[30%]"
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-5">
                  <span className="text-[8rem] font-display text-primary leading-none">
                    {card.title[0]}
                  </span>
                </div>
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-950 to-slate-900">
                  <card.Icon className="h-16 w-16 text-orange-400 opacity-60" />
                </div>
              </div>

              {/* VERSO: Slide de baixo para cima */}
              <div
                className="absolute bottom-0 left-0 right-0
                           bg-gradient-to-b from-background/95 to-card
                           border-t border-primary/20
                           backdrop-blur-sm
                           flex flex-col items-center justify-center text-center
                           px-5 py-6 gap-3
                           translate-y-full
                           transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
                           group-hover:translate-y-0
                           h-[100%]"
              >
                <span className="block w-8 h-0.5 bg-gradient-amber rounded-full mb-1" />
                <h4 className="text-2xl font-display text-foreground leading-tight">{card.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlipCards;
