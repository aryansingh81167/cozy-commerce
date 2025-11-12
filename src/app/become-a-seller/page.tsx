import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const benefits = [
  'Reach a dedicated audience of home decor enthusiasts.',
  'Simple and transparent commission structure.',
  'Easy-to-use seller dashboard to manage your products.',
  'Marketing support to promote your brand.',
];

export default function BecomeASellerPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">Partner with Cozy Corners</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Share your unique home decor creations with a passionate community. We're looking for artisans and designers who share our love for quality, style, and comfort.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto mt-12 animate-in fade-in">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Why Sell With Us?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-3">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
          <div className="pt-6 text-center">
            <h3 className="text-xl font-headline mb-4">Ready to Join?</h3>
            <p className="text-muted-foreground mb-6">
              We're excited to learn more about your brand. Click the button below to start your application.
            </p>
            <Button size="lg">Apply Now</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
