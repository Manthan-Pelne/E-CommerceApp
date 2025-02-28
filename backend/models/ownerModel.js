const mongoose = require("mongoose");
const ownerSchema = new mongoose.Schema({
  bussinessName: {
    type: String,
    required: [true, "Please provide a ownername"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  role: {
    type: String,
    enum: ["owner", "admin"],
    default: "owner",
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],
});

const OwnerModel = mongoose.model("owner", ownerSchema);
module.exports = OwnerModel;
