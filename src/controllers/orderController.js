const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const mongoose = require("mongoose");

// @desc    Get all orders
// @route   GET /api/orders
// @access  Admin
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate(
      "products.productId",
      "name price"
    );
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Create a new order
// @route   POST /api/orders
// @access  Public
const createOrder = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      streetAddress,
      postalCode,
      city,
      email,
      phoneNumber,
      products,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !streetAddress ||
      !postalCode ||
      !city ||
      !email ||
      !phoneNumber ||
      !Array.isArray(products) ||
      products.length === 0
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const order = await Order.create({
      firstName,
      lastName,
      streetAddress,
      postalCode,
      city,
      email,
      phoneNumber,
      products,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.log(error);
  }
};

//@desc Get orders sorted by status and latest first
//@route GET /api/orders/sorted
//@access admin
const getSortedOrders = async (req, res) => {
  const { status } = req.query;

  try {
    const filter = status ? { status } : {};

    const orders = await Order.find(filter).sort({ createdAt: -1 });

    if (orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found with the specified status." });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Admin
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "products.productId",
      "name price"
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update order
// @route   PUT /api/orders/:id
// @access  Admin
const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    ).populate("products.productId", "name price");

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Admin
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getOrders,
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
  getSortedOrders,
};
