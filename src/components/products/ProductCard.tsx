'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, StarHalf } from 'lucide-react';
import type { Product } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '../ui/button';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const placeholderImage = PlaceHolderImages.find(img => img.id === product.images[0]);
  const imageUrl = placeholderImage?.imageUrl || 'https://picsum.photos/seed/default/600/600';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
    });
    toast({
      title: "Added to cart",
      description: `${product.name} is now in your cart.`,
    });
  };

  return (
    <Link href={`/products/${product.id}`} className="group">
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-in fade-in">
        <CardHeader className="p-0">
          <div className="aspect-square overflow-hidden relative">
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={placeholderImage?.imageHint}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-lg font-headline mb-1 leading-tight">{product.name}</CardTitle>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => {
                const ratingValue = i + 1;
                if (ratingValue <= Math.floor(product.rating)) {
                  return <Star key={i} className="w-4 h-4 text-primary fill-primary" />;
                } else if (product.rating > i && product.rating < ratingValue) {
                  return <StarHalf key={i} className="w-4 h-4 text-primary fill-primary" />;
                } else {
                  return <Star key={i} className="w-4 h-4 text-primary" />;
                }
              })}
            </div>
            <span>({product.reviewCount})</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <p className="text-lg font-semibold text-foreground">
            ${product.price.toFixed(2)}
          </p>
          <Button variant="outline" size="sm" onClick={handleAddToCart}>Add to Cart</Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
