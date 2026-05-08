import { motion } from 'framer-motion';
import { MapPin, BarChart3, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: MapPin,
    title: 'Entrega para Todo o Brasil',
    text: 'Rastreamento em tempo real do pedido, do estoque até a porta da sua oficina.',
  },
  {
    icon: BarChart3,
    title: 'Compra por Atacado',
    text: 'Tabelas progressivas de desconto para distribuidores, revendas e frotas.',
  },
  {
    icon: ShieldCheck,
    title: 'Peças Importadas Certificadas',
    text: 'Fornecedores homologados internacionalmente. Qualidade e procedência em cada item.',
  },
];

const TechSection = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden" id="tecnologia">
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-display mb-4">
            Muito além de uma venda.
            <br />
            <span className="text-gradient-rdf">Uma parceria de confiança.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="flex gap-4"
            >
              <div className="h-12 w-12 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
                <feat.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-display text-foreground mb-1">{feat.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feat.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechSection;
