const router = require('express').Router();
// Comment model
const { Comment } = require('../../models');
// Authorization Helper
const withAuth = require('../../utils/auth');

// routes

// GET comments
router.get('/', (req, res) => {
    // access Comment model and run .findAll() to get all comments
    Comment.findAll()
      // return the data as JSON
      .then(dbCommentData => res.json(dbCommentData))
      // if there is a server error, return that error
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });