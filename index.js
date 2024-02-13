const express = require("express");
const cors = require("cors");

// Zugriff auf Umgebungsvariablen
const { PORT } = process.env;

// Initialisierung von expres
const app = express();
// Use for development
app.use(cors());

// ================= A U F G A B E =======================================
const usuario = {
  nombre: "Juan",
  apellido: "Pérez",
  direccion: "Calle Falsa 123",
  pasatiempos: ["Leer", "Cocinar", "Correr"],
};

const todos = [
  { id: 1, tarea: "Completar el proyecto", completado: false },
  { id: 2, tarea: "Ir al supermercado", completado: true },
  { id: 3, tarea: "Llamar al médico", completado: false },
];

app.get("/user", (req, res) => {
  res.json(usuario);
});

/* / ============================================================
app.get("/todo", (req, res) => {
  console.log(req.query);
  const usuarioNombre = parseInt(req.query.todoId);
  const todoTarea = todos.find((item) => todo.id === todos);
  res.json({ tarea: todoTarea });
});

// ============================================================

app.post("/todo", (req, res) => {
  const newTodo = req.body;

  todos.push(newTodo);

  res.json({ newTodo: newTodo });
});


// ============================================================
app.get("/todos", (req, res) => {
  res.json(todos);
});
*/

// ============================================================

// Obtener usuario
app.get("/user", (req, res) => {
  res.json(usuario);
});

// Obtener todas las tareas
app.get("/todos", (req, res) => {
  res.json(todos);
});

// Obtener una tarea por su ID
app.get("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  const todo = todos.find((todo) => todo.id === todoId);
  if (!todo) {
    return res.status(404).json({ message: "Tarea no encontrada" });
  }
  res.json(todo);
});

// Crear una nueva tarea
app.post("/todos", (req, res) => {
  const newTodo = req.body;
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Actualizar una tarea existente
app.put("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  const todoIndex = todos.findIndex((todo) => todo.id === todoId);
  if (todoIndex === -1) {
    return res.status(404).json({ message: "Tarea no encontrada" });
  }
  const updatedTodo = req.body;
  todos[todoIndex] = { ...todos[todoIndex], ...updatedTodo };
  res.json(todos[todoIndex]);
});

// Eliminar una tarea
app.delete("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  const todoIndex = todos.findIndex((todo) => todo.id === todoId);
  if (todoIndex === -1) {
    return res.status(404).json({ message: "Tarea no encontrada" });
  }
  todos.splice(todoIndex, 1);
  res.status(204).end();
});

// ============================================================

app.get("/test1", (req, res) => {
  res.send("Hola, bienvenido a mi primera app express");
});

app.get("/test", (req, res) => {
  res.send("Hello World!");
});

app.get("/profile", (req, res) => {
  res.json({ profile: { name: "Max" } });
});

// App hört im folgenden auf den Port, welcher über die Umgebungsvariable definiert ist
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
