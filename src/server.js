const express = require('express');
const path = require('path');
require('dotenv').config();
const configViewEngine = require('./config/viewEngine');
const webRoutes = require('./routes/web');
const webProduct = require('./routes/product');
const webAdmin = require('./routes/admin')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');


//config
const app = express();
const port = process.env.PORT || 8080;
const hostname = process.env.HOST_NAME;
const DB = process.env.DB_URI;

// Config view engine
configViewEngine(app);
 
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  session({
    secret: "my secret key",
    saveUninitialized: true,
    resave: false, 
    cookie:{
      maxAge: 36000000,
    }
  })
);

app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isAuthenticated || false;
  next();
});

// Static files
app.use('/public', express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', webRoutes);
app.use('/product', webProduct);
app.use('/admin',webAdmin);



// Connect MongoDB
mongoose.connect(DB)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });

// App is running at localhost
app.listen(port, hostname, () => {
  console.log(`Server started at http://${hostname}:${port}`);
});
  