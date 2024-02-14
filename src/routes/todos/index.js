const { Router } = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const TodosRouter = Router();

// GET REQUESTS
// /v1/todos/byid
TodosRouter.get("/byid", (req, res) => {
  const todoId = req.query.todoId;
  if (!todoId) {
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    return;
  }
  res.status(StatusCodes.OK).send("Get Todo by id");
});

TodosRouter.post("/byuserid", (req, res) => {
  res.status(StatusCodes.OK).send("Get Todo by user id");
});

// PUT REQUESTS
TodosRouter.put("/mark", (req, res) => {
  res.status(StatusCodes.OK).send("Todo als erledeigt markieren");
});
TodosRouter.put("/update", (req, res) => {
  res.status(StatusCodes.OK).send("Todo aktuallisieren");
});

// POST REQUESTS
TodosRouter.post("/create", (req, res) => {
  res.status(StatusCodes.OK).send("Erstellen eines Todos");
});

// DELETE REQUEST
TodosRouter.delete("/delete", (req, res) => {
  res.status(StatusCodes.OK).send("DELTE Todo");
});

// New Routes for Members
// Add member to a Todo
TodosRouter.post("/members/add", (req, res) => {
  res.status(StatusCodes.OK).send("Add member to a Todo");
});

// Remove member from a Todo
TodosRouter.delete("/members/remove", (req, res) => {
  res.status(StatusCodes.OK).send("Remove member from a Todo");
});

// Get members of a Todo
TodosRouter.get("/members/list", (req, res) => {
  res.status(StatusCodes.OK).send("Get members of a Todo");
});

module.exports = { TodosRouter };
