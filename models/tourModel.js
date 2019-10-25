const mongoose = require('mongoose');

const tourScheme = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour field must have a name'],
    unique: true,
    trim: true
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have durations']
  },
  maxGroupSize: {
    type: Number,
    require: [true, 'A tour must have amaxGroupSize']
  },
  difficulty: {
    type: String,
    required: [true, 'A tour should have a difficulty']
  },
  rating: {
    type: Number,
    default: 4.5
  },
  ratingQuantity: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: [true, 'A tour field must have a price']
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour field must have a description']
  },
  description: {
    type: String,
    trim: true
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image']
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now()
  },
  startDates: [Date]
});

const Tour = mongoose.model('Tour', tourScheme);

module.exports = Tour;
