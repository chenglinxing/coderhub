const Multer = require("koa-multer");

const jimp = require("jimp");
const {
  AVATAR_PATH,
  PICTURE_PATH,
  TEST_IMAGE_PATH,
} = require("../constants/file-path");
const path = require("path");

//头像存放目录
const avatarUpload = Multer({
  dest: AVATAR_PATH,
});

//上传头像  key为 avatar
const avatarHandler = avatarUpload.single("avatar");

//存放目录
const pictureUpload = Multer({
  dest: PICTURE_PATH,
});

//上传图片  key为 avatar  最大上传9个
const picturerHandler = pictureUpload.array("picture", 9);

//处理图片大小(sharp/jimp)
const pictureResize = async (ctx, next) => {
  // 1.获取所有的图像信息
  const files = ctx.req.files;
  console.log(files);
  // 2.处理图像
  for (let file of files) {
    const destPath = path.join(file.destination, file.filename);
    jimp.read(file.path).then((image) => {
      image.resize(1280, jimp.AUTO).write(`${destPath}-large`);
      image.resize(640, jimp.AUTO).write(`${destPath}-middle`);
      image.resize(320, jimp.AUTO).write(`${destPath}-small`);
    });
  }

  await next();
};


/******************************************************** */
//测试预览图片 存放目录
const testIamgeUplaod = Multer({
  dest: TEST_IMAGE_PATH,
});

const testIamgeHandler = testIamgeUplaod.single("")

module.exports = { avatarHandler, picturerHandler, pictureResize };
