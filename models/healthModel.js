const mongoose = require("mongoose");

const HealthDataSchema = {
    health_gender: String,
    health_daughter_count: { type: Number, default: 0 },
    health_son_count: { type: Number, default: 0 },
    health_age_details: {
      ...(new Array(4)).fill(null).reduce((acc, _, idx) => {
        if (idx < this.health_daughter_count) {
          acc[`daughter${idx + 1}`] = Number;
        }
        if (idx < this.health_son_count) {
          acc[`son${idx + 1}`] = Number;
        }
        return acc;
      }, {}),
      ...(typeof mother === 'number' ? { mother: Number } : {}),
      ...(typeof father === 'number' ? { father: Number } : {})
    },
    health_address_details: {
      self_pin: String,
      parent_pin: String,
      ischecked: Boolean,
      mobile_number: String
    }
};
  

const Health = mongoose.model("Health", HealthDataSchema);

module.exports = Health;