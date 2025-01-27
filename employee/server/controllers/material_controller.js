const Material = require("../models/material");
const Sites_info = require("../models/sites");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const { PDFDocument } = require("pdf-lib");

//this was my first dashboard page

//const Material = require("../models/material");

exports.data = async (req, res) => {
  const messages = await req.flash("info");

  const locals = {
    title: "NodeJs",
    description: "Free NodeJs User Management System",
  };

  let perPage = 12;
  let page = req.query.page || 1;

  try {
    const material = await Material.aggregate([{ $sort: { SiteNumber1: 1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Material.countDocuments({});

    res.render("material_info", {
      locals,
      material,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while processing your request");
  }
};

exports.addMaterial = async (req, res) => {
  const locals = {
    title: "Add New material - NodeJs",
    description: "Free NodeJs User Management System",
  };

  res.render("material_Data/add2", locals);
};


// exports.postMaterial = async (req, res) => {
//   const {
//     SiteNumber1,
//     TruckNo1,
//     Material,
//     details,
//     SiteManger1,
//     Cost,
//     DealerName,
//     Quantity,
//   } = req.body;

//   try {
    // Check if the site number exists in the Sites_info collection
    // const existingSite = await Sites_info.findOne({ SiteNumber: SiteNumber1 });
    // if (!existingSite) {
    //   return res.status(404).send("Site Number not found");
    // }
    // } else if (existingSite.SiteNumber == SiteNumber1) {
    //   // If the SiteNumber of the existing site does not match SiteNumber1 of the material
    //   return res.status(400).send("Site Number does not match");
    // } 
    // else {
    // Create a new Material object
    
exports.postMaterial = async (req, res) => {
  console.log(req.body);

  const newMaterial = {
    SiteNumber1: req.body.SiteNumber1,
    TruckNo1: req.body.TruckNo1,
    Material: req.body.Material,
    details: req.body.details,
    SiteManger1: req.body.SiteManger1,
    Cost: req.body.Cost,
    DealerName: req.body.DealerName,
    Quantity: req.body.Quantity,
  };

  try {
    // Check if site number from material data exists in site_info database
    const matchingSite = await Sites_info.findOne({
      SiteNumber: newMaterial.SiteNumber1,
    });

    if (!matchingSite) {
      req.flash("error","Invalid site number. Please enter a valid site number.");
      console.error("Error: Site number not found in site_info database.");
      
      return res.redirect("material_info"); // Redirect with error message
    }

    // Site number exists, proceed with creating the material
    await Material.create(newMaterial);
    req.flash("info", "New material data has been added.");
    res.redirect("material_info");
  } catch (error) {
    console.error("Error during material creation:", error);
    req.flash(
      "error",
      "An error occurred while adding material data. Please try again."
    );
    res.redirect("material_info"); // Redirect with generic error message
  }
};


// exports.postMaterial = async (req, res) => {
//   console.log(req.body);

//   const newMaterial = new Material({
//     SiteNumber1: req.body.SiteNumber1,
//     TruckNo1: req.body.TruckNo1,
//     Material: req.body.Material,
//     details: req.body.details,
//     SiteManger1: req.body.SiteManger1,
//     Cost: req.body.Cost,
//     DealerName: req.body.DealerName,
//     Quantity: req.body.Quantity,
//   });

//   try {
//     await Material.create(newMaterial);
//     await req.flash("info", "New material data has been added.");

//     res.redirect("material_info");
//   } catch (error) {
//     console.log("The error is came from the postsites_info :");
//     console.log(error);
//   }
// };

    exports.deleteMaterial = async (req, res) => {
      try {
        await Material.deleteOne({ _id: req.params.id });
        res.redirect("/material_info");
      } catch (error) {
        console.log("Error occurred while deleting material:");
        console.log(error);
        res.status(500).send("Internal Server Error");
      }
    };

    exports.edit2 = async (req, res) => {
      try {
        const material = await Material.findOne({ _id: req.params.id });

        const locals = {
          title: "Edit material Data",
          description: "Free NodeJs User Management System",
        };

        res.render("material_Data/edit2", {
          locals,
          material,
        });
      } catch (error) {
        console.log("Error occurred while editing material:");
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
    };
    exports.editPost2 = async (req, res) => {
      try {
        await Material.findByIdAndUpdate(req.params.id, {
          SiteNumber1: req.body.SiteNumber1,
          TruckNo1: req.body.TruckNo1,
          Material: req.body.Material,
          details: req.body.details,
          SiteManger1: req.body.SiteManger1,
          Cost: req.body.Cost,
          DealerName: req.body.DealerName,
          Quantity: req.body.Quantity,
          updatedAt: Date.now(),
        });
        await res.redirect("/material_info");
      } catch (error) {
        console.log("Error occurred while updating material:");
        console.log(error);
        res.status(500).send("Internal Server Error");
      }
    };
 

    exports.searchMaterial = async (req, res) => {
      const locals = {
        title: "Search material Data",
        description: "Free NodeJs User Management System",
      };

      try {
        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

        const material = await Material.find({
          $or: [
            { TruckNo: { $regex: new RegExp(searchNoSpecialChar, "i") } },
            { Material: { $regex: new RegExp(searchNoSpecialChar, "i") } },
          ],
        });

        res.render("search", {
          material,
          locals,
        });
      } catch (error) {
        console.log("Error occurred while searching material:");
        console.log(error);
        res.status(500).send("Internal Server Error");
      }
    };

   exports.view2 = async (req, res) => {
     try {
       const material = await Material.findOne({ _id: req.params.id });

       const locals = {
         title: "View material Data",
         description: "Free NodeJs User Management System",
       };

       res.render("material_Data/view2", {
         locals,
         material,
       });
     } catch (error) {
       console.log(error);
     }
   };

    exports.info1 = async (req, res) => {
      // Remove
      // const messages = await req.consumeFlash('info');
      // Use this instead
      const messages = await req.flash("info");

      const locals = {
        title: "NodeJs",
        description: "Free NodeJs User Management System",
      };

      let perPage = 12;
      let page = req.query.page || 1;

      try {
        const material = await Sites_info.aggregate([{ $sort: { createdAt: -1 } }])
          .skip(perPage * page - perPage)
          .limit(perPage)
          .exec();
        // Count is deprecated. Use countDocuments({}) or estimatedDocumentCount()
        // const count = await Customer.count();
        const count = await Sites_info.countDocuments({});

        res.render("material_info", {
          locals,
          material,
          current: page,
          pages: Math.ceil(count / perPage),
          messages,
        });
      } catch (error) {
        console.log(error);
      }
    };


    // Assuming you are using Express.js

    // Update your route handler to fetch data based on SiteNumber
    // Controller method to manage site data
    // Controller method to manage site data
    // Controller method to manage site data

    // exports.manageSiteData = async (req, res) => {
    //   const siteId = req.params.siteId;
    //   try {
    //     const siteData = await Site.findById(siteId).populate("materials");
    //     res.render("data_1", { siteData });
    //   } catch (error) {
    //     console.error("Error fetching site data:", error);
    //     res.status(500).send("Internal Server Error");
    //   }
    // };

    // exports.storeSiteData = async (req, res) => {
    //   const siteId = req.params.siteId;
    //   const newData = req.body;
    //   newData.siteId = siteId;

    //   try {
    //     const createdMaterial = await Material.create(newData);
    //     await Site.findOneAndUpdate(
    //       { _id: siteId },
    //       { $push: { materials: createdMaterial._id } }
    //     );
    //     res.redirect(`/site-data/${siteId}`);
    //   } catch (error) {
    //     console.error("Error storing site data:", error);
    //     res.status(500).send("Internal Server Error");
    //   }
// };
    




// exports.sendSiteDataByEmail = async (req, res) => {
//   const { id } = req.params;
//   const material = await Material.findById(id);

//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "knightr2004@gmail.com",
//     port: 465,
//     secure: true, // true for 465, false for other ports
//     auth: {
//       user: "knightr2004@gmail.com",
//       pass: "Sahil$1217$",
//     },
//   });

//   // create HTML message
//   const html = `
//     <div class="d-flex justify-content-between flex-wrap flex-md nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
//       <h1 class="h2">${material.Material}</h1>
//       <div class="btn-toolbar mb-2 mb-md 0">
//         <div class="btn-group me-2">
//           <button type="button" class="btn btn-sm btn-outline-secondary">Share</button>
//           <button type="button" class="btn btn-sm btn-outline-secondary">Export</button>
//         </div>
//       </div>
//     </div>

//     <!-- rest of the HTML -->
//   `;

//   // create PDF
//   const pdfDoc = await PDFDocument.load(material.details);
//   const pdfBytes = await pdfDoc.save();

//   // send email
//   const mailOptions = {
//     from: "knightr2004@gmail.com",
//     to: "shivambhoye15@gmail.com",
//     subject: "Site Data",
//     html,
//     attachments: [
//       {
//         filename: "site_data.pdf",
//         content: pdfBytes,
//         encoding: "base64",
//       },
//     ],
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error);
//       res.status(500).send("Error sending email");
//     } else {
//       console.log(`Email sent: ${info.response}`);
//       res.redirect("/material_info");
//     }
//   });
// };

// exports.sendEmail = async (req, res) => {
//   const { id } = req.params;
//   const material = await Material.findById(id);

//   // Convert base64-encoded PDF string to buffer
//   const pdfBuffer = Buffer.from(material.details, "base64");

//   // Load PDF document
//   const pdfDoc = await PDFDocument.load(pdfBuffer);

//   // Add a new page to the document
//   const page = pdfDoc.addPage();

//   // Draw a string of text
//   const { width, height } = page.getSize();
//   const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
//   page.drawText("Hello, world!", {
//     x: 50,
//     y: height - 100,
//     size: 50,
//     font,
//     color: rgb(0, 0, 0.5),
//   });

//   // Save the document to a buffer
//   const pdfBytes = await pdfDoc.save();

//   // Send the email
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "your_email@gmail.com",
//       pass: "your_email_password",
//     },
//   });

//   const mailOptions = {
//     from: "your_email@gmail.com",
//     to: "recipient_email@gmail.com",
//     subject: "Material Details",
//     text: "Please find the material details attached.",
//     attachments: [
//       {
//         filename: "material_details.pdf",
//         content: pdfBytes.toString("base64"),
//         contentType: "application/pdf",
//         encoding: "base64",
//       },
//     ],
//   };

//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Email sent: " + info.response);
//     }
//   });

//   res.redirect("/material_info");
// };
  




// exports.viewAll = async (req, res) => {
//   try {
//     const siteNumber = req.params.SiteNumber; // Assuming siteNumber is passed in the URL

//     // Find all materials for the given site number
//     const materials = await Material.find({ SiteNumber1: siteNumber });

//     if (!materials.length) {
//       // Handle no materials found for the site number
//       console.error(`No materials found for site number: ${siteNumber}`);
//       req.flash("error", "No materials found for this site number.");
//       return res.redirect("materials"); // Redirect to materials list (or relevant page)
//     }

//     const locals = {
//       title: `View Material Data for Site ${siteNumber}`, // Adjust title dynamically
//       description: "Free NodeJs User Management System",
//       materials, // Pass the array of materials
//     };

//     res.render("/viewAll", locals);
//   } catch (error) {
//     console.error("Error while fetching materials:", error);
//     req.flash("error", "An error occurred while fetching material data.");
//     res.redirect("materials"); // Redirect to materials list (or relevant page)
//   }
// };



// exports.searchMaterial = async (req, res) => {
//   const locals = {
//     title: "Search material Data",
//     description: "Free NodeJs User Management System",
//   };

//   try {
//     let searchTerm = req.body.searchTerm;
//     const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

//     const materials = await Material.find({
//       $or: [
//         { SiteNumber1: { $regex: new RegExp(searchNoSpecialChar, "i") } },
//         { SiteManger1: { $regex: new RegExp(searchNoSpecialChar, "i") } },
//       ],
//     });

//     res.render("search_Material", {
//       materials,
//       locals,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };