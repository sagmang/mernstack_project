const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const variantSchema = new Schema({
    variant: String,
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

variantSchema.virtual('fuels', {
    ref: 'Fuel',
    localField: 'model',
    foreignField: 'model'
});

variantSchema.virtual('models', {
    ref: 'Model',
    localField: 'brand',
    foreignField: 'brand'
});
variantSchema.virtual('brands', {
    ref: 'Brand',
    localField: 'motor',
    foreignField: 'motor'
});

const Variant = mongoose.model("Variant", variantSchema);

module.exports = Variant;