// controller/authController.js
const OwnerModel = require("../models/ownerModel");
const ProductModel = require("../models/productModel");
const UserModel = require("../models/userModel");

const addProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    console.log(req.owner)
    const userId = req.owner[0]._id; // Ensure this is correct

    if (!userId) {
      return res.status(400).json({ message: "User ID is missing" });
    }

    // Create a new product
    const newProduct = new ProductModel({
      name,
      price,
      description,
      owner: userId,
    });

    const savedProduct = await newProduct.save();
    //console.log("Saved Product:", savedProduct); // Debugging

    // Update the user's product list (ensure products field is an array of ObjectIds)
    const updatedUser = await OwnerModel.findByIdAndUpdate(
      userId,
      { $push: { products: savedProduct._id } }, // Use savedProduct._id
      { new: true } // Return the updated document
    );

    res.status(201).json({
      message: "Product added successfully",
      product: savedProduct,
      owner: updatedUser._id, // Send updated user for debugging
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Error adding product", error });
  }
};



//all products
const fetchProduct = async (req, res) => {
  try { 
    const products = await ProductModel.find();
    res.status(200).send(products); 
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error fetching products", error });
  }
};





//dashboard products display of respective owners
const ownersProducts = async (req, res) => {
  try {
    const ownerProducts = await OwnerModel.find()
      .select("-password")
      .populate("products");
    return res.status(200).send(ownerProducts);
  } catch (error) {
    return res.status(400).send(error);
  }
};




//individual owner's products
const myProduct = async (req, res) => {
  try {
    //console.log(req.user)
    const user = await OwnerModel.findById(req.owner[0].id).populate("products");
    res.json(user.products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};




//search products
const searchProducts = async (req, res) => {
  try {
    const { name, sort } = req.query;

    let filter = {};
    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    let sortOption = {};
    if (sort === "asc") {
      sortOption.price = 1; // Ascending order (low to high)
    } else if (sort === "desc") {
      sortOption.price = -1; // Descending order (high to low)
    }

    const searchResult = await ProductModel.find(filter).sort(sortOption);

    return res.status(200).json(searchResult);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};




module.exports = {
  addProduct,
  fetchProduct,
  myProduct,
  ownersProducts,
  searchProducts,
};
