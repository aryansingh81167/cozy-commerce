'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/components/auth/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';
import { Separator } from '@/components/ui/separator';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export default function LoginPage() {
  const router = useRouter();
  const { login, loginWithGoogle, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  useEffect(() => {
    if (isAuthenticated) {
      toast({
        title: 'Welcome back!',
        description: "You've been successfully logged in.",
      });
      router.push('/profile');
    }
  }, [isAuthenticated, router, toast]);

  function onSubmit(values: z.infer<typeof loginSchema>) {
    login(values.email, values.password);
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[80vh] px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">Welcome Back</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="name@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Form>
          <Separator className="my-4" />
           <Button variant="outline" className="w-full" onClick={loginWithGoogle}>
            Login with Google
          </Button>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="underline hover:text-primary">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}