const mongoose = require('mongoose');
const { Schema } = mongoose;

const whatsappSchema = new Schema({
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  response: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Whatsapp = mongoose.model('Whatsapp', whatsappSchema);

module.exports = Whatsapp;
