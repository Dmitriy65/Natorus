const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<DATABASE_PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('DB connection successful!')
  });

const tourScheme = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour field must have a name'],
    unique: true
  },
  rating: {
    type: Number,
    default: 4
  },
  price: {
    type: Number,
    required: [true, 'A price field must have a price']
  }
});

const Tour = mongoose.model('Tour', tourScheme);
Tour.deleteMany();
const tourOne = new Tour({
  name: 'Mountain Hiker Tour',
  rating: 4.5,
  price: 450
});

tourOne
  .save()
  .then(doc => {
    console.log(doc);
    console.log("success");
  })
  .catch(err => {
    console.log(err);
  })


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

