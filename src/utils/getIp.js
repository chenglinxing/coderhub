const os = require("os");

class OS {
  //获取ip
  getIp() {
    let { WLAN: ipList } = os.networkInterfaces();
    // console.log(ipList);
    let [{ address }] = ipList.filter((i) => i.family === "IPv4");
    // console.log(address, "a");
    return address;
  }

  //获取主机名
  getHostName() {
    // console.log(os.type());
    return os.hostname();
  }
}

module.exports = new OS();
