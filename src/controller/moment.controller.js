const momentService = require("../service/moment.service");

class MomentController {
  async create(ctx, next) {
    //1.获取用户id content
    const userId = ctx.user.id;
    const content = ctx.request.body.content;
    console.log(userId, content);

    //2.将数据插入到数据库中
    const result = await momentService.create(userId, content);
    ctx.body = result;
  }

  // 根据id获取详情
  async detail(ctx, next) {
    //1.获取某一条动态详情 获取momentId
    const momentId = ctx.params.momentId;
    //2.根据momentId查询
    const result = await momentService.getMomentById(momentId);
    ctx.body = result;
  }

  // 获取所有的动态 支持分页
  async list(ctx, next) {
    //1.获取某一条动态详情 获取momentId
    const { offset, size } = ctx.query;
    console.log(offset, size);
    //2.根据momentId查询
    const result = await momentService.getMoementList(offset, size);
    ctx.body = result;
  }

  //修改动态
  async update(ctx, next) {
    //获取动态id
    const momentId = ctx.params.momentId;
    // 获取动态内容
    const { content } = ctx.request.body;
    const result = await momentService.update(content, momentId);
    ctx.body = result;
  }

  async remove(ctx, next) {
    //获取动态id
    const momentId = ctx.params.momentId;
    const result = await momentService.remove( momentId);
    ctx.body = result;
  }
}

module.exports = new MomentController();
