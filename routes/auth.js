const router = require("express").Router()
const User = require("../models/User.model")
const bcrypt = require("bcrypt")

router.get("/auth/signup", (req, res, next) => {
    res.render("signup")
})

router.post("/auth/signup", (req, res, next) => {
    const { username, password } = req.body

    // Validation
    // Check if username is empty
    if (username === "") {
        res.render("signup", { message: "Username cannot be empty" })
        return
    }

    if (password.length < 4) {
        res.render("signup", { message: "Password has to be minimum 4 characters" })
        return
    }

    // Validation passed
    // Check if username is already taken
    User.find({ username: username })
        .then(userFromDB => {
            console.log(userFromDB)
            if (userFromDB.length !== 0) {
                res.render("signup", { message: "Username is already taken" })

            } else {
                // Username is available
                // Hash password
                console.log("Im here")
                const salt = bcrypt.genSaltSync()
                const hash = bcrypt.hashSync(password, salt)

                // Create user
                User.create({ username, password: hash })
                    .then(createdUser => {
                        res.redirect("/auth/login")
                    })
                    .catch(err => next(err))
            }
        })
})

router.get("/auth/login", (req, res, next) => {
    res.render("login")
})

router.post("/auth/login", (req, res, next) => {
    const { username, password } = req.body

    // Find user in database by username
    User.findOne({ username })
        .then(userFromDB => {
            if (!userFromDB) {
                // User not found in database => Show login form
                res.render("login", { message: "Wrong credentials" })
                return
            }

            // User found in database
            // Check if password from input form matches hashed password from database
            if (bcrypt.compareSync(password, userFromDB.password)) {
                // Password is correct => Login user
                req.session.user = userFromDB
                req.session.user.password = null
                console.log("This is the session: ", req.session)
                res.render("profile")
            } else {
                res.render("login", { message: "Wrong credentials" })
                return
            }
        })
})

module.exports = router;
