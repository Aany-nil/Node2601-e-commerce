const crypto = require("crypto");

function isValidEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
}



module.exports = { isValidEmail, generateOTP }