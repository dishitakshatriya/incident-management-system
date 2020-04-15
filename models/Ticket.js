const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notesSchema = new mongoose.Schema({
    notesWritten:String
});


const TicketSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  domain:{
    type: Schema.Types.ObjectId,
    ref: 'domain'
  },
  status:{
    type: Schema.Types.ObjectId,
    ref: 'status'
  },
  priority:{
    type: Schema.Types.ObjectId,
    ref: 'priority'
  },
  notes:[
    notesSchema
  ],
  solution: {
    type: String
  },
  technicianAssigned: {
    type: String
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  closeDate: {
    type: Date
  },
  createdBy:{
    type: String
  }
});

const Ticket = mongoose.model('ticket', TicketSchema);

module.exports = Ticket;