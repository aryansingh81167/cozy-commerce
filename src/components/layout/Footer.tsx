import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sofa, Twitter, Instagram, Facebook } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-card text-card-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="font-headline text-lg font-semibold mb-4">Stay in the Loop</h3>
            <p className="text-muted-foreground mb-4">
              Get emails about new arrivals, special offers, and our favorite things.
            </p>
            <form className="flex gap-2">
              <Input type="email" placeholder="Enter your email" className="bg-background" />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link href="/products" className="text-muted-foreground hover:text-primary">All Products</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Textiles</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Accessories</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Wall Decor</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Our Story</Link></li>
              <li><Link href="/become-a-seller" className="text-muted-foreground hover:text-primary">Become a Seller</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Sofa className="h-6 w-6 text-primary" />
            <span className="font-headline text-xl font-bold">Cozy Corners</span>
          </div>
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <Link href="#"><Twitter className="text-muted-foreground hover:text-primary" /></Link>
            <Link href="#"><Instagram className="text-muted-foreground hover:text-primary" /></Link>
            <Link href="#"><Facebook className="text-muted-foreground hover:text-primary" /></Link>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Cozy Corners. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
