const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

let Technician = require('../models/Technician');


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
        let technician1 = await Technician.findOne({ email: req.body.email});
        
        if (technician1) {
            let hash = technician1.password;
            bcrypt.compare(req.body.password, hash, function(err, result) {
                if(result){
                        //generate token
                        const payload = {
                        technician: {
                            id: technician1.id,
                            email:technician1.email,
                            firstName: technician1.firstName
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
            return res.status(400).json({ errors: [{ msg: 'Technician does not exists.' }] });
        }
  
      } catch (err) {
        res.status(500).send(err.message);
      }
    }
  );

module.exports = router;