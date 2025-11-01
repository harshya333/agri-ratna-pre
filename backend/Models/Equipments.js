const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EquipSchema = new Schema({

    type: {
        type:String,
        enum: ['tractor', 'harvester', 'plough', 'sprayer'],
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    pricePerDay: {
        type:Number,
        required:true,
    },
    location: {
        type: String,
        required: true,
    },
    Lender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
    },

    image:{
        type:String,
        required :true,
    }
},{ timestamps: true });

const EquipModel = mongoose.model('equipment', EquipSchema);
module.exports = EquipModel;