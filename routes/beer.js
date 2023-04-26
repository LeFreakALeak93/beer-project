const express = require("express");

const router = require("express").Router();
const User = require("../models/User.model");
const Beer = require("../models/Beer.model");

// Go to beer library
router.get("/beer/beer-library", (req, res, next) => {
  const user = req.session.user;
  Beer.find()
    .then((beersfromDB) => {
      res.render("beer-library", { beers: beersfromDB, user: user });
    })
    .catch((err) => next(err));
});

// Get one single beer
router.get("/beer/create-beer", (req, res) => {
  const user = req.session.user;
  res.render("create-beer", { user: user });
});

// Create new beer
router.post("/beer/create-beer", (req, res) => {
  const user = req.session.user;
  Beer.create(req.body)
    .then((beer) => res.redirect("/beer/beer-library"))

    .catch((error) => console.log(error));
});

// Go to beer details
router.get("/beer/beer-details/:beerId", (req, res) => {
  const user = req.session.user;
  Beer.findOne({ _id: req.params.beerId })
    .then((beer) => res.render("beer-details", { beer: beer, user: user }))

    .catch((error) => console.log(error));
});

// Edit beer details (only admin)

router.post("/beer/beer-details/:beerId", (req, res) => {
  const user = req.session.user;
  Beer.findOneAndUpdate({ _id: req.params.beerId }, req.body)
    .then((beer) => res.render("beer-details", { beer: beer, user: user }))

    .catch((error) => console.log(error));
});

// Remove beer (only admin)
router.get("/beer/beer-details/:beerId/delete", (req, res) => {
  const user = req.session.user;
  Beer.findByIdAndDelete(req.params.beerId)

    .then(() => res.redirect("/beer/beer-library"))

    .catch((error) => console.log(error));
});

module.exports = router;
