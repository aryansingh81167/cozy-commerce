'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const shippingSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  zip: z.string().min(1, 'ZIP code is required'),
});

export default function CheckoutPage() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof shippingSchema>>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      zip: '',
    },
  });

  function onSubmit(values: z.infer<typeof shippingSchema>) {
    console.log('Order submitted:', values);
    toast({
      title: "Order Placed!",
      description: "Thank you for your purchase. We've received your order.",
    });
    clearCart();
    router.push('/');
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-4xl font-headline mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground">You can't check out with an empty cart.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-headline text-center mb-8">Checkout</h1>
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="lg:order-last">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cartItems.map(item => <OrderItem key={item.id} item={item} />)}
              </div>
              <Separator className="my-4" />
              <div className="space-y-2">
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
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline">Shipping Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>Email</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <div className="flex gap-4">
                    <FormField control={form.control} name="firstName" render={({ field }) => (
                      <FormItem className="flex-1"><FormLabel>First Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="lastName" render={({ field }) => (
                      <FormItem className="flex-1"><FormLabel>Last Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="address" render={({ field }) => (
                    <FormItem><FormLabel>Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <div className="flex gap-4">
                    <FormField control={form.control} name="city" render={({ field }) => (
                      <FormItem className="flex-1"><FormLabel>City</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="zip" render={({ field }) => (
                      <FormItem className="flex-1"><FormLabel>ZIP Code</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                </CardContent>
              </Card>

              <Button type="submit" size="lg" className="w-full">Place Order</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

function OrderItem({ item }: { item: any }) {
  const placeholderImage = PlaceHolderImages.find(img => img.id === item.image);
  const imageUrl = placeholderImage?.imageUrl || 'https://picsum.photos/seed/default/100/100';
  return (
    <div className="flex items-center gap-4">
      <div className="relative w-16 h-16 rounded-md overflow-hidden">
        <Image src={imageUrl} alt={item.name} fill className="object-cover" data-ai-hint={placeholderImage?.imageHint} />
        <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs w-6 h-6 rounded-full flex items-center justify-center">{item.quantity}</span>
      </div>
      <div className="flex-grow">
        <p className="font-medium">{item.name}</p>
      </div>
      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
    </div>
  );
}
