const axios = require("axios");
const fs = require("fs");
const jimp = require("jimp");

const { TEST_IMAGE_PATH } = require("../constants/file-path");

const { getDate } = require("../utils/date");

const errorType = require("../constants/error-types");

/**
 * 根据参数中传入的url size去返回根据size切割号的图片 如果没传入size则
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
//下载图片
const downloadImage = async (ctx, next) => {
  try {
    //判断url是否存在
    if (!ctx.query?.url) {
      const error = new Error(errorType.PARAMETER_ERROR);
      return ctx.app.emit("error", error, ctx);
    }

    //获取url
    const url = ctx.query?.url;

    //请求图片并将图片的响应类型改成流
    const res = await axios({
      url: url,
      method: "get",
      responseType: "stream",
    });

    // 设置fileObj对象
    let fileObj = {
      fileSize: res.headers["content-length"],
      mimetype: res.headers["content-type"],
      filename: `${getDate()}`,
      destPath: `${TEST_IMAGE_PATH}/${getDate()}`,
    };
    // 当不存在size参数 则直接根据url读 最后返回url对应的图片
    if (!ctx.query?.size) {
      //将流写入文件
      res.data.pipe(fs.createWriteStream(`${fileObj.destPath}`));
      ctx.fileObj = fileObj;
      await next();
      return;
    }
    //获取size参数
    const [sizeX, sizeY] = ctx.query?.size?.split("x");

    //存放地址
    const destPath = `${TEST_IMAGE_PATH}/${fileObj.filename}`;
    //生成image
    const image = await jimp.read(url);
    await image.resize(Number(sizeX), Number(sizeY));
    await image.writeAsync(`${destPath}__${sizeX}_${sizeY}`);
    ctx.fileObj = fileObj;
    await next();
  } catch (error) {
    // console.log(error);
    // const err = new Error("");
    // return ctx.app.emit("error", err, ctx);
  }
};

module.exports = { downloadImage };
