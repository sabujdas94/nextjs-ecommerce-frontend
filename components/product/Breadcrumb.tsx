type BreadcrumbProps = {
  productName: string;
  collections: Array<{ name: string; slug: string }>;
};

export default function Breadcrumb({ productName, collections }: BreadcrumbProps) {
  return (
    <div className="text-sm text-gray-600 mb-6">
      <a href="/" className="hover:text-black">Home</a>
      {' / '}
      <a href="/shop" className="hover:text-black">Shop</a>
      {collections.length > 0 && (
        <>
          {' / '}
          <a href={`/shop?category=${collections[0].slug}`} className="hover:text-black">
            {collections[0].name}
          </a>
        </>
      )}
      {' / '}
      <span className="text-gray-900">{productName}</span>
    </div>
  );
}
