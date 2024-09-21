"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { authen } from './firebase';
import { useRouter } from 'next/navigation';

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = authen.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    // Handle email link sign-in
    if (isSignInWithEmailLink(authen, window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        email = window.prompt('Please provide your email for confirmation');
      }
      if (email) {
        signInWithEmailLink(authen, email, window.location.href)
          .then(() => {
            window.localStorage.removeItem('emailForSignIn');
            router.push('/new-project');
          })
          .catch((error) => {
            console.error('Error signing in with email link', error);
          });
      }
    }

    return () => unsubscribe();
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);