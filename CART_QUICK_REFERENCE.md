# Cart API Quick Reference

## Quick Start

### 1. Environment Setup
Ensure your `.env.local` file has:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### 2. Start Development
```bash
npm run dev
```

## API Endpoints Reference

### Create/Get Cart
```bash
# Create new cart
POST /api/cart

# Get existing cart
GET /api/cart?cart_id={uuid}
```

### Manage Cart Items
```bash
# Add item
POST /api/cart/items
Body: { cart_id, variant_id, quantity }

# Update quantity
PATCH /api/cart/items/{lineId}
Body: { cart_id, quantity }

# Remove item
DELETE /api/cart/items/{lineId}
Body: { cart_id }

# Clear cart
DELETE /api/cart
Body: { cart_id }
```

## Code Examples

### Add to Cart
```tsx
import { useCart } from '@/contexts/CartContext';

function ProductComponent() {
  const { addItem, isLoading } = useCart();
  
  const handleAddToCart = async () => {
    try {
      await addItem(variantId, quantity);
      // Success!
    } catch (error) {
      // Handle error
    }
  };
}
```

### Display Cart Count
```tsx
import { useCart } from '@/contexts/CartContext';

function Header() {
  const { cart } = useCart();
  const count = cart?.lines_count || 0;
  
  return <span>{count}</span>;
}
```

### Update Cart Item
```tsx
const { updateQuantity } = useCart();

await updateQuantity(lineId, newQuantity);
```

### Remove Cart Item
```tsx
const { removeItem } = useCart();

await removeItem(lineId);
```

## Cart Context API

```tsx
const {
  cart,           // Cart | null - Current cart data
  isLoading,      // boolean - Loading state
  error,          // string | null - Error message
  addItem,        // (variantId, quantity?) => Promise<void>
  updateQuantity, // (lineId, quantity) => Promise<void>
  removeItem,     // (lineId) => Promise<void>
  clearCart,      // () => Promise<void>
  refreshCart,    // () => Promise<void>
} = useCart();
```

## Testing Checklist

- [ ] Backend API is running
- [ ] Environment variable is set
- [ ] Can create a cart automatically
- [ ] Can add items from product page
- [ ] Cart count updates in header
- [ ] Can view cart at /cart
- [ ] Can update quantities
- [ ] Can remove items
- [ ] Can clear entire cart
- [ ] Error messages display properly
- [ ] Loading states work correctly

## Files Modified/Created

### New Files
- `lib/types/cart.ts` - Type definitions
- `lib/api/cart.ts` - API service
- `contexts/CartContext.tsx` - State management
- `CART_IMPLEMENTATION.md` - Full documentation
- `CART_QUICK_REFERENCE.md` - This file

### Modified Files
- `app/layout.tsx` - Added CartProvider
- `app/cart/page.tsx` - Integrated real cart data
- `app/product/[id]/page.tsx` - Added variant selection
- `components/Header.tsx` - Real cart count
- `components/product/ProductActions.tsx` - Add to cart functionality

## Common Issues

**Cart not persisting?**
- Check browser localStorage for 'cart_id' key
- Verify API URL is correct

**Can't add items?**
- Ensure variant_id exists in your database
- Check product has stock > 0
- Verify all variants are selected

**API errors?**
- Check backend is running on port 8000
- Verify CORS is configured
- Check API response format matches types

## Response Format

### Successful Cart Response
```json
{
  "id": "9d3f5c8a-1b2e-4f3d-8a9b-1c2d3e4f5a6b",
  "currency_code": "USD",
  "sub_total": "$129.99",
  "tax_total": "$13.00",
  "total": "$142.99",
  "lines": [
    {
      "id": 456,
      "variant_id": 118,
      "quantity": 2,
      "unit_price": "$129.99",
      "sub_total": "$259.98",
      "total": "$285.98",
      "product": {
        "name": "Product Name",
        "sku": "SKU-123",
        "thumbnail": "https://..."
      }
    }
  ],
  "lines_count": 1
}
```

### Error Response
```json
{
  "message": "Error description"
}
```
