export const isAdmin = (req, res, next) => {
  if (req.user.role === 'admin') {
    next();
  } else {
    const error = new Error('unauthorized access');
    error.status = 403;
    next(error);
  }

  // if user role is admin next()
  // else
  // {const error = new Error('unauthorized access')}
  // error.status = 403;
  // next(error)

  // next();
};
