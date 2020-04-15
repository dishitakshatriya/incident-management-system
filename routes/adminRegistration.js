const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

let Admin = require('../models/Admin');

//route Get api/tasks/:id

//route post api/tasks
//desc insert task
//access public
router.post(
  '/',
  [
    check('email', 'Please enter valid email').isEmail(),
    check('password', 'please enter password with 3 or more').isLength({
      min: 3
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    try {
      //check if user email is already in the database
      let admin1 = await Admin.findOne({ email: req.body.email });
      if (admin1) {
        return res.status(400).json({ error: [{ msg: 'Admin already exits' }] });
      }

      //create a user
      const newAdmin = new Admin({
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        email:req.body.email,
        password: req.body.password
      });

      //hash the password
      const salt = await bcrypt.genSalt(10);
      newAdmin.password = await bcrypt.hash(req.body.password, salt);
      //save the user
      const na = await newAdmin.save();
      res.send(na);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

module.exports = router;
