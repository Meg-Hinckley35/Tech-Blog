const router = require('express').Router();
// User Model, Post Model, and Comment Model
const { User, Post, Comment } = require('../../models');
// Sequelize database connection
const sequelize = require('../../config/connection');
// Authorization Helper
const withAuth = require('../../utils/auth');