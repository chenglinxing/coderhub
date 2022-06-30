const connection = require("../app/database");

const { getHostName, getIp } = require("../utils/getIp");

class TestPreViewImageService {
  async addFile(fileObj) {
    // console.log(fileObj);
    const ip = getIp();
    const hostname = getHostName();
    const { filename, mimetype, fileSize } = fileObj;
    const statement = `insert into test_image(filename,mimetype,fileSize,ip,hostname) values(?,?,?,?,?)`;
    const [result] = await connection.execute(statement, [
      filename,
      mimetype,
      fileSize,
      ip,
      hostname,
    ]);
    return result;
  }
}

module.exports = new TestPreViewImageService();
