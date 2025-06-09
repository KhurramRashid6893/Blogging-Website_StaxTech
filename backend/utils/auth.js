const jwt = require("jsonwebtoken");

const SECRET = "your_secret_key"; // Replace with .env secret in real apps

function generateToken(user) {
  return jwt.sign({ id: user._id, email: user.email }, SECRET, {
    expiresIn: "7d",
  });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}

module.exports = { generateToken, verifyToken };
