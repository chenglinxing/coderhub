const connection = require("../app/database");

class CommentService {
  async create(content, momentId, userId) {
    const statement = `insert into comment(content,moment_id,user_id) values(?,?,?)`;
    const [result] = await connection.execute(statement, [
      content,
      momentId,
      userId,
    ]);
    return result;
  }

  async reply(momentId, content, commentId, userId) {
    const statement = `insert into comment(content,moment_id,comment_id,user_id) values(?,?,?,?)`;
    const [result] = await connection.execute(statement, [
      content,
      momentId,
      commentId,
      userId,
    ]);
    return result;
  }
}

module.exports = new CommentService();
