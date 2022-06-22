const connection = require("../app/database");

class MomentService {
  //创建动态
  async create(userId, content) {
    const statement = `insert into moment(content,user_id) values(?,?);`;
    const [result] = await connection.execute(statement, [content, userId]);
    return result;
  }

  //   根据momentId查询
  async getMomentById(id) {
    const statement = `
    select m.id id,m.content content,m.createAt createTime,m.updateAt updateTime,
    JSON_OBJECT('id',u.id,'name',u.name) user
    from moment m
    left join users u on m.user_id = u.id
    where m.id = ${id}
    `;
    const [result] = await connection.execute(statement, [id]);
    return result[0];
  }

  //获取所有的动态 支持分页
  async getMoementList(offset, size) {
    const statement = `
    select m.id id,m.content content,m.createAt createTime,m.updateAt updateTime,
    JSON_OBJECT('id',u.id,'name',u.name) user
    from moment m
    left join users u on m.user_id = u.id
    limit ?,?
    `;
    const [result] = await connection.execute(statement, [offset,size]);
    return result;
  }
}

module.exports = new MomentService();
