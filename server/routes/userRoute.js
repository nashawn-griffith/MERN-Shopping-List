const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const passport = require('passport');
const {generateToken} = require('../helpers/generateToken');
const util = require('util');

/*convert callbacks into promises*/
util.promisify(bcrypt.genSalt);
util.promisify(bcrypt.hash);

/*login user*/
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {session: false}, (err, user, info) => {
    if (err) {
      body = {
        meta: {statusCode: 401},
        data: null,
        error: 'Unauthorized'
      };
      return res.status(401).json(body);
    }
    /*user not found*/
    if (!user) {
      body = {
        meta: {statusCode: 404},
        data: null,
        error: 'Login failed'
      };
      return res.status(404).json(body);
    }

    /*login user*/
    req.login(user, {session: false}, async err => {
      if (err) {
        body = {meta: {statusCode: 500}, data: null, error: err.message};
        return res.status(500).send(body);
      }

      /*set user info, generate toke & respond*/
      const token = 'Bearer ' + (await generateToken(user));
      body = {
        meta: {statusCode: 200, token},
        data: {user},
        error: null
      };

      return res.status(200).json(body);
    });
  })(req, res);
});

/*register user*/
router.post('/register', async (req, res) => {
  const {name, email, password} = req.body;

  try {
    if (password.length === 0) {
      throw new Error('Password is required');
    }
    /*generate salt, hash password and save new user*/
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT, 10));
    const hash = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hash
    });

    await user.save();

    /*generate token*/
    const token = await generateToken(user);

    body = {
      meta: {statusCode: 200, token},
      data: {user},
      err: null
    };

    return res.status(200).json(body);
  } catch (err) {
    body = {
      meta: {statusCode: 422},
      data: null,
      err: err.message
    };
    return res.status(422).json(body);
  }
});

/*get current user*/
router.get(
  '/current',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const body = {
      meta: {statusCode: 200},
      body: req.user,
      err: null
    };
    return res.status(200).json(body);
  }
);

module.exports = router;
