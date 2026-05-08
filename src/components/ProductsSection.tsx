import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import imgFreios from '@/assets/categorias/freios.jpg';
import imgSuspensao from '@/assets/categorias/suspensao.jpg';
import imgMotor from '@/assets/categorias/motor.jpg';
import imgEletrica from '@/assets/categorias/eletrica.jpg';
import imgFunilaria from '@/assets/categorias/funilaria.jpg';
import imgTransmissao from '@/assets/categorias/transmissao.jpg';
import imgPneus from '@/assets/categorias/pneus.jpg';
import imgAcessorios from '@/assets/categorias/acessorios.jpg';

interface Product {
  name: string;
  desc: string;
  ca: string;
  ref: string;
  images: string[];
}

const CARD_GAP_PX = 20;
const FALLBACK_CARD_STEP_PX = 200;
const SCROLL_TO_SECTION_DELAY_MS = 50;
const SKELETON_DURATION_MS = 600;

const categories = [
  { id: 'freios', label: 'Freios' },
  { id: 'suspensao', label: 'Suspensão' },
  { id: 'motor', label: 'Motor e Filtros' },
  { id: 'eletrica', label: 'Elétrica' },
  { id: 'transmissao', label: 'Transmissão' },
  { id: 'funilaria', label: 'Funilaria' },
  { id: 'pneus', label: 'Pneus e Rodas' },
  { id: 'acessorios', label: 'Acessórios' },
];

const categoryImages: Record<string, string> = {
  freios: imgFreios,
  suspensao: imgSuspensao,
  motor: imgMotor,
  eletrica: imgEletrica,
  funilaria: imgFunilaria,
  transmissao: imgTransmissao,
  pneus: imgPneus,
  acessorios: imgAcessorios,
};

