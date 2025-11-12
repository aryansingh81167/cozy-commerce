import { products, categories } from '@/lib/data';
import { ProductCard } from '@/components/products/ProductCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from '@/components/ui/separator';

export default function ProductsPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const selectedCategory = searchParams.category as string | undefined;

  const filteredProducts = selectedCategory
    ? products.filter(p => p.categoryId === selectedCategory)
    : products;

  const categoryName = categories.find(c => c.id === selectedCategory)?.name || 'All Products';

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-baseline gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-headline">{categoryName}</h1>
          <p className="text-muted-foreground mt-2">Browse our curated collection of beautiful home decor.</p>
        </div>
        <div className="flex items-center gap-4">
          <Select>
            <SelectTrigger className="w-[180px] bg-card">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Separator className="mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
