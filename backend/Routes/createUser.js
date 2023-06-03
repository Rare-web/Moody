const express = require("express");

const router = express.Router();
const user = require("../models/User");
const { body, validationResult } = require("express-validator");
var bcrypt = require("bcryptjs");
// const { JsonWebTokenError } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const jwtSecret = "Exampleapplisteningonport5000..";
router.post(
  "/createuser",
  body("email").isEmail(),
  body("name").isLength({ min: 5 }),
  body("password", "Incorrect password").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    var salt = bcrypt.genSaltSync(10);
    var secPassword = bcrypt.hashSync(req.body.password, salt);
    try {
      await user
        .create({
          name: req.body.name,
          email: req.body.email,
          password: secPassword,
          location: req.body.location,
        })
        .then(res.json({ success: true }));
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  },
);
router.post(
  "/loginuser",
  body("email").isEmail(),
  body("password", "Incorrect password").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let userData = await user.findOne({ email });
      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Login with correct credentials" });
      }
      const pwdCompare = await bcrypt.compare(
        req.body.password,
        userData.password,
      );
      if (!pwdCompare) {
        return res
          .status(400)
          .json({ errors: "Login with correct credentials" });
      }
      const data = {
        user: {
          id: userData.id,
        },
      };
      const authToken = jwt.sign(data, jwtSecret);
      return res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  },
);
module.exports = router;
