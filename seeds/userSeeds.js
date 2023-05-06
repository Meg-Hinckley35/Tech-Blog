const { User } = require('../models');

const userData = [
  {
    username: "Mandy",
    email: "mandy@gmail.com",
    password: "password1234"
  },
  {
    username: "Helen",
    email: "helen@gmail.com",
    password: "password1234"
  },
  {
    username: "Dottie",
    email: "dottie@gmail.com",
    password: "password1234"
  },
  {
    username: "Adrienne",
    email: "adrienney@gmail.com",
    password: "password1234"
  },
  {
    username: "Deanna",
    email: "deanna@gmail.com",
    password: "password1234"
  }
];

const seedUsers = () => User.bulkCreate(userData);

//  WARNING seed bulk create does NOT hash the password, so they must be hashed via the update route before the login route will work!

module.exports = seedUsers;