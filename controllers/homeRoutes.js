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
