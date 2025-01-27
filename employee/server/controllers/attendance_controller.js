const Material = require("../models/material");
const Sites_info = require("../models/sites");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const { PDFDocument } = require("pdf-lib");
const Attendance = require('../models/attendance');

exports.addAttendance = async (req, res) => {
    const locals = {
      title: "Add New material - NodeJs",
      description: "Free NodeJs User Management System",
    };
  
    res.render("attendance_Data/add_attendance", locals);
  };
  
  
  exports.postAttendance = async (req, res) => {
    console.log('Received data:', req.body);
  
    const laborRecords = req.body.labor; // Assuming `labor` is an array
    const siteId = req.body.site_id; // Extract site_id from the request body
  
    for (const record of laborRecords) {
      const newAttendance = {
        site_id: Number(siteId), // Use siteId from request body
        name: record.name,
        skill: record.skill,
        payable: parseFloat(record.payable),
        gender: record.gender,
        time_in: new Date(`1970-01-01T${record.time_in}:00Z`), // Convert time to date
        time_out: new Date(`1970-01-01T${record.time_out}:00Z`), // Convert time to date
        hours_worked: parseFloat(record.hours_worked)
      };
  
      try {
        // Check if the site ID exists in Sites_info database
        const matchingSite = await Sites_info.findOne({ SiteNumber: newAttendance.site_id });
        console.log('Matching Site:', matchingSite);
  
        if (!matchingSite) {
          req.flash('error', 'Invalid site ID. Please enter a valid site ID.');
          console.error('Error: Site ID not found in Sites_info database.');
          continue; // Skip to the next record if site ID is not found
        }
  
        // Calculate hours worked if not provided
        if (!newAttendance.hours_worked && newAttendance.time_in && newAttendance.time_out) {
          const timeIn = new Date(newAttendance.time_in);
          const timeOut = new Date(newAttendance.time_out);
          const hoursWorked = (timeOut - timeIn) / (1000 * 60 * 60); // Convert milliseconds to hours
          newAttendance.hours_worked = parseFloat(hoursWorked.toFixed(2)); // Store up to 2 decimal places
        }
  
        // Create new attendance record
        await Attendance.create(newAttendance);
        req.flash('info', 'New attendance record has been added.');
      } catch (error) {
        console.error('Error during attendance creation:', error);
        req.flash('error', 'An error occurred while processing attendance data. Please try again.');
      }
    }
  
    // Redirect after processing all records
    res.redirect('/Attendance1');
  };

//   exports.viewAttendance = async (req, res) => {
//     try {
//       // Find the attendance record by its ID
//       console.log('the function is called');
//       const attendance = await Attendance.findOne({ _site_id: req.params.site_id });
  
//       if (!attendance) {
//         // If no record is found, redirect or handle as needed
//         console.log('The dataset has not been');
//         return res.status(404).send('Attendance record not found');
//       }
  
//       // Define locals for rendering
//       const locals = {
//         title: "View Attendance Data",
//         description: "Detailed view of attendance record",
//       };
  
//       // Render the view with attendance data
//       res.render("attendance_Data/view_attendance1", {
//         locals,
//         attendance,
//       });
//     } catch (error) {
//       // Log and handle errors
//       console.error('Error retrieving attendance record:', error);
//       res.status(500).send('An error occurred while retrieving the attendance record.');
//     }
//   };
exports.viewAttendance = async (req, res) => {
    try {
        // Get site_id from query parameters
        const site_id = req.query.site_id;
        console.log('Getting site_id from query parameters', site_id);

        // Fetch one attendance record using site_id to get the date
        const attendance = await Attendance.findOne({ site_id });

        if (!attendance) {
            console.log('Attendance record not found');
            return res.status(404).send('Attendance record not found');
        }

        // Extract the date from the found attendance record
        const recordDate = attendance.date; // Assuming `date` is a field in your schema

        // Fetch all attendance records with the same site_id and date
        const attendanceRecords = await Attendance.find({
            site_id: site_id, // Match the site_id
            date: recordDate   // Match the date
        });

        // Define locals for rendering
        const locals = {
            title: "View Attendance Data",
            description: "Detailed view of attendance records for the specified site and date",
        };

        // Render the view with attendance data
        res.render("attendance_Data/view_attendance", {
            locals,
            attendanceRecords,
            site_id: site_id, // Pass the site_id to the view if needed
            date: recordDate // Pass the date to the view if needed
        });
    } catch (error) {
        console.error('Error retrieving attendance records:', error);
        res.status(500).send('An error occurred while retrieving the attendance records.');
    }
};

  

  exports.attendance_page1 = async (req, res) => {
    // Get flash messages if available
    const messages = await req.flash('info');
  
    const locals = {
      title: 'Attendance Records',
      description: 'List of labor attendance records',
    };
  
    // Pagination settings
    let perPage = 12;
    let page = req.query.page || 1;
  
    try {
      // Fetch attendance records sorted by date (or creation time)
      const attendanceRecords = await Attendance.aggregate([
        { $sort: { date: -1 } }, // Sort by 'date', assuming 'date' is the field for attendance date
      ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();
  
      // Get the total count of records
      const count = await Attendance.countDocuments({});
  
      // Render the attendance info page
      res.render('Attendance1', {
        locals,
        attendanceRecords,
        current: page,
        pages: Math.ceil(count / perPage),
        messages,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send('Error fetching attendance records');
    }
  };


  