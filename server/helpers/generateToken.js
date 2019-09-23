const jwt = require('jsonwebtoken');
const util = require('util');
util.promisify(jwt.sign);
exports.generateToken = async ({_id, name, email}) => {
  const payload = {
    id: _id,
    name
  };
  const token = await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: 3600
  });

  return token;
};
