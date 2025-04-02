const Category = require("../models/categoryModel");
const Product = require("../models/productModel");

//@desc  Get and filter by category
//@route GET /api/products/category/:id
//@access public
const getProductsByCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const products = await Product.find({ category: category._id }).populate(
      "category"
    );

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

//@desc  Create category
//@route Post /api/category
//@access admin
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const category = await Category.create({
      name,
    });

    res.status(201).json(category);
    console.log(category);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//@desc  Update category
//@route PUT /api/category/:id
//@access admin
const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//@desc  Delete category
//@route DELETE /api/category/:id
//@access admin
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getProductsByCategory,
};
