const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    reglocation: String,
    variant: {
        type: Schema.Types.ObjectId,
        ref: 'Variant'
    },
    fuel: {
        type: Schema.Types.ObjectId,
        ref: 'Fuel'
    },
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

locationSchema.virtual('variants', {
    ref: 'Variant',
    localField: 'fuel',
    foreignField: 'fuel'
});

locationSchema.virtual('fuels', {
    ref: 'Fuel',
    localField: 'model',
    foreignField: 'model'
});

locationSchema.virtual('models', {
    ref: 'Model',
    localField: 'brand',
    foreignField: 'brand'
});
locationSchema.virtual('brands', {
    ref: 'Brand',
    localField: 'motor',
    foreignField: 'motor'
});

const RegLocation = mongoose.model("RegLocation", locationSchema);

module.exports = RegLocation;