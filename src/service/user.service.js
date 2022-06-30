const connection = require("../app/database");

class UserService {
  //创建用户
  async create(user) {
    console.log("创建用户：", user);
    const { name, password } = user;
    const statment = `insert into users (name,password) values(?,?)`;

    const result = await connection.execute(statment, [name, password]);
    //将user存入数据库中
    return result;
  }

  //查询用户
  async getUserByName(name) {
    const statement = `select * from users where name = ?`;
    const result = await connection.execute(statement, [name]);
    return result[0];
  }

  //更新头像
  async updateAvatarById(avatarUrl, id) {
    const statement = `update users set avatar_url = ? where id = ?`;
    const [result] = await connection.execute(statement, [avatarUrl, id]);
    return result;
  }
}

module.exports = new UserService();
