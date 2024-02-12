import React, { useState, useEffect } from "react";
import axios from "axios";

function Usuario() {
  const [userData, setUserData] = useState(null);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Realizar la solicitud GET al servidor Express para obtener los datos del usuario
    axios
      .get("http://localhost:5050/user")
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

    // Realizar la solicitud GET al servidor Express para obtener la lista de todos
    axios
      .get("http://localhost:5050/todos")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  }, []);

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
    </div>
  );
}

export default Usuario;
