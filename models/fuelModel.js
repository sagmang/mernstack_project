const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fuelSchema = new Schema({
    fuel: String,
    model: {
        type: Schema.Types.ObjectId,
        ref: 'Model'
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'Brand'
    },
    motor: {
        type: Schema.Types.ObjectId,
        ref: 'Motor'
    }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

fuelSchema.virtual('models', {
    ref: 'Model',
    localField: 'brand',
    foreignField: 'brand'
});
fuelSchema.virtual('brands', {
    ref: 'Brand',
    localField: 'motor',
    foreignField: 'motor'
});

const Fuel = mongoose.model("Fuel", fuelSchema);

module.exports = Fuel;
