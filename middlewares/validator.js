const { body, validationResult } = require('express-validator');
exports.validateId = (req, res, next) => 
{
    let id = req.params.id;
    //an objectId is a 24-bit Hex string
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    } else {
        return next();
    }
};

exports.validateSignup = [body('firstName', 'First name cannot be empty.').notEmpty().trim().escape(),
body('lastName', 'Last name cannot be empty.').notEmpty().trim().escape(),
body('email', 'Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
body('password', 'Password must be between 8 and 64 characters long.').isLength({min: 8, max: 64})];

exports.validateLogin = [body('email', 'Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
body('password', 'Password must be between 8 and 64 characters long.').isLength({min: 8, max: 64})];

exports.validateResult = (req, res, next) => 
{
    let errors = validationResult(req);
    if (!errors.isEmpty())
    {
        errors.array().forEach(error =>
            {
                req.flash('error', error.msg);
            })
        return res.redirect('back');
    }
    return next();
}

exports.validateStory = [body('title', 'Title cannot be empty.').notEmpty().trim().escape(),
                        body('content', 'Story content cannot be empty.').isLength({min: 10}).trim().escape()]