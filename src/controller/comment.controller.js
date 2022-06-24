const service = require("../service/comment.service.js");

class CommentController {
  async create(ctx, next) {
    //动态id
    const { momentId, content } = ctx.request.body;
    // 用户id
    const { id } = ctx.user;
    const result = await service.create(content, momentId, id);
    ctx.body = result;
  }

  async reply(ctx, next) {
    const { momentId, content } = ctx.request.body;
    const { commentId } = ctx.params;
    const { id } = ctx.user;
    console.log(momentId, content, commentId, id);
    const result = service.reply(momentId, content, commentId, id);
    ctx.body = result;
  }

  async update(ctx, next) {
    const { commentId } = ctx.params;
    const { content } = ctx.request.body;
    // console.log(commentId, content);
    const result = await service.update(commentId, content);
    ctx.body = result;
  }

  async remove(ctx, next) {
    const { commentId } = ctx.params;
    const result = await service.remove(commentId);
    ctx.body = result;
  }

  // 获取某一个动态下面的评论列表
  async list(ctx, next) {
    const { momentId } = ctx.query;
    const result = await service.getCommentByMomentId(momentId);
    ctx.body = result;
  }
}

module.exports = new CommentController();
