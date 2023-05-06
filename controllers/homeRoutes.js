// dependencies
// router and database
const router = require('express').Router();
const sequelize = require('../config/connection');
// the models
const { Post, User, Comment } = require('../models');

// Render the home page
router.get('/', (req, res) => {
    Post.findAll({ 
        attributes: [
        'id',
        'post_text',
        'title',
        'created_at',
      ],
    // Order the posts from most recent to least
    order: [[ 'created_at', 'DESC']],
    // include User object, and Comment object, include the post creator's user name
    include: [
        {
            model: User,
            attributes: ['username']
        },
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        }
    ]
})
// render the posts
.then(dbPostData => {
    const posts = dbPostData.map(post => post.get({ plain: true }));
    // pass the posts into the homepage template
    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn
    });
  })
  // catch server error
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

// get single post
router.get('/post/:id', (req, res) => {
    Post.findOne({
      where: {
        // specify the post id parameter in the query
        id: req.params.id
      },
      // Query configuration
      attributes: [
        'id',
        'post_text',
        'title',
        'created_at',
      ],
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        }
      ]
    })
    .then(dbPostData => {
        // if no post by that id exists, return an error
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        // serialize the post data
        const post = dbPostData.get({ plain: true });
        // pass the posts and a session variable into the single post template
        res.render('single-post', {
            post,
            loggedIn: req.session.loggedIn
          });
      })
      .catch(err => {
        // if error occurred, return an error
        console.log(err);
        res.status(500).json(err);
      });
  });

  // route to login page, if the user is logged in, redirect to the home page.
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

  // route to signup page if the user is logged in, redirect to the home page.
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('signup');
  });
  
  module.exports = router;