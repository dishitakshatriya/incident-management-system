const express = require('express');
const { check, validationResult } = require('express-validator');

let Priority = require('../models/Priority');

const router = express.Router();


router.get('/',  async (req, res) => {
  try {
    const PriorityDb = await Priority.find();
    res.send(PriorityDb);
  } catch (err) {
    res.status(500).send('Server error');
  }
});


router.get('/:id', async (req, res) => {
  try {
    const priority = await Priority.findById({_id:req.params.id});
    if (!priority) {
      return res.status(404).send('Priority not found');
    }
    res.send(priority);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.post(
  '/',
  [
    check('type', 'type is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      console.log(req.body);
      const newPriority = new Priority({
        type: req.body.type
      });

      const np = await newPriority.save();
      res.send(np);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

// router.delete('/', async (req, res) => {
//   try {
//     // find the element
//     const StatusDb = await Status.find();
//     await StatusDb.findByIdAndRemove({ _id: req.body.id });
//     res.json({ msg: 'Status deleted' });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });


// router.put('/', async (req, res) => {
//   try {
//     const statusup = await Task.findById(req.body.id);

//     statusup.status = req.body.status;
//     await statusup.save();

//     res.send('Status updated');
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send('Server error');
//   }
// });

module.exports = router;