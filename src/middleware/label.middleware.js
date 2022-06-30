const service = require("../service/label.service");

//判断标签是否存在  如果不存在则新增标签
const verifyLabelExists = async (ctx, next) => {
  //1.取出所有标签
  const { labels } = ctx.request.body;
  //2.判断每一个标签在label表中是否存在
  const newLabels = [];
  for (let name of labels) {
    const labelResult = await service.getLabelByName(name);
    const label = { name };
    if (!labelResult) {
      //如果不存在则创建标签
      const result = await service.create(name);
      label.id = result.insertId;
    } else {
      label.id = labelResult.id;    
    }
    newLabels.push(label);
  }
  // console.log(newLabels,'newLabels');
  ctx.labels = newLabels;
  await next();
};

module.exports = { verifyLabelExists };
