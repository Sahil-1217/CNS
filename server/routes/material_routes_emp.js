const express = require("express");
const router = express.Router();
const materialController = require("../controllers/material_controller_emp");


router.get("/index1", materialController.data);
router.get("/add2", materialController.addMaterial);
router.post("/add2", materialController.postMaterial);
router.get("/view2/:id", materialController.view2);
router.get("/edit2/:id", materialController.edit2);
router.put("/edit2/:id", materialController.editPost2);

router.delete("/edit2/:id", materialController.deleteMaterial);
router.get("/material_info_emp", materialController.info1);

// router.post("/Attendance", materialController.postAttendance);
//router.post("/search", materialController.searchMaterial);
// router.get("/viewAll/:SiteNumber", materialController.viewAll);
//router.get("/material_info/:id/email", materialController.sendSiteDataByEmail);



module.exports = router;
