const handlerError = (err, req, res, next) => {
    res.send({ message: err.message });
  };
  
  module.exports = handlerError;