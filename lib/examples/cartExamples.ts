// Example cart API responses for testing and development

export const exampleCartEmpty = {
  "id": "9d3f5c8a-1b2e-4f3d-8a9b-1c2d3e4f5a6b",
  "currency_code": "USD",
  "sub_total": "$0.00",
  "tax_total": "$0.00",
  "total": "$0.00",
  "lines": [],
  "lines_count": 0
};

export const exampleCartWithItems = {
  "id": "9d3f5c8a-1b2e-4f3d-8a9b-1c2d3e4f5a6b",
  "currency_code": "USD",
  "sub_total": "$259.98",
  "tax_total": "$26.00",
  "total": "$285.98",
  "lines": [
    {
      "id": 456,
      "variant_id": 118,
      "quantity": 2,
      "unit_price": "$129.99",
      "sub_total": "$259.98",
      "total": "$285.98",
      "product": {
        "name": "Mechanical Keyboard",
        "sku": "KB-SM-BLK",
        "thumbnail": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400"
      }
    }
  ],
  "lines_count": 1
};

export const exampleCartMultipleItems = {
  "id": "9d3f5c8a-1b2e-4f3d-8a9b-1c2d3e4f5a6b",
  "currency_code": "USD",
  "sub_total": "$599.97",
  "tax_total": "$60.00",
  "total": "$659.97",
  "lines": [
    {
      "id": 456,
      "variant_id": 118,
      "quantity": 2,
      "unit_price": "$129.99",
      "sub_total": "$259.98",
      "total": "$285.98",
      "product": {
        "name": "Mechanical Keyboard",
        "sku": "KB-SM-BLK",
        "thumbnail": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400"
      }
    },
    {
      "id": 457,
      "variant_id": 125,
      "quantity": 1,
      "unit_price": "$89.99",
      "sub_total": "$89.99",
      "total": "$98.99",
      "product": {
        "name": "Wireless Mouse",
        "sku": "MS-WL-WHT",
        "thumbnail": "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400"
      }
    },
    {
      "id": 458,
      "variant_id": 142,
      "quantity": 5,
      "unit_price": "$49.99",
      "sub_total": "$249.95",
      "total": "$274.95",
      "product": {
        "name": "USB-C Cable",
        "sku": "CBL-USC-3M",
        "thumbnail": "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400"
      }
    }
  ],
  "lines_count": 3
};

// Error responses
export const errorCartNotFound = {
  "message": "Cart not found."
};

export const errorCartIdRequired = {
  "message": "cart_id is required."
};

export const errorValidation = {
  "message": "The given data was invalid.",
  "errors": {
    "variant_id": ["The variant id field is required."],
    "quantity": ["The quantity must be at least 1."]
  }
};

// Request examples
export const exampleAddItemRequest = {
  "cart_id": "9d3f5c8a-1b2e-4f3d-8a9b-1c2d3e4f5a6b",
  "variant_id": 118,
  "quantity": 2
};

export const exampleUpdateItemRequest = {
  "cart_id": "9d3f5c8a-1b2e-4f3d-8a9b-1c2d3e4f5a6b",
  "quantity": 5
};

export const exampleRemoveItemRequest = {
  "cart_id": "9d3f5c8a-1b2e-4f3d-8a9b-1c2d3e4f5a6b"
};
