const mongoose = require('mongoose');
const ConsultantSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  bio: String,
  specialties: [String],
  fee: Number,
  imageUrl: String,
  location: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Consultants', ConsultantSchema);
