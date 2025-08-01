const { randomUUID } = require('crypto');

function isValidUUID(uuid) {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}


function generateUUID() {
  return randomUUID();
}

module.exports = {
  isValidUUID,
  generateUUID
};