const products: Record<string, Product[]> = {
  freios: [
    { name: 'Pastilha de Freio Dianteira', desc: 'Pastilha de alta performance para frenagem eficiente em diversas condições.', ca: 'Ref: PF-0021', ref: 'Bosch / Fras-le', images: [] },
    { name: 'Disco de Freio Ventilado', desc: 'Disco ventilado para máxima dissipação de calor e maior durabilidade.', ca: 'Ref: DF-1430', ref: 'TRW / Brembo', images: [] },
    { name: 'Fluido de Freio DOT 4', desc: 'Fluido de freio de alta temperatura para sistemas hidráulicos modernos.', ca: 'Ref: FF-DOT4', ref: 'Motul / Bosch', images: [] },
    { name: 'Tambor de Freio Traseiro', desc: 'Tambor original para reposição em veículos populares nacionais.', ca: 'Ref: TF-2240', ref: 'Cofap / Nakata', images: [] },
    { name: 'Cabo de Freio de Mão', desc: 'Cabo de aço revestido para freio estacionário com alta resistência.', ca: 'Ref: CF-0890', ref: 'Cofap', images: [] },
    { name: 'Kit Lona de Freio', desc: 'Kit completo com lonas e hardware para manutenção preventiva eficiente.', ca: 'Ref: KL-3310', ref: 'Fras-le', images: [] },
  ],
  suspensao: [
    { name: 'Amortecedor Dianteiro', desc: 'Amortecedor a gás para conforto e estabilidade em pista.', ca: 'Ref: AD-5510', ref: 'Monroe / Cofap', images: [] },
    { name: 'Mola de Suspensão Traseira', desc: 'Mola helicoidal com espessura calibrada para cada aplicação.', ca: 'Ref: MS-2200', ref: 'Monroe', images: [] },
    { name: 'Pivô de Suspensão', desc: 'Pivô superior para direção e suspensão com bucha integrada.', ca: 'Ref: PV-1120', ref: 'Nakata', images: [] },
    { name: 'Bucha de Bandeja', desc: 'Bucha de borracha para bandeja inferior de suspensão dianteira.', ca: 'Ref: BB-0330', ref: 'Nakata / SKF', images: [] },
    { name: 'Barra Estabilizadora', desc: 'Barra de torção para reduzir a inclinação lateral em curvas.', ca: 'Ref: BE-7710', ref: 'Monroe', images: [] },
    { name: 'Kit Batente Coifa', desc: 'Kit com batente e coifa para amortecedor dianteiro.', ca: 'Ref: KC-0440', ref: 'Monroe / Sachs', images: [] },
  ],
  motor: [
    { name: 'Filtro de Óleo', desc: 'Filtro com alta capacidade de retenção de impurezas para motores modernos.', ca: 'Ref: FO-0110', ref: 'Bosch / Mahle', images: [] },
    { name: 'Filtro de Ar', desc: 'Filtro em papel especial para motores 1.0 a 2.0 com alta filtragem.', ca: 'Ref: FA-0220', ref: 'Mahle / Bosch', images: [] },
    { name: 'Correia Dentada', desc: 'Correia dentada reforçada com tensores para motor a combustão.', ca: 'Ref: CD-3310', ref: 'Gates / Dayco', images: [] },
    { name: 'Vela de Ignição', desc: 'Vela com eletrodo de irídio para máxima eficiência de combustão.', ca: 'Ref: VI-0440', ref: 'NGK / Denso', images: [] },
    { name: 'Junta do Cabeçote', desc: 'Junta de vedação multicamada de aço para cabeçote.', ca: 'Ref: JC-5500', ref: 'Mahle', images: [] },
    { name: 'Filtro de Combustível', desc: 'Filtro com elemento filtrante de alta eficiência para injeção eletrônica.', ca: 'Ref: FC-0660', ref: 'Bosch / Mann', images: [] },
  ],
  eletrica: [
    { name: 'Bateria 60Ah', desc: 'Bateria selada de 60Ah para veículos leves e utilitários nacionais.', ca: 'Ref: BT-6000', ref: 'Bosch / Moura', images: [] },
    { name: 'Alternador 90A', desc: 'Alternador recondicionado com garantia de 12 meses inclusa.', ca: 'Ref: AL-9010', ref: 'Bosch / Valeo', images: [] },
    { name: 'Sensor de Oxigênio', desc: 'Sonda lambda universal para controle preciso da injeção eletrônica.', ca: 'Ref: SO-0330', ref: 'Bosch / Denso', images: [] },
    { name: 'Motor de Partida', desc: 'Motor de arranque para veículos populares com encaixe original.', ca: 'Ref: MP-1120', ref: 'Valeo / Bosch', images: [] },
    { name: 'Módulo de Ignição', desc: 'Módulo eletrônico com proteção contra sobretensão e curto-circuito.', ca: 'Ref: MI-4400', ref: 'Bosch / Delphi', images: [] },
    { name: 'Sensor MAP', desc: 'Sensor de pressão absoluta do coletor para injeção eletrônica.', ca: 'Ref: SM-0770', ref: 'Delphi / Bosch', images: [] },
  ],
  transmissao: [
    { name: 'Kit de Embreagem', desc: 'Kit completo com disco, platô e rolamento de liberação.', ca: 'Ref: KE-1100', ref: 'Sachs / Valeo', images: [] },
    { name: 'Semi-eixo Dianteiro', desc: 'Semi-eixo com junta homocinética para tração dianteira.', ca: 'Ref: SE-2200', ref: 'Nakata / GKN', images: [] },
    { name: 'Junta Homocinética', desc: 'Junta tripode para transmissão de torque sem oscilações.', ca: 'Ref: JH-3310', ref: 'Nakata', images: [] },
    { name: 'Fluido ATF para Câmbio', desc: 'Fluido sintético ATF para câmbios automáticos e transmissões CVT.', ca: 'Ref: FC-ATF', ref: 'Motul / Shell', images: [] },
    { name: 'Retentor de Câmbio', desc: 'Retentor de vedação para eixo de câmbio manual com selagem perfeita.', ca: 'Ref: RC-0440', ref: 'SKF / Corteco', images: [] },
    { name: 'Coxim do Câmbio', desc: 'Suporte com amortecimento de vibração para câmbio manual.', ca: 'Ref: SC-5500', ref: 'Cofap', images: [] },
  ],
  funilaria: [
    { name: 'Para-choque Dianteiro', desc: 'Para-choque em polipropileno com suporte de fixação incluso.', ca: 'Ref: PD-0110', ref: 'OEM / Genérico', images: [] },
    { name: 'Farol Dianteiro', desc: 'Farol com lente de policarbonato e refletor cromado de alta refletância.', ca: 'Ref: FD-2200', ref: 'Arteb / Hella', images: [] },
    { name: 'Lanterna Traseira', desc: 'Lanterna LED compatível com modelos nacionais populares.', ca: 'Ref: LT-3310', ref: 'Arteb', images: [] },
    { name: 'Grade Dianteira', desc: 'Grade em ABS de alta resistência para reposição original.', ca: 'Ref: GD-4400', ref: 'OEM / Genérico', images: [] },
    { name: 'Retrovisor Elétrico', desc: 'Retrovisor com ajuste elétrico e desembaçador integrado.', ca: 'Ref: RE-5510', ref: 'Metagal / OEM', images: [] },
    { name: 'Spoiler Traseiro', desc: 'Spoiler em ABS de aplicação universal com fita dupla face.', ca: 'Ref: ST-6600', ref: 'Genérico', images: [] },
  ],
  pneus: [
    { name: 'Pneu 195/65 R15', desc: 'Pneu para compactos com excelente durabilidade e aderência no molhado.', ca: 'Ref: PN-1965', ref: 'Pirelli / Bridgestone', images: [] },
    { name: 'Pneu 205/55 R16', desc: 'Pneu de alta performance para sedãs e hatches esportivos nacionais.', ca: 'Ref: PN-2055', ref: 'Michelin / Continental', images: [] },
    { name: 'Roda de Liga Aro 15', desc: 'Roda em liga de alumínio com acabamento diamantado e pintura.', ca: 'Ref: RL-1500', ref: 'Aro / Enkei', images: [] },
    { name: 'Válvula para Pneu', desc: 'Válvula metálica de enchimento com tampa protetora inclusa.', ca: 'Ref: VP-0010', ref: 'Schrader', images: [] },
    { name: 'Massas de Balanceamento', desc: 'Kit de massas adesivas para rodas de liga leve.', ca: 'Ref: BK-0020', ref: 'Universal', images: [] },
    { name: 'Calotas Aro 14', desc: 'Calota em ABS com fixação por clipes para rodas de aço.', ca: 'Ref: CA-1400', ref: 'Calota Brasil', images: [] },
  ],
  acessorios: [
    { name: 'Tapete Automotivo', desc: 'Jogo de tapetes em borracha antiderrapante — 4 peças inclusas.', ca: 'Ref: TA-0010', ref: 'Beek / Universal', images: [] },
    { name: 'Película Insulfilm 20%', desc: 'Película de controle solar com proteção UV e privacidade total.', ca: 'Ref: PI-2000', ref: 'Insulfilm / 3M', images: [] },
    { name: 'Alarme com Sensor', desc: 'Alarme com sensor de presença e acionamento por controle RF.', ca: 'Ref: AL-0030', ref: 'Positron / Taramps', images: [] },
    { name: 'Suporte para Celular', desc: 'Suporte magnético para dashboard com fixação por ventosa dupla.', ca: 'Ref: SC-0040', ref: 'Universal', images: [] },
    { name: 'Capa para Banco', desc: 'Capa impermeável em neoprene para banco dianteiro — universal.', ca: 'Ref: CB-0050', ref: 'Universal', images: [] },
    { name: 'Extintor Veicular 1kg', desc: 'Extintor ABC de 1kg para uso veicular com suporte de fixação.', ca: 'Ref: EV-1000', ref: 'Kidde / Universal', images: [] },
  ],
};

