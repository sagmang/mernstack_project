const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const modelSchema = new Schema({
    model: String,
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

modelSchema.virtual('brands', {
    ref: 'Brand',
    localField: 'motor',
    foreignField: 'motor'
});

const Model = mongoose.model("Model", modelSchema);

module.exports = Model;
