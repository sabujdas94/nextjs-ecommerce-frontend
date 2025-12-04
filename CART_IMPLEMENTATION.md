# Cart Implementation Documentation

This document describes the cart functionality implementation for the Laravel E-commerce frontend.

## Overview

The cart system uses UUID-based identification and integrates with a Laravel backend API. Cart data is managed through React Context and persists using localStorage.

## Architecture

### Files Created

1. **Types** (`lib/types/cart.ts`)
   - TypeScript interfaces for cart data structures
   - Request/response types for API calls

2. **API Service** (`lib/api/cart.ts`)
   - Cart API functions (create, get, add, update, remove, clear)
   - Error handling with custom `CartAPIError` class
   - Configurable API base URL

3. **Context Provider** (`contexts/CartContext.tsx`)
   - Global cart state management
   - localStorage integration for cart persistence
   - React hooks for cart operations

4. **Updated Components**
   - `app/cart/page.tsx` - Cart page with real data
   - `app/product/[id]/page.tsx` - Product page with add to cart
   - `components/product/ProductActions.tsx` - Add to cart button
   - `components/Header.tsx` - Cart count badge
   - `app/layout.tsx` - Cart provider wrapper

## Features

### Cart Management
- ✅ Create/retrieve cart with UUID
- ✅ Add items to cart
- ✅ Update item quantities
- ✅ Remove individual items
- ✅ Clear entire cart
- ✅ Automatic cart persistence via localStorage
- ✅ Real-time cart count in header

### UI Features
- ✅ Loading states
- ✅ Error handling and display
- ✅ Success notifications
- ✅ Out of stock handling
- ✅ Variant selection integration
- ✅ Quantity selector

## API Integration

### Base URL Configuration

The API URL is configured via environment variable:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### API Endpoints Used

- `POST /cart` - Create cart
- `GET /cart?cart_id={uuid}` - Get cart details
- `POST /cart/items` - Add item to cart
- `PATCH /cart/items/{lineId}` - Update item quantity
- `DELETE /cart/items/{lineId}` - Remove item
- `DELETE /cart` - Clear cart

## Usage

### Using the Cart Context

```tsx
import { useCart } from '@/contexts/CartContext';

function Component() {
  const { cart, isLoading, error, addItem, updateQuantity, removeItem } = useCart();

  // Add item to cart
  await addItem(variantId, quantity);

  // Update quantity
  await updateQuantity(lineId, newQuantity);

  // Remove item
  await removeItem(lineId);

  // Access cart data
  console.log(cart?.lines_count); // Number of items
  console.log(cart?.total); // Total price
}
```

### Cart Provider Setup

The `CartProvider` is already wrapped around the entire app in `app/layout.tsx`:

```tsx
<CartProvider>
  {children}
</CartProvider>
```

## Cart Data Structure

### Cart Object
```typescript
{
  id: string;              // UUID
  currency_code: string;   // e.g., "USD"
  sub_total: string;       // Formatted price
  tax_total: string;       // Formatted price
  total: string;           // Formatted price
  lines: CartLine[];       // Array of cart items
  lines_count: number;     // Total number of items
}
```

### Cart Line (Item)
```typescript
{
  id: number;
  variant_id: number;
  quantity: number;
  unit_price: string;
  sub_total: string;
  total: string;
  product: {
    name: string;
    sku: string;
    thumbnail: string;
  }
}
```

## State Management

### Cart Initialization
- On app load, checks localStorage for existing cart ID
- If found, fetches cart from API
- If not found or cart doesn't exist, creates new cart
- Stores cart ID in localStorage for persistence

### Cart Operations
All cart operations are asynchronous and:
1. Update the backend via API
2. Update local state with the response
3. Handle errors gracefully
4. Show loading states

## Error Handling

The implementation includes comprehensive error handling:

- **API Errors**: Custom `CartAPIError` class with status codes
- **Network Errors**: Caught and displayed to users
- **Validation Errors**: Inline validation before API calls
- **User Feedback**: Error messages displayed in UI

## Testing the Implementation

### Prerequisites
1. Laravel backend running on `http://localhost:8000`
2. Cart API endpoints implemented and working
3. Next.js dev server running

### Test Flow
1. **Create Cart**: Automatically created on first visit
2. **Add Item**: Go to product page, select variant, click "Add to Cart"
3. **View Cart**: Navigate to `/cart` to see items
4. **Update Quantity**: Use +/- buttons on cart page
5. **Remove Item**: Click trash icon
6. **Clear Cart**: Click "Clear Cart" button

## Known Limitations

1. **Cart Expiration**: Cart UUID persists in localStorage but may expire on backend
2. **Multi-device Sync**: Cart is device-specific via localStorage
3. **Guest Checkout**: Current implementation is guest-only (no user accounts)

## Future Enhancements

- [ ] Merge carts on user login
- [ ] Cart sync across devices for authenticated users
- [ ] Wishlist integration
- [ ] Cart abandonment tracking
- [ ] Inventory validation before checkout
- [ ] Discount code support
- [ ] Shipping cost calculation

## Troubleshooting

### Cart not persisting
- Check localStorage in browser DevTools
- Verify cart_id is stored under key 'cart_id'

### API errors
- Check NEXT_PUBLIC_API_URL environment variable
- Verify backend is running
- Check browser console for detailed errors

### Items not adding
- Ensure variant_id is valid and exists in database
- Check product has stock available
- Verify API response format matches type definitions

## Environment Variables

Required environment variables in `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Support

For issues or questions:
1. Check browser console for errors
2. Verify API responses in Network tab
3. Review backend logs
4. Check cart data in localStorage
