const dayjs = require("dayjs")

// 获取当前日期  年月日时分秒
function getDate() {
  let date = new Date();
  let year = date.getFullYear();
  let month =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let minute =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  let seconds =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return year + month + day + hour + minute + seconds;
}

function formatDate (value,format="YYYY-MM_DD",errMsg="日期格式错误"){
  if(isDate(value)){
    return dayjs(value).format(format)
  }else{
    return errMsg
  }
}

function isDate(value){
  return dayjs(value).isValid
}


module.exports = { getDate,formatDate ,isDate};
