import { VariantOption } from '@/hooks/useProduct';

type ProductVariantsProps = {
  variantOptions: VariantOption[];
  selectedVariantIds: Record<string, number>;
  onVariantChange: (variantName: string, valueId: number) => void;
};

export default function ProductVariants({
  variantOptions,
  selectedVariantIds,
  onVariantChange,
}: ProductVariantsProps) {
  return (
    <>
      {variantOptions.map((option) => (
        <div key={option.name} className="mb-6">
          <h3 className="font-semibold mb-3">Select {option.name}</h3>
          <div className="flex gap-2 flex-wrap">
            {option.values.map((value) => (
              <button
                key={value.id}
                onClick={() => onVariantChange(option.name, value.id)}
                className={`px-4 py-2 border rounded-lg font-medium transition ${
                  selectedVariantIds[option.name] === value.id
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-900 border-gray-300 hover:border-black'
                }`}
              >
                {value.name}
              </button>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
