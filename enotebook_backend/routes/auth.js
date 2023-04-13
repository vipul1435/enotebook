const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const JWT_SECRET = "thisisusedforsignuser";

const fetchuser = require('../middleware/fetchUser');

router.post(
  "/createUser",
  [
    body("name", "Please enter a valid name").isLength({ min: 3 }),
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Please enter a valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "Email is already exist" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authTokem = jwt.sign(data, JWT_SECRET);
      res.send({ authTokem });
    } catch (error) {
      res.status(500).send("Some error occured");
    }
  }
);

router.post(
  "/loginUser",
  [
    body("email", "Please enter a valid email").isEmail(),
    body("password", "password can't be empty").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ errors: "Invalid credentials" });
      }

      const passwordCompare =await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ errors: "Invalid credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authTokem = jwt.sign(data, JWT_SECRET);
      res.send({ authTokem });
    } catch (error) {
      res.status(500).send("Some error occured");
    }
  }
);


router.post('/fetchUser',fetchuser,async (req,res)=>{
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    res.status(500).send("Some error occured");
  }
})
module.exports = router;
