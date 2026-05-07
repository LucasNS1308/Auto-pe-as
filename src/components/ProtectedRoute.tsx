import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { loading, authenticated } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 font-medium">Verificando acesso...</p>
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/login/admin" replace />;
  }

  return <>{children}</>;
}
