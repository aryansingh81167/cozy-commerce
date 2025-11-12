'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/use-cart';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Minus, Plus, Trash2 } from 'lucide-react';

export default function CartPage() {
  const { cartItems, itemCount, totalPrice, updateQuantity, removeFromCart } = useCart();

  if (itemCount === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-4xl font-headline mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">Add some cozy items to your cart to see them here.</p>
        <Button asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-headline mb-8">Your Cart</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              <div className="flex flex-col">
                {cartItems.map((item, index) => (
                  <div key={item.id}>
                    <CartItemRow item={item} onUpdate={updateQuantity} onRemove={removeFromCart} />
                    {index < cartItems.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>Free</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <Button asChild size="lg" className="w-full mt-4">
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function CartItemRow({ item, onUpdate, onRemove }: { item: any; onUpdate: Function; onRemove: Function }) {
  const placeholderImage = PlaceHolderImages.find(img => img.id === item.image);
  const imageUrl = placeholderImage?.imageUrl || 'https://picsum.photos/seed/default/100/100';

  return (
    <div className="flex items-center p-4 gap-4">
      <Image src={imageUrl} alt={item.name} width={100} height={100} className="rounded-md object-cover" data-ai-hint={placeholderImage?.imageHint} />
      <div className="flex-grow">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-muted-foreground">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center border rounded-md">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onUpdate(item.id, item.quantity - 1)}><Minus className="h-3 w-3" /></Button>
        <span className="w-8 text-center text-sm">{item.quantity}</span>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onUpdate(item.id, item.quantity + 1)}><Plus className="h-3 w-3" /></Button>
      </div>
      <p className="font-semibold w-20 text-right">${(item.price * item.quantity).toFixed(2)}</p>
      <Button variant="ghost" size="icon" onClick={() => onRemove(item.id)}>
        <Trash2 className="h-4 w-4 text-muted-foreground" />
      </Button>
    </div>
  );
}
