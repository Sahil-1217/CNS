const express = require("express");
const router = express.Router();
const materialController = require("../controllers/attendance_controller");

router.get("/Attendance1", materialController.attendance_page1);
router.get("/add_attendance", materialController.addAttendance);
 router.post("/add_attendance", materialController.postAttendance);
 router.get("/view_attendance", materialController.viewAttendance);
 router.get("/attendance_info", materialController.attendanceInfo);




module.exports = router;
