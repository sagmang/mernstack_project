const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CarDetailSchema = new mongoose.Schema({
    motor: String,
    brand: String,
    model: String,
    fuel: String,
    variant: String,
    reglocation: String,
    year: String
  });
  
const CarDetail = mongoose.model('CarDetail', CarDetailSchema);

module.exports = CarDetail;