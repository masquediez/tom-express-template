import React, { useState, useEffect } from "react";
import axios from "axios";

function Usuario() {
  const [userData, setUserData] = useState(null);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5050/user")
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

    axios
      .get("http://localhost:5050/todos")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  }, []);

  const handleNewTodoChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleNewTodoSubmit = () => {
    if (newTodo === null) {
      return; // No hacer nada si newTodo es null
    }

    axios
      .post("http://localhost:5050/todos", {
        tarea: newTodo,
        completado: false,
      })
      .then((response) => {
        setTodos([...todos, response.data]);
        setNewTodo("");
      })
      .catch((error) => {
        console.error("Error creating new todo:", error);
      });
  };

  return (
    <div>
      <h1>Datos del usuario:</h1>
      {userData && (
        <div>
          <p>Nombre: {userData.nombre}</p>
          <p>Apellido: {userData.apellido}</p>
          <p>Dirección: {userData.direccion}</p>
          <p>Pasatiempos: {userData.pasatiempos.join(", ")}</p>
        </div>
      )}

      <h1>Lista de todos:</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.tarea} - {todo.completado ? "Completado" : "Pendiente"}
          </li>
        ))}
      </ul>

      <input type="text" value={newTodo} onChange={handleNewTodoChange} />
      <button onClick={handleNewTodoSubmit}>Agregar Tarea</button>
    </div>
  );
}

export default Usuario;
