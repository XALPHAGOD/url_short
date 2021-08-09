const express = require("express");
const mongoose = require("mongoose");
const shortUrlModel = require("./models/shortUrl");

const app = express();

const connect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/url_short", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected...");
  } catch (err) {
    console.log(err);
  }
};
connect();

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.get("/", async (req, res) => {
  try {
    const resp = await shortUrlModel.find();
    // console.log(resp);
    res.render("index", { data: resp });
  } catch (err) {
    console.log(err);
  }
});

app.get("/:shortUrl", async (req, res) => {
  try {
    const resp = await shortUrlModel.findOne({ short: req.params.shortUrl });
    // console.log(resp);
    res.redirect(resp.full);
  } catch (err) {
    console.log(err);
  }
});

app.post("/shorten", async (req, res) => {
  try {
    const resp = await shortUrlModel.create({
      full: req.body.fullURL,
    });
    // console.log(resp);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.listen(process.env.PORT || 3000);
