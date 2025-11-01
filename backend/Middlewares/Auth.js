const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({
      success: false,
      message: 'Unauthorized, Bearer token required',
    });
  }

  const token = authHeader.split(' ')[1]; // ✅ extract actual token only

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ✅ attach user info to request
    next();
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: 'Unauthorized, invalid or expired token',
    });
  }
};

module.exports = ensureAuthenticated;
