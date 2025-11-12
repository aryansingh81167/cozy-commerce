import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { categories, products } from '@/lib/data';
import { ProductCard } from '@/components/products/ProductCard';

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'heroImage');
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="space-y-16 md:space-y-24">
      <HeroSection heroImage={heroImage} />
      <CategorySection />
      <FeaturedProductsSection products={featuredProducts} />
    </div>
  );
}

function HeroSection({ heroImage }: { heroImage: any }) {
  return (
    <section className="relative h-[60vh] min-h-[400px] w-full animate-in fade-in">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          priority
          className="object-cover"
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative h-full flex flex-col items-center justify-center text-center text-primary-foreground p-4">
        <h1 className="text-4xl md:text-6xl font-headline font-bold drop-shadow-md">
          Find Your Perfect Corner
        </h1>
        <p className="mt-4 max-w-xl text-lg drop-shadow">
          Curated home decor to bring warmth, comfort, and style to your space.
        </p>
        <Button asChild size="lg" className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90">
          <Link href="/products">Shop Now</Link>
        </Button>
      </div>
    </section>
  );
}

function CategorySection() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-headline text-center mb-8">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
        {categories.map(category => (
          <Link href={`/products?category=${category.id}`} key={category.id} className="group flex flex-col items-center gap-3 animate-in fade-in">
            <div className="w-24 h-24 rounded-full bg-card border flex items-center justify-center transition-all group-hover:bg-accent group-hover:border-primary">
              <category.icon className="w-10 h-10 text-primary" />
            </div>
            <span className="font-semibold font-headline text-lg group-hover:text-primary">{category.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function FeaturedProductsSection({ products }: { products: any[] }) {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
      <h2 className="text-3xl font-headline text-center mb-8">Featured Collection</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="text-center mt-12">
        <Button asChild variant="outline" size="lg">
          <Link href="/products">View All Products</Link>
        </Button>
      </div>
    </section>
  );
}
