const express = require('express');
const router = express.Router();
let Ticket = require('../models/Ticket');
const auth = require('../middleware/auth');

router.get('/',  async (req, res) => {
    try {
      const TicketDb = await Ticket.find();
      res.send(TicketDb);
    } catch (err) {
      res.status(500).send('Server error');
    }
  });

router.post('/', async (req,res) => {
    try{
        console.log(req.body);
        const ticket = new Ticket({
                description:req.body.description,
                domain:req.body.domain,
                status:req.body.status,
                priority:req.body.priority,
                notes:req.body.notes,
                notesWritten:req.body.notesWritten,
                technicianAssigned: req.body.technicianAssigned,
                createdBy:req.body.createdBy
        });
        const nt = await ticket.save();
        res.send(nt);
        
    }catch(err){
        res.status(500).send(err);
    }
});

//update ticket
router.put('/updateTicket/:id', async (req,res) => {
  try{
      const ticket = await Ticket.findById({_id: req.params.id });
      if (!ticket) {
          return res.status(404).send('Ticket not found');
        }
        ticket.status = req.body.status;
        ticket.solution = req.body.solution;
        if(ticket.notes.length>0){
            ticket.notes.push({'notesWritten':req.body.notesWritten});
        }else{
            // ticket.notes=req.body.notes;
            ticket.notesWritten=req.body.notesWritten;
        }

      const nt = await ticket.save();
      res.send(nt);
      
  }catch(err){
    console.log(err.message);
  }
});

//update ticket by Admin
router.put('/updateByAdmin/:id', async (req,res) => {
  try{
      const ticket = await Ticket.findById({_id: req.params.id });
      if (!ticket) {
          return res.status(404).send('Ticket not found');
        }
        ticket.status = req.body.status;
        if(ticket.notes.length>0){
            ticket.notes.push({'notesWritten':req.body.notesWritten});
        }else{
            // ticket.notes=req.body.notes;
            ticket.notesWritten=req.body.notesWritten;
        }

      const nt = await ticket.save();
      res.send(nt);
      
  }catch(err){
    console.log(err.message);
  }
});

//get ticket by id
router.get('/:id', async (req, res) => {
  try {
      const ticket = await Ticket.findById({ _id: req.params.id });
      res.send(ticket);
  } catch (err) {
      res.status(500).send(err.message);
  }
});

module.exports = router;