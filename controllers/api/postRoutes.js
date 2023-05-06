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