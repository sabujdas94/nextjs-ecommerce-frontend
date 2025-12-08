"use client";

import { useState, use, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageContentLayout from "@/components/PageContentLayout";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductVariants from "@/components/product/ProductVariants";
import QuantitySelector from "@/components/product/QuantitySelector";
import ProductActions from "@/components/product/ProductActions";
import ProductDetails from "@/components/product/ProductDetails";
import Breadcrumb from "@/components/product/Breadcrumb";
import ProductPageSkeleton from "@/components/product/ProductPageSkeleton";
import { useProduct } from "@/hooks/useProduct";
import { parsePrice, calculateDiscount } from "@/lib/utils/productUtils";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { product, loading, error } = useProduct(id);
  const [selectedVariantIds, setSelectedVariantIds] = useState<
    Record<string, number>
  >({});
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState<string | null>(null);

  // Initialize selected variants and main image when product loads
  useEffect(() => {
    if (product) {
      setMainImage(product.thumbnail);

      const initialVariants: Record<string, number> = {};
      product.variant_options.forEach((option) => {
        if (option.values.length > 0) {
          initialVariants[option.name] = option.values[0].id;
        }
      });
      setSelectedVariantIds(initialVariants);
    }
  }, [product]);

  const handleVariantChange = (variantName: string, valueId: number) => {
    setSelectedVariantIds((prev) => ({ ...prev, [variantName]: valueId }));
  };

  // Find current stock and variant ID based on selected variants
  const currentVariantInfo = product
    ? (() => {
        const selectedIds = Object.values(selectedVariantIds).sort(
          (a, b) => a - b
        );
        const combination = product.variant_combinations.find(
          (combo) =>
            combo.option_value_ids
              .sort((a, b) => a - b)
              .every((id) => selectedIds.includes(id)) &&
            selectedIds.every((id) => combo.option_value_ids.includes(id))
        );
        return {
          stock: combination ? combination.stock : 0,
          variantId: combination ? combination.variant_id : undefined,
        };
      })()
    : { stock: 0, variantId: undefined };

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-4">
        {/* Loading State */}
        {loading && <ProductPageSkeleton />}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
            <p className="font-semibold">Error loading product</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Product Content */}
        {!loading && !error && product && (
          <Breadcrumb
            productName={product.name}
            collections={product.collections}
          />
        )}
      </div>
      {!loading && !error && product && (
        <PageContentLayout>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Images */}
                {mainImage && (
                  <ProductImageGallery
                    mainImage={mainImage}
                    thumbnail={product.thumbnail}
                    images={product.images}
                    productName={product.name}
                    discount={calculateDiscount(
                      product.price,
                      product.comparePrice
                    )}
                    tags={product.tags}
                    onImageSelect={setMainImage}
                  />
                )}

                {/* Product Info */}
                <div>
                  <ProductInfo
                    name={product.name}
                    tags={product.tags}
                    price={product.price}
                    comparePrice={product.comparePrice}
                    description={product.description}
                    parsePrice={parsePrice}
                  />

                  <ProductVariants
                    variantOptions={product.variant_options}
                    selectedVariantIds={selectedVariantIds}
                    onVariantChange={handleVariantChange}
                  />

                  {/* Quantity and Actions in same row */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3">
                      <QuantitySelector
                        quantity={quantity}
                        onQuantityChange={setQuantity}
                      />
                      <ProductActions 
                        stock={currentVariantInfo.stock} 
                        variantId={currentVariantInfo.variantId}
                        quantity={quantity}
                      />
                    </div>
                  </div>

                  <ProductDetails
                    specification={product.specification}
                    collections={product.collections}
                  />
                </div>
              </div>
        </PageContentLayout>
      )}
      <Footer />
    </main>
  );
}
