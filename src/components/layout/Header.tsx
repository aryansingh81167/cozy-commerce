'use client';

import Link from 'next/link';
import { ShoppingBag, User, Sofa, Menu, X } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { CartSheet } from '@/components/cart/CartSheet';
import { useCart } from '@/hooks/use-cart';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useRouter } from 'next/navigation';

const navLinks = [
  { href: '/products', label: 'Shop' },
  { href: '/become-a-seller', label: 'Become a Seller' },
];

export function Header() {
  const { isAuthenticated, appUser, logout } = useAuth();
  const { itemCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  
  const handleLogout = async () => {
    await logout();
    router.push('/');
  }

  return (
    <header className="bg-background/80 sticky top-0 z-40 w-full border-b backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Sofa className="h-8 w-8 text-primary" />
          <span className="font-headline text-2xl font-bold text-foreground">Cozy Corners</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <AuthControl isAuthenticated={isAuthenticated} user={appUser} logout={handleLogout} />
            <CartControl />
          </div>
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full">
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center border-b pb-4">
                    <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                      <Sofa className="h-6 w-6 text-primary" />
                      <span className="font-headline text-xl font-bold text-foreground">Cozy Corners</span>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                      <X className="h-6 w-6" />
                    </Button>
                  </div>
                  <nav className="flex flex-col gap-6 mt-8">
                    {navLinks.map(link => (
                      <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-foreground transition-colors hover:text-primary">
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                  <div className="mt-auto border-t pt-6 flex flex-col gap-4">
                     <AuthControl isAuthenticated={isAuthenticated} user={appUser} logout={handleLogout} />
                     <CartControl isMobile />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

function AuthControl({isAuthenticated, user, logout} : {isAuthenticated: boolean, user: any, logout: () => void}) {
  return isAuthenticated && user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.photoURL || ''} alt={user.name || ''} />
              <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href="/profile">My Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Button asChild variant="ghost" size="sm">
      <Link href="/login">Login</Link>
    </Button>
  );
}

function CartControl({ isMobile = false }) {
    const { itemCount } = useCart();

    if (isMobile) {
        return (
             <CartSheet>
                <Button variant="outline" className="w-full justify-between">
                    <span>View Cart</span>
                    <Badge variant="secondary" className="rounded-full">{itemCount}</Badge>
                </Button>
            </CartSheet>
        )
    }

    return (
        <CartSheet>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 justify-center rounded-full p-0 text-xs">
                  {itemCount}
                </Badge>
              )}
              <span className="sr-only">Shopping Cart</span>
            </Button>
        </CartSheet>
    );
}