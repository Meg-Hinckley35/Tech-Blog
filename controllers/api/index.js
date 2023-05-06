// dependencies
// server connection
const router = require('express').Router();
// user Routes
const userRoutes = require('./user-routes');
// post Routes
const postRoutes = require('./post-routes');
// comment Routes
const commentRoutes = require('./comment-routes');

// define route path for the API to use, e.g. api/users/
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

// export the router
module.exports = router;