const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

let Admin = require('../models/Admin');


router.post(
    '/',
    [
      check('email', 'Please enter valid email').isEmail(),
      check('password', 'Password is required').exists()
    ],
    async(req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
  
      try {
        let admin1 = await Admin.findOne({ email: req.body.email});
        
        if (admin1) {
            let hash = admin1.password;
            bcrypt.compare(req.body.password, hash, function(err, result) {
                if(result){
                        //generate token
                        const payload = {
                        admin: {
                            id: admin1.id,
                            firstName: admin1.firstName
                        }
                    };
  
                        jwt.sign(
                        payload,
                        config.get('jwtsecret'),
                        { expiresIn: 360000 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({ token });
                        }
                        );
                }
                else{
                    return res.status(400).json({ errors: [{ msg: 'Incorrect password.' }] });
                }
            });
        }else{
            return res.status(400).json({ errors: [{ msg: 'Admin does not exists.' }] });
        }
  
      } catch (err) {
        res.status(500).send(err.message);
      }
    }
  );

module.exports = router;