const Router = require("koa-router");

const {
  verifyAuth,
  verifyPermission,
} = require("../middleware/auth.middlerware");

const { create, reply, update,remove,list } = require("../controller/comment.controller");

const commentRouter = new Router({ prefix: "/comment" });

//创建评论
commentRouter.post("/", verifyAuth, create);
//评论之前的评论
commentRouter.post("/:commentId/reply", verifyAuth, reply);
//修改评论
commentRouter.patch("/:commentId/update", verifyAuth,verifyPermission("comment"), update);
//删除评论
commentRouter.delete("/:commentId/remove", verifyAuth,verifyPermission("comment"), remove);
//获取评论列表
commentRouter.get("/getCommentList", list);
module.exports = commentRouter;
