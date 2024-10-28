const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET_KEY;

function setUser(user) {
  return jwt.sign(
    { _id: user._id, email: user.email, role: user.role },
    secret
  );
}

function getUser(token) {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    if (!token) return null;
  }
}

module.exports = { setUser, getUser };
