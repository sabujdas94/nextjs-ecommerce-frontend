type ProductInfoProps = {
  name: string;
  tags: string[];
  price: string;
  comparePrice: string;
  description: string;
  parsePrice: (price: string) => number;
};

export default function ProductInfo({
  name,
  tags,
  price,
  comparePrice,
  description,
  parsePrice,
}: ProductInfoProps) {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">{name}</h1>

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-gray-900">{price}</span>
          {comparePrice && parsePrice(comparePrice) > parsePrice(price) && (
            <span className="text-xl text-gray-500 line-through">{comparePrice}</span>
          )}
        </div>
      </div>

      {/* Description */}
      <div 
        className="text-gray-700 mb-6 prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </>
  );
}
