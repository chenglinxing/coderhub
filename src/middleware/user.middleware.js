const errorType = require("../constants/error-types");
const service = require("../service/user.service");
const md5password = require("../utils/password-handle");

//处理用户名密码
const verifyUser = async (ctx, next) => {
  //1.获取用户名密码
  const { name, password } = ctx.request.body;
  // 2.判断用户名或密码不能为空
  if (!name || !password) {
    const err = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", err, ctx);
  }

  // 3.判断这次注册的用户名是否注册过
  const result = await service.getUserByName(name);
  if (result?.length) {
    const err = new Error(errorType.USER_ALREADY_EXISTS);
    return ctx.app.emit("error", err, ctx);
  }

  await next();
};

//给密码加密
const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  console.log(password);
  ctx.request.body.password = md5password(password);
  await next();
};

module.exports = { verifyUser, handlePassword };
