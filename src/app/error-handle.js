const errorType = require("../constants/error-types");

const errorHandler = (error, ctx) => {
  let status, message;
  switch (error.message) {
    case errorType.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400;
      message = "用户名或密码不能为空！";
      break;
    case errorType.USER_ALREADY_EXISTS:
      status = 409;
      message = "用户名已经存在！";
      break;
    case errorType.USER_DOES_NOT_EXISTS:
      status = 400;
      message = "用户名不存在！";
      break;
    case errorType.PASSWORD_IS_INCORRENT:
      status = 400;
      message = "密码错误！";
      break;
    case errorType.UNAUTHORIZATION:
      status = 401;
      message = "无效的token~";
      break;
    case errorType.UNPERMISSION:
      status = 401;
      message = "不具备操作权限~";
      break;
    case errorType.PARAMETER_ERROR:
      status = 401;
      message = "参数错误或参数不存在";
      break;
    default:
      status = 404;
      message = "NOT FOUND!";
  }

  ctx.status = status;
  ctx.body = message;
};

module.exports = errorHandler;
