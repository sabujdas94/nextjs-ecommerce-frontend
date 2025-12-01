interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category?: string;
}

export default function ProductCard({ id, name, price, originalPrice, image, category }: ProductCardProps) {
  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute bottom-4 left-0 right-0 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center z-10">
          <button className="bg-black text-white py-2 px-4 rounded-full text-sm font-medium hover:bg-gray-800 w-full shadow-lg">
            Add to Cart
          </button>
        </div>
        <a href={`/product/${id}`} className="absolute inset-0 z-0">
          <span className="sr-only">View {name}</span>
        </a>
      </div>
      <a href={`/product/${id}`}>
        <div className="p-4">
          {category && <p className="text-xs text-gray-500 mb-1">{category}</p>}
          <h3 className="font-semibold text-sm mb-2 line-clamp-2">{name}</h3>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">৳ {price.toLocaleString()}</span>
            {originalPrice && (
              <span className="text-sm text-gray-500 line-through">৳ {originalPrice.toLocaleString()}</span>
            )}
          </div>
        </div>
      </a>
    </div>
  );
}
