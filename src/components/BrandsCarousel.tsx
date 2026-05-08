import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const brands = [
  'Bosch', 'NGK', 'Monroe', 'Mahle', 'Gates', 'Cofap', 'Fras-le',
  'Nakata', 'Motul', 'Wurth', 'Dayco', 'SKF', 'Valeo', 'Delphi',
  'Denso', 'TRW', 'Sachs',
];

const BrandsCarousel = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const rafRef = useRef(0);
  const speed = 0.3;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const half = track.scrollWidth / 2;

    const animate = () => {
      offsetRef.current += speed;
      if (offsetRef.current >= half) offsetRef.current = 0;
      track.style.transform = `translateX(-${offsetRef.current}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const loopedBrands = [...brands, ...brands];

  return (
    <section className="py-20 bg-secondary/30 overflow-hidden" id="marcas">
      <div className="container mb-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-display mb-2">
            Marcas e <span className="text-gradient-rdf">Parceiros</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Distribuidor autorizado das maiores marcas do setor automotivo
          </p>
        </motion.div>
      </div>

      <div className="relative">
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex items-center gap-10 w-max py-4"
            style={{ willChange: 'transform' }}
          >
            {loopedBrands.map((brand, i) => (
              <div
                key={`${brand}-${i}`}
                className="flex-shrink-0 w-36 h-20 flex items-center justify-center bg-card border border-border rounded-xl px-4 hover:border-primary/30 transition-colors group"
              >
                <span className="text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors tracking-wide text-center">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandsCarousel;
