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

  // GET /api/users -- get a single user by id
router.get('/:id', (req, res) => {
    // access the User model and run the findOne() method to get a single user
    User.findOne({
      // when data is sent back, exclude the password
      attributes: { exclude: ['password'] },
      where: {
        // use id as the parameter for the request
        id: req.params.id
      },
      // include the posts the user has created, and the posts the user has commented on
      include: [
        {
          model: Post,
          attributes: ['id', 'title', 'post_text', 'created_at']
        },
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: Post,
                attributes: ['title']
            }
        }
      ]
    })
      .then(dbUserData => {
        if (!dbUserData) {
          // if no user is found, return error
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        // otherwise, return data for the requested user
        res.json(dbUserData);
      })
      .catch(err => {
        // if there is a server error, return that error
        console.log(err);
        res.status(500).json(err);
      });
  });
