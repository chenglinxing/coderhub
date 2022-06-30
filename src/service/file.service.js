const connection = require("../app/database");

class FileService {
  //新建头像
  async createAvatar(filename, mimetype, size, userId) {
    const statement = `insert into avatar(filename,mimetype,size,user_id) values(?,?,?,?)`;
    const [result] = await connection.execute(statement, [
      filename,
      mimetype,
      size,
      userId,
    ]);
    return result;
  }

  //获取头像
  async getAvatarByUserId(userId) {
    const statement = `select * from avatar where user_id = ?`;
    const [result] = await connection.execute(statement, [userId]);
    return result[0];
  }

  //新建图片
  async createFile(filename, mimetype, size, userId, momentId) {
    const statement = `insert into file(filename,mimetype,size,user_id,moment_id) values(?,?,?,?,?)`;
    const [result] = await connection.execute(statement, [
      filename,
      mimetype,
      size,
      userId,
      momentId,
    ]);
    return result;
  }

  //获取文件信息
  async getFileByFileName(filename){
    const statement = `select * from file where filename = ?`;
    const [result] = await connection.execute(statement, [filename]);
    return result[0];
  }
}

module.exports = new FileService();
