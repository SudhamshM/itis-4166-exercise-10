const express = require('express');
const controller = require('../controllers/userController');
const {isGuest, isLoggedIn} = require('../middlewares/auth');
const { loginLimiter } = require('../middlewares/rateLimiters');
// add server-side input validation
const { body } = require('express-validator');

const router = express.Router();

//GET /users/new: send html form for creating a new user account
router.get('/new', isGuest, controller.new);

//POST /users: create a new user account
router.post('/', isGuest, controller.create);

//GET /users/login: send html for logging in
router.get('/login', isGuest, controller.getUserLogin);

//POST /users/login: authenticate user's login
router.post('/login', loginLimiter, 
[body('email', 'Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
body('password', 'Password must be between 8 and 64 characters long.').isLength({min: 8, max: 64})] , 
isGuest, controller.login);

//GET /users/profile: send user's profile page
router.get('/profile', isLoggedIn, controller.profile);

//POST /users/logout: logout a user
router.get('/logout', isLoggedIn, controller.logout);

module.exports = router;