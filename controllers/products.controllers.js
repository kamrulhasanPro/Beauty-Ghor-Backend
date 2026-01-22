// ------------products---------------

const { ObjectId } = require("mongodb");
const { productsCollection } = require("../config/collections");

// get all products
const getProducts = async (req, res) => {
  try {
    const result = await productsCollection().find().toArray();
    res.json(result);
  } catch (error) {
    console.log("Products find problem", error);
    res.status(500).json({
      message: "products find problem",
    });
  }
};

// get a specific product
const getSpecificProduct = async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const result = await productsCollection().findOne(query);
    res.json(result);
  } catch (error) {
    console.log("Specific products find problem", error);
    res.status(500).json({
      message: "Specific product find problem",
    });
  }
};

// post product
const postProduct = async (req, res) => {
  try {
    const product = req.body;
    const result = await productsCollection().insertOne(product);
    res.json(result);
  } catch (error) {
    console.log("Product post problem", error);
    res.status(500).json({
      message: "Product post problem",
    });
  }
};

module.exports = { getProducts, getSpecificProduct, postProduct };
