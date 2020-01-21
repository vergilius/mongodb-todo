const jwt = require('jsonwebtoken');
const config = require('./config.json'); // this ideally should be mocked/replaced in tests

const authMiddleware = (req, res, next) => {
  const token = req.headers['x-auth-token'];

  if (!token) {
    return res.status(403).send({message: 'No token provided.'});
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(500).send({message: 'Failed to authenticate token.'});
    }

    req.userId = decoded.id;

    next();
  });
}

export default authMiddleware;
