const mongoose = require('mongoose');
const slugify = require('slugify');

const tourScheme = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour field must have a name'],
    unique: true,
    trim: true,
    maxlength: [40, 'less or equal to 40 symbols'],
    minlength: [10, 'more or equal to 10 symbols']
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
    required: [true, 'A tour should have a difficulty'],
    enum: {
      values: ['easy', 'medium', 'difficulty'],
      message: 'can be easy or medium or difficulty'
    }
  },
  rating: {
    type: Number,
    default: 4.5,
    min: [1, 'rating should be above 1'],
    max: [5, 'rating should be below 5']
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
  startDates: [Date],
  slug: String
});

tourScheme.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Tour = mongoose.model('Tour', tourScheme);

module.exports = Tour;
