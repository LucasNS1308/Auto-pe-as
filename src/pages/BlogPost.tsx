import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import HeaderBlog from '@/components/HeaderBlog';
import FooterSimple from '@/components/FooterSimple';
import { API_URL } from '@/lib/api';
import { useState, useEffect } from 'react';

interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  coverImage: string | null;
  contentImage1: string | null;
  contentImage2: string | null;
  createdAt: string;
}

const categoryColors: Record<string, string> = {
  EVENTO: 'bg-purple-100 text-purple-700',
  TREINAMENTO: 'bg-blue-100 text-blue-700',
  NOVIDADE: 'bg-green-100 text-green-700',
  ATIVIDADE: 'bg-orange-100 text-orange-700',
};

const categoryLabels: Record<string, string> = {
  EVENTO: 'Evento',
  TREINAMENTO: 'Treinamento',
  NOVIDADE: 'Novidade',
  ATIVIDADE: 'Atividade',
};

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/posts/${id}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setPost)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' });

  const getReadingTime = (content: string) => {
    const words = content.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length;
    return `${Math.ceil(words / 200)} min de leitura`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <HeaderBlog />
        <div className="pt-32 pb-16 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
        <FooterSimple />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background">
        <HeaderBlog />
        <div className="pt-32 pb-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl font-display text-primary mb-4">404</h1>
            <p className="text-muted-foreground mb-6">Post não encontrado.</p>
            <Link to="/blog" className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg">
              <ArrowLeft className="h-4 w-4" /> Voltar para o blog
            </Link>
          </div>
        </div>
        <FooterSimple />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <HeaderBlog />
      <div className="w-full bg-gradient-to-b from-secondary to-background pt-20">
        <div className="h-[160px] md:h-[220px] flex flex-col items-center justify-center gap-2 px-4">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary tracking-wide text-center">
            Blog AutoPeças Brasil
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground text-center max-w-md">
            Dicas, novidades e conteúdo especializado em autopeças
          </p>
        </div>
      </div>

      <article className="mt-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full px-4 sm:w-[95%] sm:px-0 md:w-[80%] mx-auto"
        >
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[post.category] || 'bg-gray-100 text-gray-700'}`}>
              {categoryLabels[post.category] || post.category}
            </span>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{formatDate(post.createdAt)}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{getReadingTime(post.content)}</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-display text-foreground mb-8 leading-tight">
            {post.title}
          </h1>

          <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.content }} />

          {(post.contentImage1 || post.contentImage2) && (
            <div className="mt-10 flex flex-col gap-6">
              {post.contentImage1 && <img src={post.contentImage1} alt="" className="w-full h-auto object-cover rounded-xl" />}
              {post.contentImage2 && <img src={post.contentImage2} alt="" className="w-full h-auto object-cover rounded-xl" />}
            </div>
          )}

          <div className="mt-16 pt-8 border-t border-border">
            <Link to="/blog" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Voltar para o blog
            </Link>
          </div>
        </motion.div>
      </article>

      <FooterSimple />
    </div>
  );
};

export default BlogPost;
