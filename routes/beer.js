const express = require("express");
const { uploader, cloudinary } = require("../config/cloudinary.js");
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

// Search for a beer in the beer library page
router.post("/beer/beer-library", (req, res, next) => {
  const { queriedBeer } = req.body;
  Beer.find({ name: { $regex: queriedBeer, $options: "i" } })
    .then((Beer) => {
      if (Beer.length !== 0) {
        res.render("beer-details", { beer: Beer[0] });
      } else
        res.render("beer-library", {
          message:
            "We could not find any beers matching your search query. Try again please. ",
        });
    })
    .catch((error) => next(error));
});

// Get one single beer
router.get("/beer/create-beer", (req, res) => {
  const user = req.session.user;
  res.render("create-beer", { user: user });
});

router.post("/beer/create-beer", uploader.single("ImgPath"), (req, res) => {
  const user = req.session.user;

  const { name, type, description, price, alcoholPercentage } = req.body;

  let ImgPath;
  if (req.file?.path != undefined) {
    ImgPath = req.file.path;
  } else {
    ImgPath = "/images/default-beer.png";
  }

  Beer.create({
    name,
    type,
    description,
    price,
    alcoholPercentage,
    ImgPath,
  })
    .then((beer) => res.redirect("beer-library"))

    .catch((error) => console.log(error));
});

// Go to beer details
router.get("/beer/beer-details/:beerId", (req, res) => {
  const user = req.session.user;
  const isFav = user.favs.includes(req.params.beerId);
  Beer.findOne({ _id: req.params.beerId })
    .then((beer) =>
      res.render("beer-details", { beer: beer, user: user, isFav })
    )

    .catch((error) => console.log(error));
});

// Edit beer details (only admin)

// router.post("/beer/beer-details/:beerId", (req, res) => {
//   const user = req.session.user;
//   Beer.findOneAndUpdate({ _id: req.params.beerId }, req.body)
//     .then((beer) => res.render("beer-details", { beer: beer, user: user }))

//     .catch((error) => console.log(error));
// });

// Remove beer (only admin)
/* router.get("/beer/beer-details/:beerId/delete", (req, res) => {
  const user = req.session.user;
  Beer.findByIdAndDelete(req.params.beerId)

    .then(() => res.redirect("/beer/beer-library"))

    .catch((error) => console.log(error));
}); */

router.get("/beer/beer-details/:beerId/delete", (req, res) => {
  const user = req.session.user;
  Beer.findByIdAndDelete(req.params.beerId)

    .then((deletedBeer) => {
      if (deletedBeer.ImgPath) {
        // delete the image on cloudinary
        cloudinary.uploader.destroy(deletedBeer.publicId);
      }
      res.redirect("/");
    })

    .catch((error) => console.log(error));
});

// Edit beer (only admin)
router.get("/beer/:beerId/edit-beer", (req, res, next) => {
  const beerId = req.params.beerId;
  const beerTypes = Beer.schema.path("type").enumValues;
  Beer.findById(beerId)
    .then((beer) => {
      console.log(beer);
      res.render("edit-beer", { beer: beer, beerTypes: beerTypes });
    })
    .catch((err) => next(err));
});

router.post(
  "/beer/:beerId/edit-beer",
  uploader.single("ImgPath"),
  (req, res, next) => {
    const { name, type, description, price, alcoholPercentage } = req.body;

    let ImgPath;
    if (req.file?.path != undefined) {
      ImgPath = req.file.path;
    } else {
      ImgPath = "/images/default-beer.png";
    }

    Beer.findByIdAndUpdate(req.params.beerId, {
      name,
      type,
      description,
      price,
      alcoholPercentage,
      ImgPath,
    })
      .then(() => {
        res.redirect(`/beer/beer-details/${req.params.beerId}`);
      })
      .catch((err) => next(err));
  }
);

// FAVS

router.get("/beer/add-fav/:beerId", (req, res) => {
  const user = req.session.user;
  let favs = user.favs || [];
  const beerId = req.params.beerId;

  if (favs.includes(beerId)) {
    favs = favs.filter((fav) => fav !== beerId);
  } else {
    favs.push(req.params.beerId);
  }

  req.session.user.favs = favs;

  const backURL = req.header("Referer") || "/";

  console.log(user);

  User.findByIdAndUpdate(user._id, {
    favs,
  })
    .then((user) => {
      console.log("user updated to ", user);
      res.redirect(backURL);
    })
    .catch((error) => console.log(error));
});

module.exports = router;
