'use client';

import { AuthProvider } from '@/components/auth/AuthContext';
import { CartProvider } from '@/hooks/use-cart';
import { Toaster } from '@/components/ui/toaster';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
        <Toaster />
      </CartProvider>
    </AuthProvider>
  );
}
