const { Router } = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const TodosRouter = Router();

const todos = [
  {
    id: 1,
    userId: 1,
    task: "Wäsche waschen",
    isDone: true,
    dueDate: new Date("2024-03-03"),
  },
  {
    id: 2,
    userId: 1,
    task: "Müll rausbrigen",
    isDone: false,
    dueDate: new Date("2024-03-03"),
  },
  {
    id: 3,
    userId: 2,
    task: "Tanzen",
    isDone: false,
    dueDate: new Date("2024-03-03"),
  },
  {
    id: 4,
    userId: 2,
    task: "Auto fahren",
    isDone: true,
    dueDate: new Date("2024-03-03"),
  },
];

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

TodosRouter.get("/byuserid", (req, res) => {
  const userId = req.body.userId;
  //const userId = req.query.userId;

  if (!userId) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send(ReasonPhrases.BAD_REQUEST + " Keine userID");
    return;
  }

  const userTodos = todos.filter((todo) => todo.userId === userId);

  res.status(StatusCodes.OK).json(userTodos);
  // res.status(StatusCodes.OK).send(JSON.stringify(userTodos)); //alternativ
});

// GET REQUESTS
TodosRouter.get("/all", (req, res) => {
  res.status(StatusCodes.OK).json(todos);
});

// POST REQUESTS
TodosRouter.post("/todo", (req, res) => {
  const { userId, task, isDone, dueDate } = req.body;

  if (!userId || !task || typeof isDone !== "boolean" || !dueDate) {
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    return;
  }

  const newTodo = {
    id: todos.length + 1,
    userId,
    task,
    isDone,
    dueDate: new Date(dueDate),
  };
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
