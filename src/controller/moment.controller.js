const momentService = require("../service/moment.service");
const fileService = require("../service/file.service");
const fs = require("fs");

const { PICTURE_PATH } = require("../constants/file-path");
const {formatDate ,isDate} = require("../utils/date")
class MomentController {
  async create(ctx, next) {
    //1.获取用户id content
    const userId = ctx.user.id;
    const content = ctx.request.body.content;
    console.log(userId, content);

    //2.将数据插入到数据库中
    const result = await momentService.create(userId, content);
    ctx.body = result;
  }

  // 根据id获取详情
  async detail(ctx, next) {
    //1.获取某一条动态详情 获取momentId
    const momentId = ctx.params.momentId;
    //2.根据momentId查询
    const result = await momentService.getMomentById(momentId);
    ctx.body = result;
  }

  // 获取所有的动态 支持分页
  async list(ctx, next) {
    //1.获取某一条动态详情 获取momentId
    const { offset, size } = ctx.query;
    console.log(offset, size);
    //2.根据momentId查询
    const result = await momentService.getMoementList(offset, size);
    ctx.body = result;
  }

  //修改动态
  async update(ctx, next) {
    //获取动态id
    const momentId = ctx.params.momentId;
    // 获取动态内容
    const { content } = ctx.request.body;
    const result = await momentService.update(content, momentId);
    ctx.body = result;
  }

  async remove(ctx, next) {
    //获取动态id
    const momentId = ctx.params.momentId;
    const result = await momentService.remove(momentId);
    ctx.body = result;
  }

  //给动态添加标签
  async addLabels(ctx, next) {
    const { labels } = ctx;
    const { momentId } = ctx.params;

    //2.添加所有的标签
    for (let label of labels) {
      //判断该标签与动态是否有关系
      const isExists = await momentService.hasLabel(momentId, label.id);
      if (!isExists) {
        await momentService.addLabel(momentId, label.id);
      }
    }

    ctx.body = "给动态添加标签成功！";
  }

  //给动态添加图片或文件  预览图片
  async fileInfo(ctx, next) {
    try {
      let { filename } = ctx.params;
      const fileinfo = await fileService.getFileByFileName(filename);
      const type = ctx.query?.type;
      const types = ["small", "middle", "large"];
      if (types.some((i) => i === type)) {
        filename = filename + "-" + type;
      }
      ctx.response.set("content-type", fileinfo.mimetype);
      ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`);
    } catch (error) {
      console.log(error);
    }
  }

  //模糊查询动态
  async selectMoment(ctx,next){
    let { name,beginDate,endDate } = ctx.request.body
    //转换name 判断是否为空
    if(name?.replace(/ /g,"") == "" || name == undefined){
      name = ""
    }
    console.log(name,beginDate,endDate);
    const result  = await momentService.selectMoment(name,beginDate,endDate)
    ctx.body = result
  }
}

module.exports = new MomentController();
