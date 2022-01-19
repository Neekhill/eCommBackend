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

function verifyToken(token) {
  jwt.verifyAsync(token, secretKey, (err, user) => {
    if (err) {
      throw new Error("token is not valid");
    }
    return user;
  });
}

module.exports = {
  generateToken: generateToken,
  verifyToken: verifyToken,
};
