const Sites_info = require("../models/sites");
const Material = require("../models/material");
const mongoose = require("mongoose");


//this was my first dashboard page 


exports.homepage = async (req, res) => {
  // Flash messages
  const messages = await req.flash("info");

  const locals = {
    title: "NodeJs",
    description: "Free NodeJs User Management System",
  };

  let perPage = 12;
  let page = req.query.page || 1;

  try {
    const sitesInfoData = await Sites_info.aggregate([
      { $sort: { createdAt: -1 } },
    ])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    // Counting total documents
    const count = await Sites_info.countDocuments({});

    res.render("index", {
      locals,
      sites: sitesInfoData, // Changed variable name to sitesInfoData
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
    });
  } catch (error) {
    console.log(error);
    // Handle the error appropriately
    res.status(500).send("An error occurred while processing your request");
  }
};


/**
 * GET /
 * Homepage
 */

// exports.homepage = async (req, res) => {
//     const messages = await req.consumeFlash('info');
//     const locals = {
//       title: 'NodeJs',
//       description: 'Free NodeJs User Management System'
//     }

//     try {
//       const customers = await Customer.find({}).limit(22);
//       res.render('index', { locals, messages, customers } );
//     } catch (error) {
//       console.log(error);
//     }
// }

//its my info page

// exports.info1 = async (req, res) => {
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
//     const sites = await Sites_info.aggregate([
//       { $sort: { createdAt: -1 } },
//     ])
//       .skip(perPage * page - perPage)
//       .limit(perPage)
//       .exec();
//     // Count is deprecated. Use countDocuments({}) or estimatedDocumentCount()
//     // const count = await Customer.count();
//     const count = await Sites_info.countDocuments({});

//     res.render("material_info", {
//       locals,
//       sites,
//       current: page,
//       pages: Math.ceil(count / perPage),
//       messages,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };


///** Here we adding the new employess and  save it to our data base */

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
//     const empData = await Sites_info.aggregate([
//       { $sort: { createdAt: -1 } },
//     ])
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
 * About
 */

//***Here we view the sites info which is updated by the employeee
exports.sites_info = async (req, res) => {
  try {
    const siteData = await Sites_info.findOne({ _id: req.params.id });

    const locals = {
      title: "View Customer Data",
      description: "Free NodeJs User Management System",
    };

    res.render("admin_sites/sites_info", {
      locals,
      customer,
    });
  } catch (error) {
    console.log(error);
  }
};





exports.about = async (req, res) => {
  const locals = {
    title: "About",
    description: "Free NodeJs User Management System",
  };

  try {
    res.render("about", locals);
  } catch (error) {
    console.log(error);
  }
};


// get the material site info it is the static page so we have to mention here the work of it.
exports.material1 = async (req, res) => {
  console.log("Starting...");

  try {
    // Retrieve site number from the URL
    const siteNumber = req.params.siteNumber;

    // Once you have the site number, use it to query materials
    const material = await Material.find({ SiteNumber1: siteNumber });

    if (!material.length) {
      // If no materials are found, handle the error
      console.error(`No materials found for site number: ${siteNumber}`);
      req.flash("error", "No materials found for this site number.");
      return res.redirect("/material1"); // Redirect to materials list (or relevant page)
    }

    // Prepare data to pass to the view
    const locals = {
      title: `View Material Data for Site ${siteNumber}`,
      description: "Free NodeJs User Management System",
      //material: materials,
    };

    // Render the view and pass the locals data
    console.log("Here we go again to the material page");
    res.render("material1", {
      locals,
      material,
      
    });
  } catch (error) {
    console.error("Error while fetching materials:", error);
    req.flash("error", "An error occurred while fetching material data.");
    res.redirect("/material1"); // Redirect to materials list (or relevant page)
    console.log("here we are end the page:");
  }
};

exports.view = async (req, res) => {
  try {
    const sites = await Sites_info.findOne({ _id: req.params.id });

    const locals = {
      title: "View Customer Data",
      description: "Free NodeJs User Management System",
    };

    res.render("customer/view",{
      locals,
      sites,
    });
  } catch (error) {
    console.log(error);
  }
};


/**
 * GET /
 * New Customer Form
 */
// exports.addSites_info = async (req, res) => {
//   const locals = {
//     title: "Add New Customer - NodeJs",
//     description: "Free NodeJs User Management System",
//   };

//   res.render("customer/add", locals);
// };

// /**
//  * POST /
//  * Create New Customer
//  */

// ///here  we are using express validator for the props
// exports.postSites_info = async (req, res) => {
//   try {
//     const newSites_info = new Sites_info({
//       SiteName: req.body.SiteName,
//       SiteLocation: req.body.SiteLocation,
//       details: req.body.details,
//       TruckNo: req.body.TruckNo,
//       Material: req.body.Material,
//       SiteManger: req.body.SiteManger,
//     });

//     await Sites_info.create(newSites_info);
//     await req.flash("info", "New site data has been added.");

//     res.redirect("/");
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("An error occurred while processing your request");
//   }
// };

exports.addSites_info = async (req, res) => {
  const locals = {
    title: "Add New Customer - NodeJs",
    description: "Free NodeJs User Management System",
  };

  res.render("customer/add", locals);
};

/**
 * POST /
 * Create New Customer
 */

