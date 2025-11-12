'use client';

import Link from 'next/link';
import Image from 'next/image';
import { X, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { useCart } from '@/hooks/use-cart';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function CartSheet({ children }: { children: React.ReactNode }) {
  const { cartItems, removeFromCart, updateQuantity, itemCount, totalPrice } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-headline">Shopping Cart ({itemCount})</SheetTitle>
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <ScrollArea className="flex-grow my-4 pr-6">
              <div className="flex flex-col gap-6">
                {cartItems.map(item => (
                  <CartItemRow key={item.id} item={item} onRemove={removeFromCart} onUpdate={updateQuantity} />
                ))}
              </div>
            </ScrollArea>
            <SheetFooter className="mt-auto">
              <div className="w-full space-y-4">
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <SheetClose asChild>
                  <Button asChild size="lg" className="w-full">
                    <Link href="/checkout">Continue to Checkout</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button asChild variant="ghost" className="w-full">
                    <Link href="/products">Continue Shopping</Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h3 className="font-headline text-2xl mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-6">Looks like you haven't added anything yet.</p>
            <SheetClose asChild>
              <Button asChild>
                <Link href="/products">Start Shopping</Link>
              </Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

function CartItemRow({ item, onRemove, onUpdate }: { item: any, onRemove: (id: string) => void, onUpdate: (id: string, q: number) => void }) {
  const placeholderImage = PlaceHolderImages.find(img => img.id === item.image);
  const imageUrl = placeholderImage?.imageUrl || 'https://picsum.photos/seed/default/100/100';

  return (
    <div className="flex items-start gap-4">
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
        <Image
          src={imageUrl}
          alt={item.name}
          fill
          sizes="80px"
          className="object-cover"
          data-ai-hint={placeholderImage?.imageHint}
        />
      </div>
      <div className="flex-grow">
        <Link href={`/products/${item.id}`} className="font-semibold text-sm hover:underline">{item.name}</Link>
        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center border rounded-md">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onUpdate(item.id, item.quantity - 1)}><Minus className="h-3 w-3" /></Button>
            <span className="w-8 text-center text-sm">{item.quantity}</span>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onUpdate(item.id, item.quantity + 1)}><Plus className="h-3 w-3" /></Button>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onRemove(item.id)}>
            <X className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      </div>
    </div>
  );
}
