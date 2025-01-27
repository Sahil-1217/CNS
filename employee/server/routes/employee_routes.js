const express = require("express");
const router = express.Router();
const employee_controller = require("../controllers/employee_controller");


//customere routers
router.get("/employee", employee_controller.employee);
router.get("/add1", employee_controller.addCustomer_emp);
router.post("/add1", employee_controller.postCustomer_emp);
router.get("/view1/:id", employee_controller.view1);
router.post("/emp_search", employee_controller.Search_emp);
//router.delete("/edit/:id", employee_controller.deleteCustomer);
router.get("/edit1/:id", employee_controller.edit);
router.put("/edit1/:id", employee_controller.editPost);
router.delete("/edit1/:id", employee_controller.deleteCustomer);


module.exports = router;