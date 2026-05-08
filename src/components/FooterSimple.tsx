import { MapPin, Mail, Instagram, Youtube, Facebook, Linkedin, PhoneCall } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import logoRDF from '@/assets/logo-rdf.png';

const addresses = [
  {
    label: 'Matriz',
    text: 'São Paulo - SP, Brasil',
  },
];

const phones = [
  { number: '5511930000001', label: '(11) 3000-0001' },
];

const socials: { href: string; Icon: LucideIcon; label: string }[] = [
  { href: 'https://instagram.com/rdfimportadora', Icon: Instagram, label: 'Instagram' },
  { href: '#', Icon: Youtube, label: 'YouTube' },
  { href: '#', Icon: Facebook, label: 'Facebook' },
  { href: '#', Icon: Linkedin, label: 'LinkedIn' },
];

const FooterSimple = () => {
  return (
    <footer className="bg-card border-t-2 border-t-accent">
      <div className="container py-14">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4 flex flex-col gap-5">
            <img src={logoRDF} alt="RDF Importadora" className="h-12 w-auto" />
            <p className="text-muted-foreground text-sm leading-relaxed">
              A melhor e mais completa importadora e distribuidora de peças automotivas.
              Atendendo oficinas e revendas com qualidade e agilidade em todo o Brasil.
            </p>
            <div>
              <h4 className="font-display text-base text-foreground mb-3">Nossas redes sociais</h4>
              <div className="flex flex-wrap gap-3">
                {socials.map(({ href, Icon, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex items-center gap-2 h-9 px-3 rounded-lg bg-secondary hover:bg-primary/20 transition-colors group">
                    <Icon className="h-4 w-4 text-muted-foreground opacity-60 group-hover:opacity-100 group-hover:text-primary transition-all" />
                    <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-display text-lg text-foreground mb-4">Nosso Endereço</h4>
            <div className="space-y-4">
              {addresses.map((addr) => (
                <div key={addr.label} className="flex gap-3">
                  <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{addr.label}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{addr.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-display text-lg text-foreground mb-4">Entre em Contato</h4>
            <div className="space-y-3">
              {phones.map((p) => (
                <a key={p.label} href={`https://wa.me/${p.number}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                  <PhoneCall className="h-5 w-5 text-muted-foreground opacity-60 group-hover:opacity-100 group-hover:text-primary transition-all shrink-0" />
                  <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">{p.label}</span>
                </a>
              ))}
              <a href="mailto:contato@rdfimportadora.com.br" className="flex items-center gap-3 group">
                <Mail className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                  contato@rdfimportadora.com.br
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 text-center text-xs text-muted-foreground">
          Todos os direitos reservados a RDF Importadora ®
        </div>
      </div>
    </footer>
  );
};

export default FooterSimple;
