const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

let Technician = require('../models/Technician');
const generator = require('generate-password');
const nodemailer = require("nodemailer");
//route Get api/tasks/:id

//route post api/tasks
//desc insert task
//access public
router.post(
  '/',
  [
    check('email', 'Please enter valid email').isEmail()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    try {
      //check if user email is already in the database
      let technician1 = await Technician.findOne({ email: req.body.email });
      if (technician1) {
        return res.status(400).json({ error: [{ msg: 'Technician already exits' }] });
      } else {

      //create a user
      const newTechnician = new Technician({
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        email:req.body.email,
      });

        var password = generator.generate({
            length: 10,
            strict:true,
            numbers:true,
            symbols:true,
            uppercase:true,
            excludeSimilarCharacters:true,
            exclude:"{:,;,',=}"
        }); 
        console.log(password);
        sendEmail(req.body.email,"Incident Management Portal - Your technician Credentials",
        "<p> Hello "+req.body.firstname+" "+req.body.lastname+",<br/><br/> Your password to login into the Incident Management portal is :"+password+"<br/><br/><br/> You can use this link to login : http://localhost:3000/technician </p>");

      //hash the password
      const salt = await bcrypt.genSalt(10);
      newTechnician.password = await bcrypt.hash(password, salt);
      //save the user
      const na = await newTechnician.save();
      res.send(na);
      }
    } catch (err) {
      res.status(500).send(err.message);
    } 
  }
);

async function sendEmail(to,subject,content){
    let transporter = nodemailer.createTransport({
      service:'gmail',
      auth:{
          user:'incidentmanagement2020@gmail.com',
          pass:'incident@humber'
      }
    });
    //check if technician email is already in the database
    //create new techncian
    var emails = to;
    emails = emails.split(',');
    for(const email of emails){
      var message = {
          from: 'incidentmanagement2020@gmail.com',
          to: email,
          subject: subject,
          html: content
        };
        let info = await transporter.sendMail(message);
        console.log(info);
        return "email sent";
      }
    }
module.exports = router;
