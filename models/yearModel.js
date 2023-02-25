const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const yearSchema = new Schema({
    regyear: String,
    reglocation: {
        type: Schema.Types.ObjectId,
        ref: 'RegLocation'
    },
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

yearSchema.virtual('reglocations', {
    ref: 'RegLocation',
    localField: 'Variant',
    foreignField: 'Variant'
});

yearSchema.virtual('variants', {
    ref: 'Variant',
    localField: 'fuel',
    foreignField: 'fuel'
});

yearSchema.virtual('fuels', {
    ref: 'Fuel',
    localField: 'model',
    foreignField: 'model'
});

yearSchema.virtual('models', {
    ref: 'Model',
    localField: 'brand',
    foreignField: 'brand'
});
yearSchema.virtual('brands', {
    ref: 'Brand',
    localField: 'motor',
    foreignField: 'motor'
});

const RegYear = mongoose.model("RegYear", yearSchema);

module.exports = RegYear;