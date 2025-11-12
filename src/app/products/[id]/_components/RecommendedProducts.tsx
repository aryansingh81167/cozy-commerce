import { getPersonalizedRecommendations } from '@/ai/flows/personalized-product-recommendations';
import { products } from '@/lib/data';
import { ProductCard } from '@/components/products/ProductCard';

export async function RecommendedProducts({ currentProductId }: { currentProductId: string }) {
  try {
    const userHistory = "User has viewed 'Terracotta Dream Vase', 'Cream Linen Cushions' and purchased 'Golden Ratio Wall Art'. They are interested in minimalist and modern home decor.";
    
    // Create a catalog string from our product data
    const productCatalog = products
      .filter(p => p.id !== currentProductId)
      .map(p => `ID: ${p.id}, Name: ${p.name}, Description: ${p.description}, Category: ${p.categoryId}`)
      .join('\n');

    const result = await getPersonalizedRecommendations({ userHistory, productCatalog });
    
    // Basic parsing: assumes AI returns a comma-separated list of product names
    const recommendedProductNames = result.recommendations.split('\n').map(s => s.replace(/^- /, '').trim());

    const recommendedProducts = products.filter(p => recommendedProductNames.some(name => p.name.includes(name) || name.includes(p.name)));

    if (recommendedProducts.length === 0) {
      // Fallback: Show a few other popular products if AI fails or returns nothing useful
      const fallbackProducts = products.filter(p => p.id !== currentProductId).slice(0, 4);
      return <FallbackProducts products={fallbackProducts} />;
    }

    return (
      <section>
        <h2 className="text-3xl font-headline text-center mb-8">You Might Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {recommendedProducts.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    );
  } catch (error) {
    console.error("Failed to get AI recommendations:", error);
    // Render a fallback if the AI call fails
    const fallbackProducts = products.filter(p => p.id !== currentProductId).slice(0, 4);
    return <FallbackProducts products={fallbackProducts} />;
  }
}

function FallbackProducts({ products }: { products: any[] }) {
  return (
    <section>
      <h2 className="text-3xl font-headline text-center mb-8">You Might Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
