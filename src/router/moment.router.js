const Router = require("koa-router");

const {
  verifyAuth,
  verifyPermission,
} = require("../middleware/auth.middlerware");

const {
  create,
  detail,
  list,
  update,
  remove,
} = require("../controller/moment.controller");

const momentRouter = new Router({ prefix: "/moment" });

//添加动态接口
momentRouter.post("/", verifyAuth, create);
//获取某一条动态接口
momentRouter.get("/:momentId", detail);
//查询所有的接口 支持分页
momentRouter.get("/", list);
//修改动态  1.用户必须登录  2.用户是否有权限修改
momentRouter.patch("/update/:momentId", verifyAuth, verifyPermission("moment"), update);
//删除动态
momentRouter.delete("/remove/:momentId", verifyAuth, verifyPermission("moment"), remove);

module.exports = momentRouter;
