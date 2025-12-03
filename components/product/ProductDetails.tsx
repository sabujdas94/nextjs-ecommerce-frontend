type ProductDetailsProps = {
  specification: string;
  collections: Array<{ name: string; slug: string }>;
};

export default function ProductDetails({ specification, collections }: ProductDetailsProps) {
  return (
    <>
      {/* Specifications */}
      {specification && (
        <div className="border-t pt-6">
          <h3 className="font-semibold mb-3">Product Specifications</h3>
          <div 
            className="prose prose-sm max-w-none text-gray-700 [&_ul]:list-none [&_ul]:space-y-2 [&_li]:pl-6 [&_li]:relative [&_li]:before:content-['✓'] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-black [&_li]:before:font-bold"
            dangerouslySetInnerHTML={{ __html: specification }}
          />
        </div>
      )}
    </>
  );
}
