const express = require("express");
const {
  getProducts,
  getSpecificProduct,
  postProduct,
} = require("../controllers/products.controllers");

const router = express();
router.get("/", getProducts);
router.get("/:id", getSpecificProduct);
router.post("/", postProduct);

module.exports = router;
