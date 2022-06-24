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

  async update(commentId, content) {
    const statement = `update comment set content = ? where id = ?`;
    const [result] = await connection.execute(statement, [content, commentId]);
    return result;
  }

  async remove(commentId) {
    const statement = `delete from comment where id = ?`;
    const [result] = await connection.execute(statement, [commentId]);
    return result;
  }

  // 获取某一个动态下面的评论列表
  async getCommentByMomentId(momentId) {
    const statement = `
    select c.id,c.content,c.comment_id comentId,c.createAt createTime,
		JSON_OBJECT('id',u.id,'name',u.name)
		from comment c
		left join users u on u.id = c.user_id
		where c.moment_id = ?`;
    const [result] = await connection.execute(statement, [momentId]);
    return result;
  }
}

module.exports = new CommentService();
