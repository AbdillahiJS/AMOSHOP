const jwt =require('jsonwebtoken')
 
 
 const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    jwt.verify(token, 'mysecret', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token verification failed' });
      }
  
      req.userId = decoded.id;
      next();
    });
  };

  module.exports =verifyToken