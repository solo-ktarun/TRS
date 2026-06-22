const mongoose = require('mongoose');

const validCarSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    vehicles: [{
        type: String
    }]
});

module.exports = mongoose.model(
    'ValidCar',
    validCarSchema
);