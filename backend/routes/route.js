const express = require("express");
const authController = require("../controllers/authController");
const ownerAuthController = require("../controllers/ownerAuthController");
const productController = require("../controllers/productController");
const { checkRole } = require("../middlewares/roleMiddleware");
const {  userAuthentication } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/signup", authController.signup);

router.post("/login", authController.login);


// router.post("/owner-login", ownerAuthController.ownerLogin);

router.post("/owner-signup", ownerAuthController.ownerSignup);

router.post("/add-products",userAuthentication, checkRole(["owner"]), productController.addProduct);

router.get("/fetch-products",userAuthentication, checkRole(["user","admin", "owner"]), productController.fetchProduct);

router.get("/my-products",userAuthentication, checkRole(["owner"]), productController.myProduct);

router.get("/owners-products",userAuthentication, checkRole(["admin"]), productController.ownersProducts);

router.get("/search-products",userAuthentication, checkRole(["user","admin","owner"]), productController.searchProducts);

router.get("/test", userAuthentication, checkRole(["owner"]),  authController.test);

router.get("/consumers", userAuthentication, checkRole(["admin"]),  authController.userData);

//
router.get("/", (req, res) => {
    res.render("index");
});




module.exports = {router}