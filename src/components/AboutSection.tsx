import { motion } from 'framer-motion';
import { Building2, ShieldCheck, Users, Truck } from 'lucide-react';

const stats = [
  { icon: Building2, value: '+15', label: 'Anos de Mercado' },
  { icon: ShieldCheck, value: '100%', label: 'Peças com Garantia' },
  { icon: Users, value: '+5.000', label: 'Clientes Ativos' },
  { icon: Truck, value: '48h', label: 'Entrega Express' },
];

const AboutSection = () => {
  return (
    <section className="py-32 bg-secondary/50" id="sobre">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-display mb-3">
            Conheça a <span className="text-gradient-rdf">RDF Importadora</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Referência em importação e distribuição de peças automotivas por atacado, atendendo
            oficinas e revendas com qualidade e agilidade em todo o Brasil.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border border-border rounded-xl p-6 text-center shadow-sm"
            >
              <stat.icon className="h-7 w-7 text-primary mx-auto mb-3" />
              <p className="text-3xl font-display text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
