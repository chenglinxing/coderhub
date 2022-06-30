const Router = require("koa-router");

const { verifyAuth } = require("../middleware/auth.middlerware");

const { create, getLabel } = require("../controller/label.controller");

const labelRouter = new Router({ prefix: "/label" });

//创建标签
labelRouter.post("/create", verifyAuth, create);

//获取标签
labelRouter.get("/getLabel", verifyAuth, getLabel);

module.exports = labelRouter;
