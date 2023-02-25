const mongoose = require("mongoose");

const motorSchema = {
    motor: String
}

const Motor = mongoose.model("Motor", motorSchema);

module.exports = Motor;