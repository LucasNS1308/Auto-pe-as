import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Wrench } from 'lucide-react';

const cards = [
  {
    icon: ShieldCheck,
    title: 'Peças Importadas com Garantia',
    text: 'Trabalhamos com fabricantes homologados internacionalmente. Cada peça tem procedência garantida e suporte pós-venda.',
  },
  {
    icon: Zap,
    title: 'Distribuição por Atacado',
    text: 'Condições especiais para oficinas, revendas e frotas. Quanto mais você compra, mais você economiza.',
  },
  {
    icon: Wrench,
    title: 'Suporte Técnico Especializado',
    text: 'Nossa equipe identifica a peça exata para cada modelo e aplicação, evitando erros de compatibilidade.',
  },
];

const InteractiveCards = () => {
  return (
    <section className="py-24 bg-secondary/30" id="servicos">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-display text-foreground mb-3">
            Por que escolher a{' '}
            <span className="text-gradient-rdf">RDF Importadora?</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group bg-gradient-card border border-border rounded-xl p-8 hover:border-primary/30 transition-colors"
            >
              <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <card.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-2xl font-display text-foreground mb-3">{card.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InteractiveCards;
