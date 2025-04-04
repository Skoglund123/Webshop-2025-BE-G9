const express = require("express");
const router = express.Router();
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getProductsByCategory,
  getCategory,
} = require("../controllers/categoryController");

router.get("/", getCategory);
router.get("/:id/products", getProductsByCategory);

router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
