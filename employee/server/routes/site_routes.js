const express = require("express");
const router = express.Router();
const siteController = require("../controllers/siteController");

/**
 *  Customer Routes
 */

router.get("/", siteController.homepage);
router.get("/about", siteController.about);
router.get("/material1/:siteNumber", siteController.material1);
//router.get("/employee", siteController.employee);
//router.get("/material_info", siteController.info1);
router.get("/add", siteController.addSites_info);
router.post("/add", siteController.postSites_info);
router.get("/view/:id", siteController.view);
router.get("/sites_info/:id", siteController.sites_info);
router.get("/edit/:id", siteController.edit);
router.put("/edit/:id", siteController.editPost);
router.delete("/edit/:id", siteController.deleteCustomer);
router.get("/viewAll/:siteNumber", siteController.viewAll);

router.post("/search", siteController.searchSites);
router.post("/search", siteController.searchMaterial);

module.exports = router;
