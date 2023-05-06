const router = require('express').Router();
// User Model, Post Model, and Comment Model
const { User, Post, Comment } = require('../../models');
// Sequelize database connection
const sequelize = require('../../config/connection');
// Authorization Helper
const withAuth = require('../../utils/auth');

// Routes

// GET api/posts/ -- get all posts
router.get('/', (req, res) => {
    Post.findAll({
        // query configuration
        // include the post ID, URL, title, and creation time
        attributes: [
            'id',
            'post_text',
            'title',
            'created_at',
          ],
        // order the posts from most recent to least
        order: [[ 'created_at', 'DESC']],
        // include the post author's name
        // include all comments
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
    // return the posts
    .then(dbPostData => res.json(dbPostData))
    // if there was a server error, return the error
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET api/posts/:id -- get a single post by id
router.get('/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      // query configuration
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
        // if no post exists, return an error
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        // if a server error occurred, return an error
        console.log(err);
        res.status(500).json(err);
      });
  });