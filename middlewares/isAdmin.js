const User = require('../models/User')

const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.user.id)
  if (user.role === 'admin') {
    next()
  } else {
    res.status(403).json({ message: 'You are not authorized to access this route' })
  }
}


module.exports = isAdmin