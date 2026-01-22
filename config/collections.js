const { getDB } = require("./db");

const getCollection = (name) => {
  const db = getDB();
  return db.collection(name);
};

const productsCollection = () => getCollection("products");

module.exports = { productsCollection };
