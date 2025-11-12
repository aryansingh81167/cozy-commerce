'use client';

import { useAuth } from '@/components/auth/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { orders as mockOrders } from '@/lib/data';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!user) {
    return null; // or a loading spinner
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-headline mb-8">Welcome, {user.name}</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Order History</CardTitle>
              <CardDescription>Here are your recent orders.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {mockOrders.map(order => (
                <div key={order.id} className="border p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="font-semibold">Order #{order.id}</h3>
                      <p className="text-sm text-muted-foreground">Date: {order.date}</p>
                    </div>
                    <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}>{order.status}</Badge>
                  </div>
                  <Separator />
                  <div className="mt-4 space-y-4">
                    {order.items.map(item => {
                      const placeholderImage = PlaceHolderImages.find(img => img.id === item.image);
                      const imageUrl = placeholderImage?.imageUrl || 'https://picsum.photos/seed/default/100/100';
                      return (
                        <div key={item.id} className="flex items-center gap-4">
                          <Image src={imageUrl} alt={item.name} width={50} height={50} className="rounded-md object-cover" />
                          <div className="flex-grow">
                            <p>{item.name}</p>
                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      );
                    })}
                  </div>
                  <Separator className="my-4" />
                  <div className="text-right font-bold">
                    Total: ${order.total.toFixed(2)}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
