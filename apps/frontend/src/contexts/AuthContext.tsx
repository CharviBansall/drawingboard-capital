// src/context/AuthContext.tsx
import { createContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import supabase from '@/lib/supabase';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Development mode: provide mock data
  const isDevelopment = import.meta.env.DEV;

  useEffect(() => {
    // Development mode: set mock user and session
    if (isDevelopment) {
      const mockUser: User = {
        id: 'mock-user-id',
        email: 'john.doe@example.com',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        aud: 'authenticated',
        app_metadata: {},
        user_metadata: {},
      } as User;

      const mockSession: Session = {
        access_token: 'mock-access-token',
        refresh_token: 'mock-refresh-token',
        expires_in: 3600,
        token_type: 'bearer',
        user: mockUser,
      } as Session;

      setUser(mockUser);
      setSession(mockSession);
      setLoading(false);
      return;
    }

    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [isDevelopment]);

  return (
    <AuthContext.Provider value={{ user, session, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
