const bluebird = require("bluebird");
const jwt = bluebird.promisifyAll(require("jsonwebtoken"));

const SEC_KEY = "heyeveryonethisisnikhilforyouall";

function generateToken(userId) {
  console.log(`user id: ${userId}`);
  const payload = {
    userId: userId,
  };
  return jwt.signAsync(payload, SEC_KEY);
}

module.exports = {
  generateToken: generateToken,
};
