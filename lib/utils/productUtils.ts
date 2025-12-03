// Parse price string to number (removes ৳ symbol)
export function parsePrice(priceStr: string): number {
  return parseFloat(priceStr.replace(/[^0-9.]/g, ''));
}

// Calculate discount percentage
export function calculateDiscount(price: string, comparePrice: string): number {
  const priceNum = parsePrice(price);
  const comparePriceNum = parsePrice(comparePrice);
  if (comparePriceNum > priceNum) {
    return Math.round(((comparePriceNum - priceNum) / comparePriceNum) * 100);
  }
  return 0;
}
