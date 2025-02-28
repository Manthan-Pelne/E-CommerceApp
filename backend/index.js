const express = require('express');
require('dotenv').config();
const app = express();
const connectDB = require('./database');
const {router } = require('./routes/route');
const {routes} = require('./client-routes/route');

const cookies = require("cookie-parser");
const nunjucks = require("nunjucks")
const minifyHTML = require("express-minify-html-2")
const minify = require("express-minify")
const path = require('path');


const cors = require("cors");

app.use(cors({
    origin: "*",  // Your frontend URL
    credentials: true  // Allows sending cookies
}));

app.use(express.json());
app.use(cookies());
app.use(express.urlencoded({ extended: true }));



app.use("/api", router)




app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname, + "backend", "/client-routes", "/views"));

app.use(
  minifyHTML({
    override: true,
    exception_url: false,
    htmlMinifier: {
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: false,
      removeEmptyAttributes: true,
      minifyJS: true,
    },
  })
);

app.use(
  minify({
    cache: false,
    uglifyJsModule: null,
    errorHandler: null,
    jsMatch: /js/,
    cssMatch: /css/,
  })
);

function setUpNunjucks() {
  nunjucks.configure('views', {
    autoescape: true,
    express: app,
    noCache: true
  });
}

app.set('view engine', 'html');
app.use("/",routes)


app.get("/:page", (req, res) => {
  const page = req.params.page;
  res.render(page);  // Ensure pages exist
});




// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*"); // Replace with your frontend origin
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader("Origin-Allow-Credentials","true");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   next();
// });


setUpNunjucks();

app.listen(process.env.port, async() => {
  await connectDB();
  console.log('Server listening on port: ', process.env.port);
});
