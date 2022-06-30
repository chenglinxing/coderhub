const Router = require("koa-router");

const { avatarHandler,picturerHandler,pictureResize } = require("../middleware/file.middleware");

const { saveAvatarInfo,savePictureInfo } = require("../controller/file.controller");

const { verifyAuth } = require("../middleware/auth.middlerware");

const fileRouter = new Router({ prefix: "/upload" });

//上传头像
fileRouter.post("/avatar", verifyAuth, avatarHandler, saveAvatarInfo);

//上传图片 上传过程中处理图片
fileRouter.post("/picture", verifyAuth, picturerHandler,pictureResize, savePictureInfo);

module.exports = fileRouter;
