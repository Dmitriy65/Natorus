const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.getTour = (req, res) => {
  
  const id = Number(req.params.id);
  const tour = tours.find(tour => tour.id === id);

  if (!tour) {
    res.status(404).json({
      status: 'fail',
      message: 'invalid id'
    });
  }
  
  res.status(200).json({
    status: 'success',
    data: {
      tour
  }
});

}

exports.createTour = (req, res) => {

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  console.log(tours);
  
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  });
}

exports.deleteTour = (req, res) => {

  const id = Number(req.params.id);
  const tour = tours.find(tour => tour.id === id);

  if (tour) {
    res.status(200).json({
      status: 'success',
      data: null
    });
  } 

  res.status(404).json({
      status: 'fail',
      message: 'cant delete tour'
    });
} 

exports.updateTour = (req, res) => {

  const id = Number(req.params.id);
  const tour = tours.find(tour => tour.id === id);

  if (tour) {
    res.status(200).json({
      status: 'success',
      message: 'updated'
    });
  } 
  
  res.status(404).json({
      status: 'fail',
      message: 'cant update tour'
  });
 } 


exports.getAllTours = (req, res) => {
  res.status(200).json({
        status: 'success',
        length: tours.length,
        data: { tours }
  });
}

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body .price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price'
    });
  }  
  next();
}