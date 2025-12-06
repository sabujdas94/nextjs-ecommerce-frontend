// Order types based on API documentation

export interface Order {
  id: number;
  reference: string;
  status_label: string;
  total: string;
  placed_at: string;
  lines_count: number;
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