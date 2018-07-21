const express = require('express');
const path = require('path');
const volleyball = require('volleyball');
const bodyParser = require('body-parser');
const session = require('express-session');

const passport = require('passport');

const db = require('../db/_db');

const app = express();

// configure and create our database store
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db: db });


passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findById(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})

// sync so that our session table gets created
dbStore.sync();

//express has its own built-in body-parsing middleware
//app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//logging middleware
app.use(volleyball);

// Session middleware (plug in the database store here)
app.use(session({
  secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
  store: dbStore,
  resave: false,
  saveUninitialized: false
}))

// We need to initialize passport so that it will consume our req.session object, and attach the user to the request object.  do this after our session middleware
app.use(passport.initialize());
app.use(passport.session());

//when I get my api routes set up, I can use this:
//app.use('/api', require('./apiRoutes/index'))



// authentication router
app.use('/auth', require('./auth/auth'))

//serving the static files
const publicFolder = path.join(__dirname, '..', 'public');
app.use(express.static(publicFolder));



// Because we generally want to build single-page applications (or SPAs), our server should send its index.html for any requests that don't match one of our API routes.
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

//error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});
module.exports = app;
