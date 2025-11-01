const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    BID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
        },
    
   EquipId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Equipment',
        required: true
        },

    LID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
        },
    
   
});

const BookModel = mongoose.model('booking', BookSchema);
module.exports = BookModel;