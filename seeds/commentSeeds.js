const { Comment } = require('../models');

const commentData = [
  {
    comment_text: "Hey this info is really useful. Thanks for making it easier to understand!",
    post_id: 3,
    user_id: 1
  },
  {
    comment_text: "Wait, how do you connect your github to heroku??",
    post_id: 1,
    user_id: 4
  },
  {
    comment_text: "This session stuff is so hard to understand.",
    post_id: 4,
    user_id: 2
  },
  {
    comment_text: "Why do they call them cookie?? Now I'm hungry.",
    post_id: 4,
    user_id: 3
  },
  {
    comment_text: "Hey javascript is getting easier! yay!",
    post_id: 5,
    user_id: 5
  },
  {
    comment_text: "So why can't I just use the same password for everything?? It would be so much easier. So annoying!",
    post_id: 5,
    user_id: 4
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;