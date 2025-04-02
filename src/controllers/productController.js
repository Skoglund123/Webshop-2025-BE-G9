const Product = require("../models/productModel");
const mongoose = require("mongoose");
const Category = require("../models/categoryModel");

//@desc  Get all products
//@route GET /api/products
//@access public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//@desc  Create new product with category validation
//@route POST /api/products
//@access admin
const createProduct = async (req, res) => {
  try {
    const data = Array.isArray(req.body) ? req.body : [req.body];

    for (const product of data) {
      if (!mongoose.Types.ObjectId.isValid(product.category)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }

      const categoryExists = await Category.findById(product.category);
      if (!categoryExists) {
        return res.status(404).json({ message: "Category not found" });
      }
    }

    const products = await Product.insertMany(data);
    res.status(201).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//@desc  Get single product
//@route GET /api/products/:id
//@access public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//@desc  Update product
//@route PUT /api/products/:id
//@access admin
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//@desc  Delete product
//@route DELETE /api/products/:id
//@access admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
