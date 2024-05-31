const bcrypt = require("bcrypt");
const HashPassword = async (password) => {
  const saltRounds = 10;
  return bcrypt
    .hash(password, saltRounds)
    .then((res) => res)
    .catch((er) => er);
};

const ComparePassword = async (password, hashPassword) => {
  try {
    const compare = await bcrypt.compare(password, hashPassword);
    return compare;
  } catch (error) {
    throw error;
  }
};
module.exports = { HashPassword, ComparePassword };
