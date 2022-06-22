const Router = require("koa-router");

const authRouter = new Router();

const { login, success } = require("../controller/auth.controller.js");

//中间件=> 校验用户名及密码
const { verifyLogin, verifyAuth } = require("../middleware/auth.middlerware");

authRouter.post("/login", verifyLogin, login);
authRouter.get("/test", verifyAuth, success);

module.exports = authRouter;
