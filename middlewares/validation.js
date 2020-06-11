const validation = (schema) => {
 
    return (req, res, next) => {
     
      const { _id, ...modelProps } = req.body;
      const { error, value } = schema.validate(modelProps, { allowUnknown: true });
     
      if (error) {
        res.status(400);
        throw new Error(error.message);
      }
    
      return next();
    };
  };
  
  module.exports = validation;