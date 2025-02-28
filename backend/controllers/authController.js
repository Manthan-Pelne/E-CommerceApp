// controller/authController.js
const  jwt = require("jsonwebtoken")
const UserModel = require("../models/userModel")
const bcrypt = require("bcrypt")
const OwnerModel = require("../models/ownerModel")




 const signup = (req,res)=>{
  const {username,email,password,role} = req.body
  try {
    bcrypt.hash(password, 4, async (err, hash) => {
      if (err) {
        res.send(err);
      } else {
        const users = new UserModel({
        username,
          email,
          password: hash,
          role,
        });
        await users.save();
        return res.send({ msg: "New user registered", user:{name : users.username , email:users.email} });
      }
    });
  } catch (error) {
   return res.status(400).send({ msg: "something went wrong", error: error });
  }
}





const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in UserModel (for regular users)
    let user = await UserModel.findOne({ email });

    // If not found, check in OwnerModel (for business owners)
    let isOwner = false;
    if (!user) {
      user = await OwnerModel.findOne({ email });
      isOwner = !!user; // If found in OwnerModel, set isOwner to true
    }

    // If user is still not found, return error
    if (!user) {
      return res.status(400).json({ msg: "Register first" });
    }

    // Compare password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Wrong credentials" });
    }

    // Generate JWT token with user ID & role
    const token = jwt.sign(
      { userId: user._id, role: isOwner ? "owner" : "user" }, // Assign correct role
      "bdtoken",
      { expiresIn: "180m" }
    );

    // Set cookie with token
    res.cookie("AuthToken", token, { httpOnly:true ,secure:false, path:"/"});
    // Send response with user data
    return res.status(200).json({
      msg: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.username || user.bussinessName, // Show correct name field
        email: user.email, // Show correct email field
        role:user.role
      },
    });
  } catch (error) {
    //console.error("Login Error:", error);
    return res.status(500).json({ msg: "Something went wrong"},error);
  }
};



const test = (req,res)=>{
  const data = req.cookies.AuthToken
  console.log(req.cookies)
  try {
    res.send(data)
  } catch (error) {
    res.send(error)
  }
}


const userData = async(req,res)=>{
  try {
    const users = await UserModel.find()
    res.status(200).send(users)
  } catch (error) {
    res.status(400).send(error)
  }
}




 const logout=(req,res)=>{

}


module.exports = {signup,login,test, userData, logout}



// export const addData = async(req,res)=>{
//   const {data} = req.body
//       const newData = new dataModel({data})
//      await newData.save()
//      res.send("data added")
// }



// export const getData = async(req,res)=>{
//       const newData = await dataModel.find()
//      res.send(newData)
// }

