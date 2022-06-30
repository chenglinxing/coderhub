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
    JSON_OBJECT('id',u.id,'name',u.name,'avatar',u.avatar_url) user,
		(select COUNT(*) from comment c where c.moment_id = m.id) commentCount,
		(select if(count(c.id),JSON_ARRAYAGG(
			JSON_OBJECT('id',c.id,'content',c.content,'commentId',c.comment_id,'createTime',c.createAt,
									'user',JSON_OBJECT('id',cu.id,'name',cu.name,'avatar',cu.avatar_url))
		) ,null) from comment c left join users cu on c.user_id = cu.id where m.id = c.moment_id)  cmoments,
		if(count(l.id),JSON_ARRAYAGG(JSON_OBJECT('id',l.id,'name',l.name)),JSON_ARRAY()) labels,
    (select JSON_ARRAYAGG(concat('http://localhost:8000/moment/images/',file.filename)) 
		from file where m.id = file.moment_id) images
    from moment m 	
    left join users u on m.user_id = u.id
		left join moment_label ml on m.id = ml.moment_id
		left join label l on ml.label_id = l.id
		where m.id = ?
		GROUP BY m.id
    `;
    try {
      const [result] = await connection.execute(statement, [id]);
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }

  //获取所有的动态 支持分页
  async getMoementList(offset, size) {
    const statement = `
    select m.id id,m.content content,m.createAt createTime,m.updateAt updateTime,
    JSON_OBJECT('id',u.id,'name',u.name) user,
    (select COUNT(*) from comment c where c.moment_id = m.id) commentCount,
    (select count(*) from moment_label ml where m.id = ml.moment_id) labelCount,
    (select JSON_ARRAYAGG(concat('http://localhost:8000/moment/images/',file.filename)) 
		from file where m.id = file.moment_id) images
    from moment m
    left join users u on m.user_id = u.id
    limit ?,?
    `;
    const [result] = await connection.execute(statement, [offset, size]);
    return result;
  }

  //更新动态
  async update(content, momonentId) {
    const statement = `update moment set content = ? where id = ?`;
    const [result] = await connection.execute(statement, [content, momonentId]);
    return result;
  }

  //删除动态
  async remove(momentId) {
    const statement = `delete from moment where id = ?`;
    const [result] = await connection.execute(statement, [momentId]);
    return result;
  }

  //查询动态是否包含该标签
  async hasLabel(momentId, labelId) {
    const statement = `select * from moment_label where moment_id = ? and label_id = ?`;
    const [result] = await connection.execute(statement, [momentId, labelId]);
    return result[0] ? true : false;
  }

  async addLabel(momentId, labelId) {
    const statement = `insert into moment_label(moment_id,label_id) values(?,?);`;
    const [result] = await connection.execute(statement, [momentId, labelId]);
    return result;
  }
}

module.exports = new MomentService();
