const connection = require("../app/database");

class AuthService {
  //是否存在修改
  async checkSource(tableName, momentId, userId) {
    const statment = `select * from ${tableName} where id = ? and user_id = ?`;
    const [result] = await connection.execute(statment, [momentId, userId]);
    // console.log(result);
    return result?.length > 0;
  }
}

module.exports = new AuthService();
