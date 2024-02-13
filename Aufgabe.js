require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Zugriff auf Umgebungsvariablen
const PORT = process.env.PORT1;

// Initialisierung von expres
const app = express();
app.use(bodyParser.json());
// Use for development
app.use(cors());

// Array
const miArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

app.get("/array", (req, res) => {
  res.json(miArray);
});

app.get("/array/pop", (req, res) => {
  if (miArray.length > 1) {
    let eliminar = miArray.pop();
    res.send(
      `El último elemento eliminado fue: ${eliminar}, Total de elementos: ${miArray.length}`
    );
  } else {
    res.send("El array está vacío, no se puede eliminar ningún elemento.");
  }
  console.log(miArray.length);
});

app.get("/array/push", (req, res) => {
  if (miArray.length < 20) {
    let agregar = miArray.push(1);
    res.send(
      `El último numero agregado fue: ${agregar}, Total de elementos: ${miArray.length}`
    );
  } else {
    res.send(
      `El array está lleno, no se puede agregar nada más.  Total de elementos: ${miArray.length}`
    );
  }
  console.log(miArray.length);
});

app.get("/array/unshift", (req, res) => {
  if (miArray.length < 0) {
    let sumar = miArray.unshift(1);
    res.send(
      `Un elemento fue agregado correctamente al inicio del array. Total de elementos: ${miArray.length}`
    );
  } else {
    res.send(`Total de elementos: ${miArray.length}`);
  }
  console.log(miArray.length);
});

app.get("/array/shift", (req, res) => {
  if (miArray.length < 5) {
    let restar = miArray.unshift(1);
    res.send("Un elemento fue sacado correctamente al inicio del array.");
  } else {
    res.send("El array está lleno, no se puede agregar nada más.");
  }
});

// App hört im folgenden auf den Port, welcher über die Umgebungsvariable definiert ist
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
