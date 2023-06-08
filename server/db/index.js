const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/contractors');

const db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('open', () => {
  console.log('mongoose connected successfully');
});

const contractorSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  addressLine1: String,
  addressLine2: String,
  city: String,
  state: String,
  zip: String,
  displayName: String,
  description: String,
  profilePic: [String],
  pricing: String,
  skills: [String],
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

contractorSchema.index({ location: '2dsphere' }, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('created index');
  }
});

const Contractor = mongoose.model('Contractor', contractorSchema);

module.exports = Contractor;
