const connection = require("../app/database");

class LabelService {
  async create(name) {
    const statement = `insert into label(name) values(?)`;
    const [result] = await connection.execute(statement, [name]);
    return result;
  }

  //查询是否存在标签
  async getLabelByName(name) {
    const statement = `select * from label where name = ?`;
    const [result] = await connection.execute(statement, [name]);
    return result[0]
  }

  //获取标签
  async getLabel(limit, offset){
    const statement = `select * from label limit ?,?`
    const [result] = await connection.execute(statement, [offset,limit]);
    return result
  }
}

module.exports = new LabelService();
