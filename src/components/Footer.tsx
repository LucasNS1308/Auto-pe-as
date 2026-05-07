import { MapPin, Mail, Instagram, Youtube, Facebook, Linkedin, PhoneCall, Settings } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const addresses = [
  {
    label: 'Matriz São Paulo',
    text: 'Av. Paulista, 1000 - Bela Vista, São Paulo - SP',
  },
  {
    label: 'Filial Minas Gerais',
    text: 'R. dos Carijós, 200 - Centro, Belo Horizonte - MG',
  },
  {
    label: 'Filial Paraná',
    text: 'Av. Sete de Setembro, 500 - Centro, Curitiba - PR',
  },
];

const phones = [
  { number: '5511930000001', label: '(11) 3000-0001 — Matriz São Paulo' },
  { number: '5531930000002', label: '(31) 3000-0002 — Filial Belo Horizonte' },
  { number: '5541930000003', label: '(41) 3000-0003 — Filial Curitiba' },
];

const socials: { href: string; Icon: LucideIcon; label: string }[] = [
  { href: '#', Icon: Instagram, label: 'Instagram' },
  { href: '#', Icon: Youtube, label: 'YouTube' },
  { href: '#', Icon: Facebook, label: 'Facebook' },
  { href: '#', Icon: Linkedin, label: 'LinkedIn' },
];

const Logo = () => (
  <div className="flex items-center gap-2">
    <Settings className="h-6 w-6 text-primary" />
    <span className="font-semibold text-foreground">AutoPeças Brasil</span>
  </div>
);

const Footer = () => {
  return (
    <footer className="bg-card border-t-2 border-t-accent" id="contato">
      {/* Placeholder do mapa */}
      <div className="w-full h-[220px] bg-muted/20 flex flex-col items-center justify-center gap-3 border-b border-border">
        <MapPin className="h-8 w-8 text-muted-foreground/40" />
        <p className="text-sm text-muted-foreground">Av. Paulista, 1000 — Bela Vista, São Paulo - SP</p>
      </div>

      <div className="container py-14">
        <div className="grid md:grid-cols-12 gap-10">
          {/* Logo + descrição + redes sociais */}
          <div className="md:col-span-4 flex flex-col gap-5">
            <Logo />
            <p className="text-muted-foreground text-sm leading-relaxed">
              Distribuidor Autorizado das Maiores Marcas do Setor Automotivo. Compromisso com a
              qualidade e a excelência no atendimento.
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

          {/* Endereços */}
          <div className="md:col-span-4">
            <h4 className="font-display text-lg text-foreground mb-4">Nossos Endereços</h4>
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

          {/* Contato */}
          <div className="md:col-span-4">
            <h4 className="font-display text-lg text-foreground mb-4">Entre em Contato</h4>
            <div className="space-y-3">
              {phones.map((p) => (
                <a key={p.label} href={`https://wa.me/${p.number}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                  <PhoneCall className="h-5 w-5 text-muted-foreground opacity-60 group-hover:opacity-100 group-hover:text-primary transition-all shrink-0" />
                  <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">{p.label}</span>
                </a>
              ))}
              <a href="mailto:contato@autopecasbrasil.com.br" className="flex items-center gap-3 group">
                <Mail className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                  contato@autopecasbrasil.com.br
                </span>
              </a>
            </div>
            <div className="mt-6">
              <h4 className="font-display text-base text-foreground mb-2">Certificações</h4>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p>Certificação ISO 9001</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 text-center text-xs text-muted-foreground">
          Todos os direitos reservados a AutoPeças Brasil ®
        </div>
      </div>
    </footer>
  );
};

export default Footer;
