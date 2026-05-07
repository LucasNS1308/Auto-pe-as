import HeaderBlog from '@/components/HeaderBlog';
import BlogSection from '@/components/BlogSection';
import FooterSimple from '@/components/FooterSimple';

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeaderBlog />
      <div className="pt-20">
        <BlogSection />
      </div>
      <FooterSimple />
    </div>
  );
};

export default Blog;
