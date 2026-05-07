import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import NotFound from './pages/NotFound';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<BlogPost />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
