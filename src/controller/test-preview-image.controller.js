const fs = require("fs");

const { addFile } = require("../service/test-preview.iamge.service");
class TestPreviewImageController {
  //预览图片
  async previewImage(ctx, next) {
    // 获取fileObj
    const fileObj = ctx.fileObj;
    // 设置响应头
    ctx.response.set("content-type", fileObj.mimetype);
    //当不存在size参数
    if (!ctx.query?.size) {
      //入库
      await addFile(fileObj);
      //返回图片
      ctx.body = fs.createReadStream(`${fileObj.destPath}`);
    } else {
      // 获取size
      const [sizeX, sizeY] = ctx.query?.size?.split("x");
      // //2.设置响应头
      // ctx.response.set("content-type", fileObj.mimetype);
      //入库
      await addFile(fileObj);
      //3.返回图片
      ctx.body = fs.createReadStream(`${fileObj.destPath}__${sizeX}_${sizeY}`);
    }
  }
}

module.exports = new TestPreviewImageController();
