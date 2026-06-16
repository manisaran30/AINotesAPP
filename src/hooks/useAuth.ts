import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { Session, User } from '@supabase/supabase-js';

interface UseAuthReturn {
  session: Session | null;
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function useAuth(): UseAuthReturn {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    const fallback = setTimeout(() => {
      if (!cancelled) setLoading(false);
    }, 5000);

    const init = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (cancelled) return;
        setSession(session);
        setUser(session?.user ?? null);
      } catch (err) {
        console.error('Auth init error:', err);
      } finally {
        clearTimeout(fallback);
        if (!cancelled) setLoading(false);
      }
    };

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (cancelled) return;
      clearTimeout(fallback);
      setSession(session);
      setUser(session?.user ?? null);
      if (loading) setLoading(false);
    });

    return () => {
      cancelled = true;
      clearTimeout(fallback);
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate('/notes');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      // In a real app, you might want to handle email confirmation or redirect
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return { session, user, signIn, signUp, signOut, loading, error };
}