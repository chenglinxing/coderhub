const Router = require("koa-router");

const {
  verifyAuth,
  verifyPermission,
} = require("../middleware/auth.middlerware");

const { create, reply, update } = require("../controller/comment.controller");

const commentRouter = new Router({ prefix: "/comment" });

//创建评论
commentRouter.post("/", verifyAuth, create);
//评论之前的评论
commentRouter.post("/:commentId/reply", verifyAuth, reply);
//修改评论
commentRouter.patch("/:commentId/update", verifyAuth, update);
module.exports = commentRouter;
