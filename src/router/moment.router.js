const Router = require("koa-router");

const {
  verifyAuth,
  verifyPermission,
} = require("../middleware/auth.middlerware");


//检验标签是否存在
const { verifyLabelExists} =require("../middleware/label.middleware")
const {
  create,
  detail,
  list,
  update,
  remove,
  addLabels,
  fileInfo,
  selectMoment
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


//给动态添加标签  
momentRouter.post("/:momentId/labels",verifyAuth,verifyPermission("moment"),verifyLabelExists,addLabels)

// 给动态配图  预览图片
momentRouter.get("/images/:filename",fileInfo)

//动态模糊查询
momentRouter.post("/selectMoment",verifyAuth,selectMoment)

module.exports = momentRouter;
