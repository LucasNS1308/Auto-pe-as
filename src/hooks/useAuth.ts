import { useState, useEffect } from 'react';
import { API_URL, getAuthHeaders } from '@/lib/api';

export interface AuthState {
  loading: boolean;
  authenticated: boolean;
}

export const useAuth = (): AuthState => {
  const [loading, setLoading] = useState<boolean>(true);
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        setAuthenticated(false);
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`${API_URL}/auth/me`, {
          method: 'GET',
          headers: { ...getAuthHeaders() },
        });
        if (res.ok) {
          setAuthenticated(true);
        } else {
          localStorage.removeItem('admin_token');
          setAuthenticated(false);
        }
      } catch {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  return { loading, authenticated };
};
