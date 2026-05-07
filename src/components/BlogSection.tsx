import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { API_URL } from '@/lib/api';

interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  imageUrl: string | null;
  videoUrl: string | null;
  coverImage: string | null;
  contentImage1: string | null;
  contentImage2: string | null;
  createdAt: string;
  updatedAt: string;
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

const BlogSection = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/posts?page=${currentPage}&limit=9`);
        if (!res.ok) throw new Error('Erro ao carregar posts');
        const data = await res.json();
        setPosts(data.data || []);
        setTotalPages(data.meta?.totalPages || 1);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [currentPage]);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' });

  const getContentExcerpt = (content: string, maxLength = 150) => {
    const plain = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    if (plain.length <= maxLength) return plain;
    return plain.substring(0, maxLength).trim() + '...';
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-secondary/30" id="blog">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-6xl font-display mb-3">
            Blog & <span className="text-gradient-amber">Notícias</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Fique por dentro das novidades e dicas do setor automotivo
          </p>
        </motion.div>

        {loading && (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card border border-border rounded-xl overflow-hidden animate-pulse">
                <div className="h-48 bg-muted" />
                <div className="p-6 space-y-3">
                  <div className="h-4 w-20 bg-muted rounded" />
                  <div className="h-6 w-full bg-muted rounded" />
                  <div className="h-4 w-full bg-muted rounded" />
                  <div className="h-4 w-2/3 bg-muted rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Não foi possível carregar os posts.</p>
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <div className="text-center py-12 bg-card border border-border rounded-xl">
            <p className="text-muted-foreground text-lg mb-2">Nenhum post publicado ainda.</p>
            <p className="text-sm text-muted-foreground/70">Em breve traremos novidades!</p>
          </div>
        )}

        {!loading && !error && posts.length > 0 && (
          <>
            <div className="grid md:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={`/blog/${post.id}`}
                    className="group block bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300 h-full"
                  >
                    {(post.coverImage || post.imageUrl) ? (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={(post.coverImage || post.imageUrl)!}
                          alt={post.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                      </div>
                    ) : (
                      <div className="h-48 bg-muted/50 flex flex-col items-center justify-center gap-2">
                        <ImageIcon className="h-10 w-10 text-muted-foreground/30" />
                      </div>
                    )}

                    <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium w-fit mb-3 ${categoryColors[post.category] || 'bg-gray-100 text-gray-700'}`}>
                        {categoryLabels[post.category] || post.category}
                      </span>

                      <h3 className="text-xl font-display text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-grow">
                        {getContentExcerpt(post.content)}
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{formatDate(post.createdAt)}</span>
                        </div>
                        <span className="flex items-center gap-1 text-xs text-primary font-medium group-hover:gap-2 transition-all">
                          Ler mais <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex items-center justify-center gap-2 mt-10"
              >
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center justify-center w-10 h-10 rounded-lg border border-border bg-card hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="h-5 w-5 text-foreground" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`flex items-center justify-center w-10 h-10 rounded-lg font-medium transition-colors ${currentPage === page ? 'bg-primary text-white' : 'border border-border bg-card hover:bg-primary/10'}`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center justify-center w-10 h-10 rounded-lg border border-border bg-card hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="h-5 w-5 text-foreground" />
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
