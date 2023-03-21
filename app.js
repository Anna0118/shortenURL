// import package
const express = require("express");
const exphbs = require("express-handlebars"); // 告訴express, 要使用handlebars, 來解析html
const bodyParser = require("body-parser"); // 引用 body-parser

require("./config/mongoose");

const app = express();
const port = 3000;

app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({ extended: true }));

// setting routes
app.get("/", (req, res) => {
  res.render("index");
});


app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
