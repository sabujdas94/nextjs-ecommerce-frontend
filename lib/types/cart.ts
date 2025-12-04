// Cart types based on API documentation

export interface CartLine {
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
  };
}

export interface Cart {
  id: string; // UUID
  currency_code: string;
  sub_total: string;
  tax_total: string;
  total: string;
  lines: CartLine[];
  lines_count: number;
}

export interface CreateCartRequest {
  cart_id?: string;
}

export interface AddItemRequest {
  cart_id: string;
  variant_id: number;
  quantity?: number;
}

export interface UpdateItemRequest {
  cart_id: string;
  quantity: number;
}

export interface RemoveItemRequest {
  cart_id: string;
}

export interface ClearCartRequest {
  cart_id: string;
}

export interface CartErrorResponse {
  message: string;
}
