const Product = require("../models/productModel");

//@desc  Get all products or filter by category
//@route GET /api/products
//@access public
const getProducts = async (req, res) => {
  try {
    const { category } = req.query;
    let filter = {};
    
    if (category) filter.category = category; 

    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//@desc  Create new product
//@route POST /api/products
//@access admin
const createProduct = async (req, res) => {
  try {
    const { name, category, price, description, brand } = req.body;
    if (!name || !category || !price || !brand || !description) {
      return res.status(400).json({ message: "Name, category, price, and brand are required" });
    }

    const product = await Product.create({ name, category, price, description, brand });
    res.status(201).json(product);
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

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
