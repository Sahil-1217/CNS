const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const ejs = require('ejs'); // Keeping EJS
// Remove `pug` if not used

const connectDB = require('./server/config/db');
const Material = require('./server/models/material');

const app = express();
const port = process.env.PORT || 5001;

// Connect to Database  
connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));

// Express Session
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 } // 1 week
}));

// Flash Messages
app.use(flash({ sessionKeyName: 'flashMessage' }));

// Templating Engine
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Set the default layout to 'dashboard'
app.set('layout', './layouts/dashboard');

// Check if the user is logged in
app.use((req, res, next) => {
  // Check if the user is logged in and set the layout accordingly
  if (req.session.logged === 1) {
    app.set('layout', './layouts/profile');
  } else if (req.session.logged === 2) {
    app.set('layout', './layouts/main');
  } else {
    app.set('layout', './layouts/dashboard');
  }
  next();
});

// Routes
app.use('/', require("./server/routes/material_routes_emp"));
app.use("/", require("./server/routes/login_routes"));
app.use('/', require('./server/routes/site_routes'));
app.use('/', require("./server/routes/employee_routes"));
app.use('/', require("./server/routes/material_routes"));
app.use('/', require("./server/routes/attendance_routes"));

// Handle 404
app.use((req, res) => {
  console.error('404 - Not Found:', req.originalUrl);
  res.status(404).render('404');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
