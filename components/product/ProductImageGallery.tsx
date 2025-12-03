import Image from 'next/image';

type ProductImageGalleryProps = {
  mainImage: string;
  thumbnail: string;
  images: Array<{ path: string }>;
  productName: string;
  discount: number;
  tags: string[];
  onImageSelect: (image: string) => void;
};

export default function ProductImageGallery({
  mainImage,
  thumbnail,
  images,
  productName,
  discount,
  tags,
  onImageSelect,
}: ProductImageGalleryProps) {
  return (
    <div>
      <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 mb-4">
        <Image
          src={mainImage}
          alt={productName}
          fill
          className="object-cover"
          unoptimized
        />
        {discount > 0 && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded font-bold">
            -{discount}%
          </div>
        )}
        {tags.includes('New Arrival') && (
          <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded font-bold text-sm">
            New Arrival
          </div>
        )}
      </div>
      
      {/* Thumbnail Images */}
      <div className="grid grid-cols-4 gap-4">
        <div 
          onClick={() => onImageSelect(thumbnail)}
          className={`relative aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-pointer border-2 transition ${
            mainImage === thumbnail ? 'border-black' : 'border-transparent hover:border-black'
          }`}
        >
          <Image src={thumbnail} alt="Thumbnail" fill className="object-cover" unoptimized />
        </div>
        {images.map((img, idx) => (
          <div 
            key={idx}
            onClick={() => onImageSelect(img.path)}
            className={`relative aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-pointer border-2 transition ${
              mainImage === img.path ? 'border-black' : 'border-transparent hover:border-black'
            }`}
          >
            <Image src={img.path} alt={`Product ${idx + 1}`} fill className="object-cover" unoptimized />
          </div>
        ))}
      </div>
    </div>
  );
}
