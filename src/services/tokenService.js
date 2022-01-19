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

async function verifyToken(token) {
  try {
    const user = await jwt.verify(token, SEC_KEY);
    //this gives a object which contains "userId" and because at the time of generating token our payload was { userId: userId}
    return user;
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  generateToken: generateToken,
  verifyToken: verifyToken,
};
