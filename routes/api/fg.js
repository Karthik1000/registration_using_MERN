const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator/check');

//@route GET api/auth
//@access public

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.send(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

//@route POST api/auth
//@access public
router.put(
  '/pass',
  (req, res) => {
    //const salt =  bcrypt.genSalt(10);
    //const pas = req.body.password;
    //const passwordnew =  bcrypt.hash(pas, salt);
    //console.log(passwordnew)
    //var newPassword = new User(req.body);
    req.body.password = bcrypt.hashSync(req.body.password, 10);

    User.findOneAndUpdate(
      { email: req.body.email },
      { password: req.body.password  },
      { new: false },
      function(err, doc) {
        if (err) {
          console.log(err);
          res.end();
        } else {
          res.send('password updated');
        }
      }
    );
  }
  // function(req,res){
  //     //console.log(req.body);
  //     //res.send({type:'PUT'});

  // [
  //   check('email', 'enter correct email').isEmail(),
  //   check('password', 'minimum length of password is 6 characters').isLength({
  //     min: 6
  //   })
  // ],
  // async (req, res) => {
  //   const errors = validationResult(req);

  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({ errors: errors.array() });
  //   }

  //   const email = req.body.email;
  //   //password = await bcrypt.hash(password, salt);
  //   //const { email, password } = req.body;
  //   try {
  //     User.findOneAndUpdate({ email }, req.body);
  //     console.log('updated successfully')
  //      //email: req.body.email

  // if (!user) {
  //   return res
  //     .status(400)
  //     .json({ errors: [{ msg: 'user with email already exists' }] });
  // }

  //var name = 'kk'
  //user = new User({ name, email, password });

  //const salt = await bcrypt.genSalt(10);

  //user.password = await bcrypt.hash(password, salt);

  //await user.findOneAndUpdate({email}, req.body);

  // const payload = {
  //   user: {
  //     id: user.id
  //   }
  // };

  // jwt.sign(
  //   payload,
  //   config.get('jwtSecret'),
  //   { expiresIn: 360000 },
  //   (err, token) => {
  //     if (err) throw err;
  //     res.json({ token });
  //   }
  // );
  //   } catch (err) {
  //     console.error(err.message);
  //     res.status(500).send('server error');
  //   }
  // }
);

module.exports = router;
