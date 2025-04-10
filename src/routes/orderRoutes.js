const express = require("express");
const router = express.Router();
const {
  getOrders,
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
  getSortedOrders,
} = require("../controllers/orderController");

router.get("/sorted", getSortedOrders);
router.get("/", getOrders);
router.post("/", createOrder);
router.get("/:id", getOrderById);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

module.exports = router;
