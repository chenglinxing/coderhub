const Koa = require("koa");

const bodyParser = require("koa-bodyparser");

//注册路由
const useRoutes = require("../router")


const errorHandler = require("./error-handle");

const app = new Koa();

app.use(bodyParser());

useRoutes(app)


app.on("error", errorHandler);
module.exports = app;
