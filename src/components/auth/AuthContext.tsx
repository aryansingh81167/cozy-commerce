'use client';

import React, { createContext, useContext } from 'react';
import { useUser, UserHookResult } from '@/firebase';
import {
  getAuth,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import {
  initiateEmailSignIn,
  initiateEmailSignUp,
} from '@/firebase/non-blocking-login';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { doc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import type { User } from '@/lib/types';


interface AuthContextType extends UserHookResult {
  login: (email: string, pass: string) => void;
  logout: () => void;
  signup: (name: string, email: string, pass: string) => void;
  loginWithGoogle: () => void;
  appUser: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const userHook = useUser();
  const firestore = useFirestore();
  const auth = getAuth();
  const [appUser, setAppUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    if (userHook.user) {
      const userRef = doc(firestore, 'users', userHook.user.uid);
      setDocumentNonBlocking(
        userRef,
        {
          id: userHook.user.uid,
          name: userHook.user.displayName,
          email: userHook.user.email,
          photoURL: userHook.user.photoURL,
        },
        { merge: true }
      );
      setAppUser({
        id: userHook.user.uid,
        name: userHook.user.displayName,
        email: userHook.user.email,
        photoURL: userHook.user.photoURL,
      });
    } else {
      setAppUser(null);
    }
  }, [userHook.user, firestore]);

  const login = (email: string, pass: string) => {
    initiateEmailSignIn(auth, email, pass);
  };

  const signup = (name: string, email: string, pass: string) => {
    initiateEmailSignUp(auth, email, pass);
    // Note: a full implementation would update the user profile with the name
    // after signup is successful, often via a trigger or a subsequent call.
  };
  
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google sign-in error", error);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{ ...userHook, isAuthenticated: !!userHook.user, login, logout, signup, loginWithGoogle, appUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
