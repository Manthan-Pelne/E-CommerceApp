const express = require("express")

const routes = express.Router();

routes.get("/", (req, res) => {
    res.render("index");
});

routes.get("/signup", (req, res) => {
    res.render("signup");
});

routes.get("/login", (req, res) => {
    res.render("login");
});

routes.get("/products/", (req, res) => {
    res.render("product");
});

routes.get("/admin/dashboard/", (req, res) => {
    res.render("admin-dashboard");
});

routes.get("/owner/dashboard/", (req, res) => {
    res.render("owner-dashboard");
});

routes.get("/userdata/", (req, res) => {
    res.render("userdata");
});


module.exports = {routes}

