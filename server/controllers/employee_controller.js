const Customer = require("../models/employee");
const mongoose = require("mongoose");

//here we are adding a new employee

exports.addCustomer_emp = async (req, res) => {
  const locals = {
    title: "Add New  - NodeJs",
    description: " NodeJs  Management System",
  };

  res.render("employess_data/add1", locals);
};

/**
 * POST /
 * Create New Customer
 */

///here  we are using express validator for the props
exports.postCustomer_emp = async (req, res) => {
  console.log(req.body);

  const newCustomer = new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    UserID: req.body.UserID,
    PassWord: req.body.PassWord,
    details: req.body.details,
    tel: req.body.tel,
    // Role:req.bodt.Role,
    email: req.body.email,
  });

  try {
    await Customer.create(newCustomer);
    await req.flash("info", "New customer has been added.");

    res.redirect("employee");
  } catch (error) {
    console.log(error);
  }
};


// exports.employee = async (req, res) => {
//   // Remove
//   // const messages = await req.consumeFlash('info');
//   // Use this instead
//   const messages = await req.flash("info");

//   const locals = {
//     title: "NodeJs",
//     description: "Free NodeJs User Management System",
//   };

//   let perPage = 12;
//   let page = req.query.page || 1;

//   try {
//     const empData = await Sites_info.aggregate([{ $sort: { createdAt: -1 } }])
//       .skip(perPage * page - perPage)
//       .limit(perPage)
//       .exec();
//     // Count is deprecated. Use countDocuments({}) or estimatedDocumentCount()
//     // const count = await Customer.count();
//     const count = await Sites_info.countDocuments({});

//     res.render("employee", {
//       locals,
//       customers,
//       current: page,
//       pages: Math.ceil(count / perPage),
//       messages,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

/**
 * GET /
 * Customer Data view
 */
exports.view1 = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id });

    const locals = {
      title: "View  Data",
      description: " NodeJs  Management System",
    };

    res.render("employess_data/view1", {
      locals,
      customer,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Get /
 * Search Customer Data
 */
exports.Search_emp = async (req, res) => {
  const locals = {
    title: "Search  Data",
    description: " NodeJs  Management System",
  };

  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const customers = await Customer.find({
      $or: [
        { firstName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { lastName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("emp_search", {
      customers,
      locals,
    });
  } catch (error) {
    console.log(error);
  }
};


exports.employee = async (req, res) => {
  // Remove
  // const messages = await req.consumeFlash('info');
  // Use this instead
  const messages = await req.flash("info");

  const locals = {
    title: "NodeJs",
    description: " NodeJs  Management System",
  };

  let perPage = 12;
  let page = req.query.page || 1;

  try {
    const empData = await Customer.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    // Count is deprecated. Use countDocuments({}) or estimatedDocumentCount()
    // const count = await Customer.count();
    const count = await Customer.countDocuments({});
    res.render("employee", {
      locals,
      empData,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
    });
  } catch (error) {
    console.log(error);
  }
};


exports.deleteCustomer = async (req, res) => {
  try {
    await Customer.deleteOne({ _id: req.params.id });
    res.redirect("/employee");
  } catch (error) {
    console.log(error);
  }
};

exports.edit = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id });

    const locals = {
      title: "Edit  Data",
      description: " NodeJs  Management System",
    };

    res.render("employess_data/edit1", {
      locals,
      customer,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * Update Customer Data
 */
exports.editPost = async (req, res) => {
  try {
    await Customer.findByIdAndUpdate(req.params.id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      UserID: req.body.UserID,
      PassWord: req.body.PassWord,
      tel: req.body.tel,
      email: req.body.email,
     // Role:req.bodt.Role,
      details: req.body.details,
      updatedAt: Date.now(),
    });
    await res.redirect(`/edit1/${req.params.id}`);

    console.log("redirected");
  } catch (error) {
    console.log(error);
  }
};



// exports.material1 = async (req, res) => {
//   console.log("Starting...");

//   try {
//     // Retrieve site number from the URL
//     const siteNumber = req.params.siteNumber;

//     // Once you have the site number, use it to query materials
//     const material = await Material.find({ SiteNumber1: siteNumber });

//     if (!material.length) {
//       // If no materials are found, handle the error
//       console.error(`No materials found for site number: ${siteNumber}`);
//       req.flash("error", "No materials found for this site number.");
//       return res.redirect("/material1"); // Redirect to materials list (or relevant page)
//     }

//     // Prepare data to pass to the view
//     const locals = {
//       title: `View Material Data for Site ${siteNumber}`,
//       description: "Free NodeJs User Management System",
//       //material: materials,
//     };

//     // Render the view and pass the locals data
//     console.log("Here we go again to the material page");
//     res.render("material1", {
//       locals,
//       material,
//     });
//   } catch (error) {
//     console.error("Error while fetching materials:", error);
//     req.flash("error", "An error occurred while fetching material data.");
//     res.redirect("/material1"); // Redirect to materials list (or relevant page)
//     console.log("here we are end the page:");
//   }
// };