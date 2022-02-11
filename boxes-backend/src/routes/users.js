const router = require('express').Router();
let User = require('../models/user.model');

const argon2 = require('argon2');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../middleware/validinfo');
const authorization = require('../middleware/authorization');

// get user info (once logged in)
//router.get('/', authorization, async (req, res) => {
//try {
//// all user info is being returned, should not include password
//const user = await pool.query(
//'SELECT user_name, user_email, user_id FROM users WHERE user_id = $1',
//[req.user]
//);
//res.json(user.rows[0]);
//} catch (err) {
//console.error(err.message);
//res.status(500).send('Server error');
//}
//});

//register
router.post('/register', validInfo, async (req, res) => {
  try {
    //destructure the req.body (name, email, password)
    const { name, email, password } = req.body;

    //check if the user exists (if user exists then throw error)
    User.findOne({ email: email }).then((user) => {
      if (user) {
        return res.status(400).json('User already exists');
      } else {
        //hash the password with argon2
        //const hash = argon2.hash(password);

        //enter the user into the database
        const newUser = new User({
          name: name,
          email: email,
          password: password,
        });

        //generate the jwt token
        const token = jwtGenerator(); //changed from id to email
        res.json({ token });

        //save new user
        newUser.save();
        //return res.status(200).json({ msg: newUser });
      }
    });
  } catch (err) {
    console.error(err.message);
  }
});

//login route
router.post('/login', validInfo, (req, res) => {
  try {
    //destructure req.body
    const { email, password } = req.body;
    //check if user exists
    User.findOne({ email: email }).then((user) => {
      //(if not then throw error)
      if (!user) {
        return res.status(400).json('User does not exist');
      } else if (user.length === 0) {
        return res.status(401).json('Password or email is incorrect');
      }

      //check if incoming password is the same as the database password
      //add hash later
      if (user.password !== password) {
        return res.status(401).json('Password or Email is incorrect');
      } else {
        //give them the jwt token
        const token = jwtGenerator(user._id);
        res.json({ token });
      }
    });
  } catch (err) {
    console.error(err.message);
  }
});

//bypass login if token exists
router.get('/is-verify', authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
