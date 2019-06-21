const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check'); //this is the snippet from the docs
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');

//@route "POST" api/users
//@desc   Register a user, used with data from registration form
//@access Public
router.post(
  '/',
  [
    //validation from express-validator, it becomes the second parameter of the post route(where the data originates)
    check('name', 'Please add your name')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 letters long').isLength({
      min: 6
    })
  ],
  async (req, res) => {
    //use an async modifier on callback function for promises within try/catch
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body; //destructure for req.body

    try {
      let user = await User.findOne({ email }); //this is es6 email:email
      if (user) {
        return res.status(400).json({ msg: 'User already exists' }); //checking db for user by email if true send msg
      }
      user = new User({ name, email, password }); //declare an instance of user with validated information

      const salt = await bcrypt.genSalt(10); //this uses generate salt from bcrypt to hash the password before store in db

      user.password = await bcrypt.hash(password, salt);

      await user.save(); //send the new user instance to the db

      const payload = { user: { id: user.id } }; // define the payload that will be sent with the token

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          //note 4 parameters the payload, the secret, obj for token with attr and an error handling call back
          expiresIn: 360000
        }, //usually set to just 3600
        (err, token) => {
          if (err) throw err;
          res.json({ token }); //else if no errors return the token
        }
      ); //this fx allows the payload to be sent with the token and the secret var in config/default file
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
