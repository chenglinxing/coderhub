const app = require("./app");
require("./app/database")

const config = require("./app/config");

app.listen(config.APP_PORT, () => {
  console.log(`服务器${config.APP_PORT}端口启动成功！`);
});


// setTimeout(() => {
//   console.log(1);
// });

// new Promise(function f2(resovle){
//   resovle()
//   console.log(2);
// }).then(function f3(){
//   console.log(3);
//   Promise.resolve().then(function f4(){
//     console.log(4);
//   }).then(function f5(){
//     Promise.resolve().then(function f6(){
//       console.log(5);
//     })
//   })
// })

// console.log(6);