"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AuthResponse, AuthUser } from "@/types/auth";

const AUTH_STORAGE_KEY = "explorer-auth-session";
const AUTH_REDIRECT_KEY = "explorer-auth-redirect";

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  isReady: boolean;
  isAuthenticated: boolean;
  setSession: (session: AuthResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export default function AuthProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as AuthResponse;
        if (parsed.token && parsed.user) {
          setToken(parsed.token);
          setUser(parsed.user);
        }
      }
    } catch {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
    } finally {
      setIsReady(true);
    }
  }, []);

  const setSession = (session: AuthResponse) => {
    setToken(session.token);
    setUser(session.user);
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isReady,
        isAuthenticated: Boolean(user && token),
        setSession,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }

  return context;
}

export function rememberAuthRedirect(path: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(AUTH_REDIRECT_KEY, path);
}

export function consumeAuthRedirect() {
  if (typeof window === "undefined") {
    return null;
  }

  const path = window.localStorage.getItem(AUTH_REDIRECT_KEY);
  window.localStorage.removeItem(AUTH_REDIRECT_KEY);
  return path;
}