const SkeletonCard = () => (
  <div className="bg-card border border-border rounded-xl p-5 flex flex-col gap-3 animate-pulse">
    <div className="w-full h-36 rounded-lg bg-muted" />
    <div className="h-4 w-2/3 rounded bg-muted" />
    <div className="h-3 w-full rounded bg-muted" />
    <div className="h-3 w-1/2 rounded bg-muted" />
  </div>
);

const ProductsSection = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Product[]>([]);
  const productsSectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateScrollState = () => {
    const el = carouselRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 0);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 1);
  };

  useEffect(() => { updateScrollState(); }, []);

  const getCardStep = () => {
    const el = carouselRef.current;
    if (!el) return FALLBACK_CARD_STEP_PX;
    const card = el.firstElementChild as HTMLElement | null;
    return card ? card.offsetWidth + CARD_GAP_PX : FALLBACK_CARD_STEP_PX;
  };

  const scrollCarouselLeft = () => carouselRef.current?.scrollBy({ left: -getCardStep(), behavior: 'smooth' });
  const scrollCarouselRight = () => carouselRef.current?.scrollBy({ left: getCardStep(), behavior: 'smooth' });

  const handleCategoryClick = (id: string) => {
    setActiveCategory(id);
    setLoading(true);
    setItems([]);
    setTimeout(() => {
      productsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, SCROLL_TO_SECTION_DELAY_MS);
    setTimeout(() => {
      setItems(products[id] ?? []);
      setLoading(false);
    }, SKELETON_DURATION_MS);
  };

  const handleClose = () => {
    setActiveCategory(null);
    setItems([]);
  };

  return (
    <section className="py-24 bg-background" id="produtos">
      <div className="container mb-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-4xl md:text-6xl font-display text-gradient-rdf mb-2">
            Nossos Produtos
          </h2>
          <p className="text-muted-foreground text-lg">
            Clique em uma categoria para ver os produtos disponíveis
          </p>
        </motion.div>
      </div>

      {/* Carrossel de categorias */}
      <div className="flex items-center justify-center gap-3 px-4">
        <button
          onClick={scrollCarouselLeft}
          disabled={atStart}
          className="flex-shrink-0 w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div
          ref={carouselRef}
          onScroll={updateScrollState}
          className="w-[80%] sm:w-[75%] overflow-x-hidden flex gap-5"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`group flex-shrink-0 w-full sm:w-[calc(50%_-_10px)] lg:w-[calc(20%_-_16px)] rounded-xl overflow-hidden border transition-all duration-300 cursor-pointer ${
                activeCategory === cat.id ? 'border-primary shadow-amber-glow' : 'border-border hover:border-primary/40'
              }`}
            >
              <div className="relative h-36 overflow-hidden">
                <img
                  src={categoryImages[cat.id]}
                  alt={cat.label}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {activeCategory === cat.id && <div className="absolute inset-0 bg-primary/20" />}
              </div>
              <div className="bg-card px-3 py-3">
                <span className={`text-sm font-medium leading-tight line-clamp-2 transition-colors ${activeCategory === cat.id ? 'text-primary' : 'text-foreground group-hover:text-primary'}`}>
                  {cat.label}
                </span>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={scrollCarouselRight}
          disabled={atEnd}
          className="flex-shrink-0 w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Grid de produtos */}
      <AnimatePresence>
        {activeCategory && (
          <motion.div
            ref={productsSectionRef}
            key="products"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="container mt-10">
              <div className="flex items-center justify-between mb-6">
                <motion.h3 initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-2xl md:text-3xl font-display text-foreground">
                  {categories.find((c) => c.id === activeCategory)?.label}
                </motion.h3>
                <button
                  onClick={handleClose}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors border border-border rounded-lg px-3 py-2 hover:border-primary/40"
                >
                  <X className="h-4 w-4" /> Fechar
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pb-10">
                {loading
                  ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
                  : items.map((product, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="bg-card border border-border rounded-xl p-5 flex flex-col gap-3 hover:border-primary/30 transition-colors"
                      >
                        <div className="w-full h-36 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                          {product.images.length > 0 ? (
                            <img src={product.images[0]} alt={product.name} loading="lazy" decoding="async" className="w-full h-full object-contain p-2" />
                          ) : (
                            <span className="text-xs text-muted-foreground">Sem imagem</span>
                          )}
                        </div>
                        {product.name && <h4 className="text-base font-display text-foreground leading-tight">{product.name}</h4>}
                        {product.desc && <p className="text-xs text-muted-foreground leading-relaxed">{product.desc}</p>}
                        {product.ca && <p className="text-xs text-primary font-medium">{product.ca}</p>}
                        {product.ref && <p className="text-xs text-muted-foreground">{product.ref}</p>}
                      </motion.div>
                    ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProductsSection;
