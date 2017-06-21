const jwtDecode = require('jwt-decode');

const getTokenPayload = token => jwtDecode(token);

function isTokenValid(exp) {
  const currentTime = Math.floor(Date.now() / 1000);
  return exp > currentTime;
}

exports.getTokenPayload = getTokenPayload;
exports.isTokenValid = isTokenValid;
