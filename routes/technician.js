const express = require('express');
const router = express.Router();

let Technician = require('../models/Technician');

router.get('/',  async (req, res) => {
  try {
    const techDb = await Technician.find();
    res.send(techDb);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.delete('/:id', async (req, res) => {
    try {
        await Technician.findByIdAndRemove({ _id: req.params.id });
        res.json({ msg: 'Technician deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
});

module.exports = router;