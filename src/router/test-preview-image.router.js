const Router = require("koa-router");

const testPreviewImageRouter = new Router({ prefix: "/preview" });

const { previewImage } = require("../controller/test-preview-image.controller");

const {
  downloadImage,
} = require("../middleware/test-preview-image.middleware");

//预览图片  先下载再从文件夹里面取并预览
testPreviewImageRouter.get("/iamge", downloadImage, previewImage);

module.exports = testPreviewImageRouter;
