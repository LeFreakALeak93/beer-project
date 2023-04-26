const express = require("express");

const router = require("express").Router()
const User = require("../models/User.model")
const Beer = require("../models/Beer.model")

// Go to beer library
router.get("/beer/beer-library", (req, res, next) => {
  Beer.find()
    .then(beersfromDB => {
      res.render("beer-library", { beers: beersfromDB })
    })
    .catch(err => next(err))
});

// Get one single beer
router.get("/beer/create-beer", (req, res) => {
  res.render("create-beer")

});

// Create new beer
router.post("/beer/create-beer", (req, res) => {
  Beer.create(req.body)
    .then((beer) =>
      res.render("create-beer", { beer: beer }))

    .catch((error) => console.log(error));
});

// Go to beer details
router.get("/beer/beer-details/:beerId", (req, res) => {
  Beer.findOne({ _id: req.params.beerId })
    .then((beer) =>
      res.render("beer-details", { beer: beer }))

    .catch((error) => console.log(error));
});


// Edit beer details (only admin)
router.post("/beer/beer-details/:beerId", (req, res) => {
  Beer.findOneAndUpdate(
    { _id: req.params.albumId },
    req.body,
  )
    .then((beer) =>
      res.render("beer-details", { beer: beer }))

    .catch((error) => console.log(error));
});

// Remove beer (only admin)
router.post("/beer/beer-details/:beerId/delete", (req, res) => {
  Beer.findByIdAndDelete(req.params.albumId)

    .then(() =>
      res.render("beer-details"))

    .catch((error) => console.log(error));
});



module.exports = router
