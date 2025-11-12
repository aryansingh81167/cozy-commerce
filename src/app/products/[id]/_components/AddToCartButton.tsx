'use client';

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/use-cart";
import type { Product } from "@/lib/types";

export function AddToCartButton({ product }: { product: Product }) {
  const { toast } = useToast();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
    });
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Button size="lg" onClick={handleAddToCart} disabled={product.stock <= 0} className="w-full md:w-auto">
      {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
    </Button>
  );
}
