// dependencies
// express.js connection
const router = require('express').Router();
// User, Post, Comment models
const { User, Post, Comment } = require('../../models');
// express Session for the session data
const session = require('express-session');
// authorization Helper
const withAuth = require('../../utils/auth');
// sequelize store to save the session so the user can remain logged in
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// routes

// GET /api/users -- get all users
router.get('/', (req, res) => {
    // access the User model and run .findAll() method to get all users
    User.findAll({
        // when data is sent back, exclude password
        attributes: { exclude: ['password'] }
    })
      // return the data as JSON formatted
      .then(dbUserData => res.json(dbUserData))
      // if there is a server error, return that error
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });