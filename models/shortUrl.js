const mongoose = require("mongoose");
const shortid = require("shortid");
// const nanoid = require("nanoid"); // nanoid.nanoid()

const shortUrlSchema = new mongoose.Schema({
  full: { type: String, required: true },
  short: { type: String, required: true, default: shortid.generate },
});

const shortUrlModel = mongoose.model("shortUrl", shortUrlSchema);
module.exports = shortUrlModel;
