const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const beerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["IPA", "Lager", "Stout", "Bock Beer"],
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  ImgPath: String,
  alcoholPercentage: {
    type: String,
    required: true,
  },
});

const Beer = model("Beer", beerSchema);

module.exports = Beer;