///here  we are using express validator for the props
exports.postSites_info = async (req, res) => {
  console.log(req.body);

  const newSites_info = new Sites_info({
    SiteNumber:req.body.SiteNumber,
    SiteName: req.body.SiteName,
    SiteLocation: req.body.SiteLocation,
    details: req.body.details,
    //TruckNo: req.body.TruckNo,
    //Material: req.body.Material,
    SiteManger: req.body.SiteManger,
  });

  try {
    await Sites_info.create(newSites_info);
    await req.flash("info", "New site data has been added.");

    res.redirect("/");
  } catch (error) {
    console.log("The error is came from the postsites_info :")
    console.log(error);
  }
};




///////////////////////////

// New Customer Form for employeeeee

// exports.addCustomer_emp = async (req, res) => {
//   const locals = {
//     title: "Add New Customer - NodeJs",
//     description: "Free NodeJs User Management System",
//   };

//   res.render("employess_data/add1", locals);
// };

// /**
//  * POST /
//  * Create New Customer
//  */

// ///here  we are using express validator for the props
// exports.postCustomer_emp = async (req, res) => {
//   console.log(req.body);

//   const newCustomer = new Customer({
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     details: req.body.details,
//     tel: req.body.tel,
//     email: req.body.email,
//   });

//   try {
//     await Customer.create(newCustomer);
//     await req.flash("info", "New customer has been added.");

//     res.redirect("employee");
//   } catch (error) {
//     console.log(error);
//   }
// };

/**
 * GET /
 * Customer Data
 */



// exports.view1 = async (req, res) => {
//   try {
//     const customer = await Customer.findOne({ _id: req.params.id });

//     const locals = {
//       title: "View Customer Data",
//       description: "Free NodeJs User Management System",
//     };

//     res.render("employess_data/view1", {
//       locals,
//       customer,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };



/**
 * GET /
 * Edit Customer Data
 */
exports.edit = async (req, res) => {
  try {
    const sites = await Sites_info.findOne({ _id: req.params.id });

    const locals = {
      title: "Edit Customer Data",
      description: "Free NodeJs User Management System",
    };

    res.render("customer/edit", {
      locals,
      sites,
    });
  } catch (error) {
    console.log("The error is found in the update /edit :")
    console.log(error);
  }
};

/**
 * GET /
 * Update Customer Data
 */
exports.editPost = async (req, res) => {
  try {
    await Sites_info.findByIdAndUpdate(req.params.id, {
      SiteNumber: req.body.SiteNumber,
      SiteName: req.body.SiteName,
      SiteLocation: req.body.SiteLocation,
      details: req.body.details,
      //TruckNo: req.body.TruckNo,
      //Material: req.body.Material,
      SiteManger: req.body.SiteManger,
      updatedAt: Date.now(),
    });
    await res.redirect(`/edit/${req.params.id}`);

    console.log("redirected");
  } catch (error) {
    console.log(error);
  }
};

/**
 * Delete /
 * Delete Customer Data
 */
exports.deleteCustomer = async (req, res) => {
  try {
    await Sites_info.deleteOne({ _id: req.params.id });
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

/**
 * Get /
 * Search Customer Data
 */
exports.searchSites = async (req, res) => {
  const locals = {
    title: "Search Customer Data",
    description: "Free NodeJs User Management System",
  };

  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const sites = await Sites_info.find({
      $or: [
        { SiteName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { SiteLocation: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("search", {
      sites,
      locals,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.searchMaterial = async (req, res) => {
  const locals = {
    title: "Search material Data",
    description: "Free NodeJs User Management System",
  };

  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar1 = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const sites = await Material.find({
      $or: [
        { SiteNumber1: { $regex: new RegExp(searchNoSpecialChar1, "i") } },
        { SiteManger1: { $regex: new RegExp(searchNoSpecialChar1, "i") } },
      ],
    });

    res.render("search", {
      sites,
      locals,
    });
  } catch (error) {
    console.log(error);
  }
};



// exports.viewAll = async (req, res) => {
//   console.log("starting 1:");
//   try {
//     const siteNumber = req.params.SiteNumber; // Assuming siteNumber is passed in the URL

//     // Find all materials for the given site number
//     const material = await Material.find({ SiteNumber1: siteNumber });
//     console.log("starting 2:");

//     if (!material.length) {
//       // Handle no materials found for the site number
//       console.error(`No materials found for site number: ${siteNumber}`);
//       req.flash("error", "No materials found for this site number.");
//       return res.redirect("viewAll"); // Redirect to materials list (or relevant page)
//     }
//      console.log("starting 3:");
//     const locals = {
//       title: `View Material Data for Site ${siteNumber}`, // Adjust title dynamically
//       description: "Free NodeJs User Management System",
//       material, // Pass the array of materials
//     };

//     res.render("/viewAll", locals);
//     console.log("starting 4:");
//   } catch (error) {
//     console.error("Error while fetching materials:", error);
//     req.flash("error", "An error occurred while fetching material data.");
//     res.redirect("materials"); // Redirect to materials list (or relevant page)
//     console.log("starting 5:");
//   }
// };


exports.viewAll = async (req, res) => {
  const locals = {
    title: "material",
    description: "Free NodeJs User Management System",
  };

  try {
    res.render("viewAll", locals);
  } catch (error) {
    console.log(error);
  }
};