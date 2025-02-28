const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "owner" }, // Reference to owner
});

const ProductModel = mongoose.model("product", productSchema);

module.exports = ProductModel