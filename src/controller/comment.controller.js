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
    console.log(commentId, content);
    ctx.body = "修改评论" + commentId + content;
  }
}

module.exports = new CommentController();
