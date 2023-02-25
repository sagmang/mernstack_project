const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const brandSchema = {
    brand: String,
    motor:
    {
        type: Schema.Types.ObjectId,
        ref: 'Motor'
    }
}

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;