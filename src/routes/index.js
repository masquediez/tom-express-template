const { Router } = require("express");
const { AuthRouter } = require("./auth");
const { UserRouter } = require("./user");
const { TodosRouter } = require("./todos");
const { MemberRouter } = require("./members");

const AppRouter = Router();

AppRouter.use("/v1/auth", AuthRouter);
AppRouter.use("/v1/user", UserRouter);
AppRouter.use("/v1/todos", TodosRouter);
AppRouter.use("/v1/members", MemberRouter);

module.exports = { AppRouter };
