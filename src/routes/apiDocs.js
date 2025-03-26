const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    name: "Hakim Livs API",
    version: "1.0.0", 
    endpoints: {
      auth: {
        "POST /api/auth/register": "Register a new user",
        "POST /api/auth/login": "Login with username and password"
      },
      products: {
        "GET /api/products": "Get all products",
        "GET /api/products/:id": "Get a single product by ID",
        "POST /api/products": "Create a new product (Admin only)",
        "PUT /api/products/:id": "Update a product (Admin only)",
        "DELETE /api/products/:id": "Delete a product (Admin only)"
      }
    },
    authentication: "Use Bearer token in Authorization header for protected routes"
  });
});

module.exports = router;
