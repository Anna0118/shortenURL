// import package
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");

require("./config/mongoose");
const URL = require("./models/url"); // load model
const shortURL = require("./shortURL"); // load function

const app = express();
const port = 3000;

app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({ extended: true }));

// setting routes
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  if (!req.body.url) return res.redirect("/");

  const EnNum = shortURL(5);
  const originalURL = req.body.url;

  URL.findOne({ originalURL })
    .then((data) =>
      data ? data : URL.create({ shortURL: EnNum, originalURL })
    )
    .then((data) =>
      res.render("index", {
        origin: req.headers.origin,
        shortURL: data.shortURL,
      })
    )
    .catch((error) => console.error(error));
});

app.get("/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL;
  URL.findOne({ shortURL })
    .then((data) => {
      if (!data) {
        res.render("error", {
          errorMsg: "Can't find the URL",
          errorURL: req.headers.host + "/" + shortURL,
        });
      }
      // when success, redirect to the original url
      res.redirect(data.originalURL);
    })
    .catch((error) => console.error(error));
});

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
