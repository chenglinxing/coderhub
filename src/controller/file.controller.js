const { AVATAR_PATH, PICTURE_PATH } = require("../constants/file-path");
const fileService = require("../service/file.service");
const userService = require("../service/user.service");
const { APP_HOST, APP_PORT } = require("../app/config");

class FileController {
  //获取头像相关信息
  async saveAvatarInfo(ctx, next) {
    //1.获取图片相关信息
    const { filename, mimetype, size } = ctx.req.file;
    const { id: userId } = ctx.user;
    //2.将图像信息保存到数据库中
    const result = await fileService.createAvatar(
      filename,
      mimetype,
      size,
      userId
    );
    //3.将图片地址保存到users表中
    const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${userId}/avatar`;
    await userService.updateAvatarById(avatarUrl, userId);
    ctx.body = "用户头像上传成功！";
  }

  //获取图片信息
  async savePictureInfo(ctx, next) {
    //1.获取图片相关信息
    const files = ctx.req.files;
    const { id: userId } = ctx.user;
    const { momentId } = ctx.query;
    
    //2.将图像信息保存到数据库中
    for (let file of files) {
      const { filename, mimetype, size } = file;
      await fileService.createFile(filename, mimetype, size, userId, momentId);
    }
    ctx.body = "动态配图上传完成"
    //3.将图片地址保存到users表中
    // const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${userId}/picture`;
  }
}

module.exports = new FileController();
