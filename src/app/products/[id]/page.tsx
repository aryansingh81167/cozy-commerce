import { products, reviews as allReviews } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Star, StarHalf } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { AddToCartButton } from './_components/AddToCartButton';
import { RecommendedProducts } from './_components/RecommendedProducts';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === params.id);
  
  if (!product) {
    notFound();
  }

  const productReviews = allReviews.filter(r => r.productId === product.id);
  const mainImage = PlaceHolderImages.find(img => img.id === product.images[0]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square relative rounded-lg overflow-hidden bg-card animate-in fade-in">
            {mainImage && (
              <Image
                src={mainImage.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                data-ai-hint={mainImage.imageHint}
              />
            )}
          </div>
          {/* Thumbnails can be added here */}
        </div>

        {/* Product Info */}
        <div className="animate-in fade-in delay-150">
          <h1 className="text-4xl lg:text-5xl font-headline font-bold">{product.name}</h1>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => {
                const ratingValue = i + 1;
                if (ratingValue <= Math.floor(product.rating)) {
                  return <Star key={i} className="w-5 h-5 text-primary fill-primary" />;
                } else if (product.rating > i && product.rating < ratingValue) {
                  return <StarHalf key={i} className="w-5 h-5 text-primary fill-primary" />;
                } else {
                  return <Star key={i} className="w-5 h-5 text-primary" />;
                }
              })}
            </div>
            <a href="#reviews" className="text-sm text-muted-foreground hover:text-primary">({product.reviewCount} reviews)</a>
          </div>
          <p className="mt-4 text-3xl font-semibold">${product.price.toFixed(2)}</p>
          <p className="mt-6 text-muted-foreground">{product.longDescription}</p>

          <div className="mt-8">
            <AddToCartButton product={product} />
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            {product.stock > 0 ? `${product.stock} items in stock` : 'Out of stock'}
          </p>
        </div>
      </div>
      
      {/* Reviews Section */}
      <div id="reviews" className="mt-16 md:mt-24">
        <h2 className="text-3xl font-headline mb-8">Customer Reviews</h2>
        <div className="space-y-8">
          {productReviews.length > 0 ? (
            productReviews.map(review => (
              <div key={review.id}>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-primary fill-primary' : 'text-muted'}`} />
                    ))}
                  </div>
                  <h3 className="font-semibold">{review.title}</h3>
                </div>
                <p className="text-muted-foreground mt-2">{review.text}</p>
                <p className="text-xs text-muted-foreground mt-2">{review.author} on {new Date(review.date).toLocaleDateString()}</p>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">No reviews yet. Be the first to share your thoughts!</p>
          )}
        </div>
      </div>

      <Separator className="my-16 md:my-24" />

      {/* Recommended Products */}
      <RecommendedProducts currentProductId={product.id} />

    </div>
  );
}
