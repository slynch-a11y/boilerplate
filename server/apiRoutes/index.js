// Your API is the main course of your server. It's often preferable to break up your different routes using the router object. By convention, API routes are prefixed with /api/ - this is purely done to namespace them away from your "front-end routes" (such as those created by react-router).

// You could organize these however you choose. The hint below contains just one suggestion of how you might organize this.

// Hint:
//  Suggestion on how to organize
// Click to toggle hint
// Assume we have a file structure like this:

// /my-project
// --/apiRoutes
// ----kittens.js
// ----index.js
// ----puppies.js
// ----users.js
// --server.js
// From your main app pipeline, you might mount all of your API routes on /api like so:

// // server.js
// app.use('/api', require('./apiRoutes')); // matches all requests to /api
// Then, in apiRoutes/index.js, you might further delegate each router into its own namespace like so:

// // apiRoutes/index.js
// const router = require('express').Router();

// router.use('/users', require('./users')); // matches all requests to /api/users/
// router.use('/puppies', require('./puppies')); // matches all requests to  /api/puppies/
// router.use('/kittens', require('./kittens')); // matches all requests to  /api/kittens/

// Sloths?!?! Get outta town!
// router.use(function (req, res, next) {
//   const err = new Error('Not found.');
//   err.status = 404;
//   next(err);
// });


// module.exports = router;
// Now, in each individual router, each route will automatically match on /api/routeName/, so you can write your routes in the following fashion:

// // apiRoutes/puppies.js
// const router = require('express').Router();

// // matches GET requests to /api/puppies/
// router.get('/', function (req, res, next) { /* etc */});
// // matches POST requests to /api/puppies/
// router.post('/', function (req, res, next) { /* etc */});
// // matches PUT requests to /api/puppies/:puppyId
// router.put('/:puppyId', function (req, res, next) { /* etc */});
// // matches DELETE requests to /api/puppies/:puppyId
// router.delete('/:puppyId', function (req, res, next) { /* etc */});

// module.exports = router;
// Note that the advantage here is that instead of writing out router.get('/api/puppies') and so forth for each route, we can just write router.get('/'), because of the way we've composed our middleware together.
