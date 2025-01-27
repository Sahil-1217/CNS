const Customer = require("../models/employee");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { employee } = require("./employee_controller");

exports.login = async (req, res) => {
  console.log("First step");
  try {
    const user = await Customer.findOne({ UserID: req.body.UserID });
    if (!user) {
      return res.send("Username not found");
    }
    console.log("second step");

    const isPasswordMatch = await bcrypt.compare(req.body.PassWord, user.PassWord);
    if (!isPasswordMatch) {
      return res.send("Incorrect password");
    }
    console.log("third step");

    // Set loggedIn session variable to true
    req.session.logged = user.role === "admin" ? 2 : 1;
    if (req.session.logged === 2) {
      return res.redirect("/home");
    } else {
      return res.redirect("/home2");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
};


exports.login_1_post = async (req, res) => {
  try {
    const user = await Customer.findOne({ UserID: req.body.UserID });
    if (!user) {
      return res.send("Username not found");
    }

    const isPasswordMatch = await Customer.findOne({ PassWord: req.body.PassWord });
    if (!isPasswordMatch) {
      return res.send("Incorrect password");
    }

    if (user.PassWord === "admin") { // Compare user's password against "admin"
      // Set loggedIn session variable to true
      req.session.logged = 2;
      return res.redirect("/home"); // Redirect to home if password is "admin"
    } else {
      // Redirect to profile page if password is not "admin"
       req.session.logged = 1;
      return res.redirect("/home2");
    }

  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
};




// exports.signup = async (req, res) => {
//   const { username, password, firstName, lastName, email, role } = req.body;

//   try {
//     // Check if the username already exists in the database
//     const existingUser = await Customer.findOne({ name: username });
//     if (existingUser) {
//       return res.send('User already exists. Please choose a different username.');
//     }

//     // Hash the password using bcrypt
//     const saltRounds = 10; // Number of salt rounds for bcrypt
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     // Create a new user document
//     const newUser = new Customer({
//       name: username,
//       password: hashedPassword,
//       personalInfo: {
//       firstName: firstName,
//       lastName: lastName,
//       email: email,
//       role: role
//       }
//     });

//     // Save the new user to the database
//     await newUser.save();

//     return res.render("login");
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send("Server error");
//   }
// };


exports.profile = async (req, res) => {
  // Render the profile.ejs file without passing any data
  res.render('layouts/profile');
};


exports.home2 = async (req, res) => {
  const locals = {
    title: "About",
    description: " ",
  };

  try {
    res.render("home2", locals);
  } catch (error) {
    console.log(error);
  }
};


exports.logout = async (req, res) => {
  try {
    // Destroy the session
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error logging out");
      }
      // Redirect to the dashboard page
      return res.redirect("/dashboard");
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
};
