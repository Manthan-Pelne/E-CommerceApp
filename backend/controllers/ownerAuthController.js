
const bcrypt = require("bcrypt")
const OwnerModel = require("../models/ownerModel")




 const ownerSignup = (req,res)=>{
  const {bussinessName,email,password,role} = req.body
  try {
    bcrypt.hash(password, 4, async (err, hash) => {
      if (err) {
        res.send(err);
      } else {
        const owners = new OwnerModel({
          bussinessName,
          email,
          password: hash,
          role,
          products: [],
        });
        await owners.save();
        return res.send({ msg: "New owner registered", owner:{name : owners.bussinessName , email:owners.email} });
      }
    });
  } catch (error) {
   return res.status(400).send({ msg: "something went wrong", error: error });
  }
}





//  const ownerLogin =async(req,res)=>{
//   const {bussinessEmail,password} = req.body
//   const owner = await OwnerModel.findOne({bussinessEmail})
//   console.log(owner)
//   if(!owner){
//       res.status(400).send({"msg":"Register first"})
//       return
//   }
//   try {
//     const hashPass = owner?.password
//     bcrypt.compare(password,hashPass,(err,result)=>{
//       if(result){
//         const token2 = jwt.sign({ownerId : owner._id, role: owner.role},"bdtoken", {expiresIn : "180m"})
//         res.cookie("BDToken2",token2)
//        return res.status(200).send({msg : "login successfull", token2, owner:{id:owner._id, name : owner.bussinessName , email:owner.bussinessEmail} })
//       }else{
//        return res.status(400).send({"msg":"Wrong credentials"})
//       }
//     })
//   } catch (error) {
//     return res.status(400).send({"msg":"Something went wrong",error})
//   }
// }


const test2 = (req,res)=>{
  const data = req.cookies["BDToken"]
  try {
    res.send(data)
  } catch (error) {
    res.send(error)
  }
}





module.exports = {ownerSignup,test2}


