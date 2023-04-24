const router = require("express").Router();
const User = require("../models/User.model")
const bcrypt = require("bcrypt");
//GET route to display the login page to users
router.get("/auth/signup", (req, res, next) => {
    res.render("signup")
})
//POST route to process the sign up form data
router.post('/signup', (req, res, next) => {
    const { username, password } = req.body
    if (username === "") {
        res.render("signup", { message: "The username cannot be empty" })
        return
    }
    if (password.length < 8) {
        res.render("signup", { message: "Your passowrd must be at least 8 characters in length" })
        return
    }
    User.findOne({ username })
        .then(userFromDB => {
            console.log(userFromDB)
            if (userFromDB !== null) {
                res.render("signup", { message: "Username is already taken. Please choose another username." })
            } else {
                const salt = bcrypt.genSaltSync()
                const hash = bcrypt.hashSync(password, salt)
                User.create({ username: username, password: hash })
                    .then(createdUser => {
                        console.log(createdUser);
                        res.redirect("/auth/login")
                    })
                    .catch(err => { next(err) })
            }
        })
})
//GET route to display the login page
router.get("/login"), (req, res, next) => {
    res.render("login")
}
//POST route to process the login form data
router.post("/auth/login", (req, res, next) => {
    const { username, password } = req.body
    User.findOne({ username })
        .then(userFromDB => {
            if (userFromDB === null) {
                res.render("login", { message: "Wrong credentials" })
                return
            }
            if (bcrypt.compareSync(password, userFromDB.password)) {
                req.session.user = userFromDB
                req.session.user.password = null
                res.redirect("/profile")
                console.log("This is the session: ".req.session)
            } else {
                res.render("login", { message: "Wrong credentials" })
                return
            }
        })
})
module.exports = router