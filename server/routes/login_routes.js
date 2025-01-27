const express = require("express");
const router = express.Router();
const loginController = require("../controllers/login_controller");

// router.get("/login_1", loginController.login);
// router.get("/signup", loginController.signup);
//router.post("/login_1", loginController.login_1_post);

// Render signup page
// router.get('/signup', (req, res) => {
//   res.render('signup'); // Assumes you have a signup.ejs file in your views directory
// });

// // Render login1 page
// router.get('/login_1', (req, res) => {
//   res.render('login_1'); // Assumes you have a login1.ejs file in your views directory
// });

// loginController.js

// exports.login_1 = (req, res) => {
//   // Handle GET request to /login_1
//   res.render('login_1'); // Render the login page
// };

// exports.login_1_post = (req, res) => {
//   // Handle POST request to /login_1
//   //res.render('login_1');
//   // Process login form submission
// };

// Route to render the login_1.ejs file
router.get("/login_1", (req, res) => {
  res.render("login_1"); // Assuming you have a login_1.ejs file in your views directory
});

// Route to handle the form submission for login_1
//router.get("/login_1",loginController.login_1_post)
router.post("/login_1", loginController.login_1_post);

// Route to render the signup.ejs file
router.get("/signup", (req, res) => {
  res.render("signup"); // Assuming you have a signup.ejs file in your views directory
});

// Route to handle the form submission for signup
//router.post("/signup", loginController.signup);


router.get("/home", (req, res) => {
  res.render("home");
});
router.get("/home2", (req, res) => {
  res.render("home2");
});
router.get("/profile",loginController.profile);
router.get("/logout",loginController.logout);

//router.post("/home", loginController.home);

module.exports = router;