const userService = require("../service/user.service");
const fileService = require("../service/file.service");

const fs = require("fs");

const { AVATAR_PATH } = require("../constants/file-path");

class UserController {
  async create(ctx, next) {
    //获取用户请求传递的参数
    const user = ctx.request.body;
    // 查询数据
    const result = await userService.create(user);
    // 返回数据
    ctx.body = result;
  }

  //获取用户头像
  async avatarInfo(ctx, next) {
    const { userId } = ctx.params;
    const avatarInfo = await fileService.getAvatarByUserId(userId);
    // //提供图像信息(直接下载)
    // ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`);

    //提供图像信息  （图片预览）
    ctx.response.set("content-type",avatarInfo.mimetype)
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`);
  }
}

module.exports = new UserController();
