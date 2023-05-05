// dependencies
// the router and the database
const router = require('express').Router();
const sequelize = require('../config/connection');
// the models
const { Post, User, Comment } = require('../models');
// the authorization middleware to redirect unauthenticated users to the login page
const withAuth = require('../utils/auth');

