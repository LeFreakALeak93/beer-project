const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware/is-logged-in");

/* GET home page */
router.get("/", (req, res, next) => {
  const user = req.session.user;
  res.render("index", { user: user });
});

router.get("/about", (req, res, next) => {
  const user = req.session.user;
  res.render("about", { user: user });
});

router.get("/contact", (req, res, next) => {
  const user = req.session.user;
  res.render("contact", { user: user });
});

router.get("/profile", isLoggedIn, (req, res, next) => {
  const user = req.session.user;
  res.render("profile", { user: user });
});

module.exports = router;
