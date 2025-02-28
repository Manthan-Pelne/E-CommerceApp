const  jwt = require("jsonwebtoken")
const UserModel = require("../models/userModel");
const OwnerModel = require("../models/ownerModel");


 const userAuthentication = (req,res,next)=>{

    const token = req.cookies.AuthToken
    if(token){
        jwt.verify(token,"bdtoken", async (err, decoded) => {
            if (decoded) {
                req.body.user = decoded.userid
                //console.log(decoded)
                req.user = await UserModel.find({ _id: decoded.userId })
                req.owner = await OwnerModel.find({ _id: decoded.userId })
                //console.log(req.user)
                next()
            }
            else {
                return res.status(400).send({"msg":"Please login first"})
            }
        });
    }else{
        return res.status(400).send({"msg":"Please login first"})
    }
}


// const ownerAuthentication = async(req,res,next)=>{
//     const token = req.headers.authorization
//     if(token){
//         jwt.verify(token,"bdtoken", async (err, decoded) => {
//             if (decoded) {
//                 req.body.owner = decoded.ownerid
//                 //console.log(decoded)
//                 req.owner = await OwnerModel.find({ _id: decoded.ownerId })
//                 //console.log(req.user)
//                 next()
//             }
//             else {
//                 return res.status(400).send({"msg":"Please login first"})
//             }
//         });
//     }else{
//         return res.status(400).send({"msg":"Please login first"})
//     }
// }




module.exports = {userAuthentication}
