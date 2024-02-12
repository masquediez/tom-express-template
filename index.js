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

app.get("/todos", (req, res) => {
  res.json(todos);
});

// ============================================================

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
