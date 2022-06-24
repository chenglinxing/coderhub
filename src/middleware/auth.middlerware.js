const jwt = require("jsonwebtoken");

const errorType = require("../constants/error-types");
const service = require("../service/user.service");
const md5password = require("../utils/password-handle");

const { PUBLIC_KEY } = require("../app/config");
const authService = require("../service/auth.service");

// 验证登录
const verifyLogin = async (ctx, next) => {
  //1.获取用户名和密码
  const { name, password } = ctx.request.body;

  //2.判断用户名或密码是否为空
  if (!name || !password) {
    const err = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", err, ctx);
  }

  //3.判断用户是否存在
  const result = await service.getUserByName(name);
  const user = result[0];

  if (!user) {
    const err = new Error(errorType.USER_DOES_NOT_EXISTS);
    return ctx.app.emit("error", err, ctx);
  }

  //4.判断密码是否与数据库密码一致(加密)
  if (md5password(password) !== user.password) {
    const err = new Error(errorType.PASSWORD_IS_INCORRENT);
    return ctx.app.emit("error", err, ctx);
  }
  ctx.user = user;
  await next();
};

//验证授权
const verifyAuth = async (ctx, next) => {
  console.log("验证授权的middleware");
  //获取token
  // console.log(ctx.header);
  const authorization = ctx.header.authorization;
  if (!authorization) {
    const error = new Error(errorType.UNAUTHORIZATION);
    return ctx.app.emit("error", error, ctx);
  }
  const token = authorization?.replace("Bearer ", "");
  //验证token
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    ctx.user = result;
    console.log("token验证通过");
    await next();
  } catch (err) {
    console.log(err);
    const error = new Error(errorType.UNAUTHORIZATION);
    return ctx.app.emit("error", error, ctx);
  }
};

//验证用户是否有权限操作动态相关
//方法一：借助闭包自定义传入tableName
const verifyPermission = (tableName) => {
  return async (ctx, next) => {
    console.log("验证权限");
    //获取momentId
    const [resourceKey] = Object.keys(ctx.params);
    const id = ctx.params[resourceKey];
    //获取用户id
    const { id: userId } = ctx.user;
    console.log(userId,id);
    //查询是否具备权限
    try {
      const isPermission = await authService.checkSource(
        tableName,
        id,
        userId
      );
      if (!isPermission) throw new Error();
      await next();
    } catch (err) {
      const error = new Error(errorType.UNPERMISSION);
      return ctx.app.emit("error", error, ctx);
    }
  };
};

module.exports = { verifyLogin, verifyAuth, verifyPermission };
