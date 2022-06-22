const crypto = require("crypto");

const md5password = (password) => {
  const md5 = crypto.createHash("md5");
  const result = md5.update(password, "utf8").digest("hex");
  console.log(result,'result');
  return result;
};

module.exports = md5password;
