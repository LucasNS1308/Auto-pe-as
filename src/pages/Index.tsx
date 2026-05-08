import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import TechSection from '@/components/TechSection';
import ProductsSection from '@/components/ProductsSection';
import BrandsCarousel from '@/components/BrandsCarousel';
import FlipCards from '@/components/FlipCards';
import InteractiveCards from '@/components/InteractiveCards';
import Footer from '@/components/Footer';
import CTAButton from '@/components/CTAButton';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <AboutSection />
      <TechSection />
      <div className="flex justify-center py-8">
        <CTAButton />
      </div>
      <ProductsSection />
      <BrandsCarousel />
      <FlipCards />
      <InteractiveCards />
      <Footer />
    </div>
  );
};

export default Index;
