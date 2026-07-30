# API Reference

Base URL: `http://localhost:5000` (development) | `https://shivamelectronic.onrender.com` (production)

---

## Authentication

### POST `/api/auth/register`
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response (201):**
```json
{
  "success": true,
  "user": { "id": "...", "name": "John Doe", "email": "john@example.com" },
  "token": "jwt-token-here"
}
```

### POST `/api/auth/login`
Login and receive a JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response (200):**
```json
{
  "success": true,
  "user": { "id": "...", "name": "John Doe", "email": "john@example.com" },
  "token": "jwt-token-here"
}
```

### POST `/api/auth/forgot-password`
Send OTP to user's email for password reset.

### POST `/api/auth/reset-password`
Reset password using OTP verification.

---

## Products

### GET `/api/products`
Retrieve all products.

**Response (200):**
```json
[
  {
    "_id": "...",
    "name": "Product Name",
    "description": "Product description",
    "price": 1999,
    "category": "category-id",
    "image": "https://cloudinary.com/...",
    "isHot": true,
    "rating": 4.5
  }
]
```

### POST `/api/products`
Create a new product (Admin only).

**Headers:** `Authorization: Bearer <jwt-token>`

**Request:** `multipart/form-data` with image file

### PUT `/api/products/:id`
Update a product (Admin only).

### DELETE `/api/products/:id`
Delete a product (Admin only).

---

## Categories

### GET `/api/categories`
Retrieve all categories.

**Response (200):**
```json
[
  { "_id": "...", "name": "Cables & Power Cords", "image": "https://..." }
]
```

### POST `/api/categories`
Create a new category (Admin only).

### PUT `/api/categories/:id`
Update a category (Admin only).

### DELETE `/api/categories/:id`
Delete a category (Admin only).

---

## Orders

### POST `/api/orders`
Place a new order/quote request.

**Request Body:**
```json
{
  "userId": "user-id",
  "items": [
    { "productId": "product-id", "quantity": 2 }
  ],
  "shippingAddress": "123 Main St, City"
}
```

### GET `/api/orders/:userId`
Get all orders for a specific user.

---

## Error Responses

All errors follow this format:
```json
{
  "success": false,
  "message": "Error description"
}
```

| Code | Description          |
| ---- | -------------------- |
| 400  | Bad Request          |
| 401  | Unauthorized         |
| 403  | Forbidden            |
| 404  | Not Found            |
| 500  | Internal Server Error|
