// Order types based on API documentation

export interface Order {
  id: number;
  reference: string;
  status_label: string;
  total: string;
  placed_at: string;
  lines_count: number;
}

export interface OrderAddress {
  id: number;
  first_name: string;
  last_name: string;
  company_name: string | null;
  line_one: string;
  line_two: string | null;
  line_three: string | null;
  city: string;
  state: string;
  postcode: string;
  country: string;
  country_id: number;
  contact_email: string | null;
  contact_phone: string | null;
  delivery_instructions: string | null;
}

export interface OrderProduct {
  name: string;
  sku: string;
  thumbnail: string;
}

export interface OrderLine {
  id: number;
  type?: 'physical' | 'shipping';
  variant_id?: number;
  quantity: number;
  unit_price: string;
  sub_total: string;
  total: string;
  description?: string;
  product?: OrderProduct;
  // Legacy/Fallback fields
  product_name?: string;
  thumbnail?: string;
  variant_name?: string;
}

export interface OrderDetail extends Order {
  status: string;
  currency_code: string;
  sub_total: string;
  tax_total: string;
  shipping_total: string;
  notes: string | null;
  lines: OrderLine[];
  shipping_address: OrderAddress;
  billing_address: OrderAddress;
  discount_total?: string;
}

export interface OrdersResponse {
  data: Order[];
  meta: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
}