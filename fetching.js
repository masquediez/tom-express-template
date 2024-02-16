fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then((response) => response.json())
  .then((json) => console.log(json));

fetch("http://localhost:5050/v1/todos/all")
  .then((res) => res.json())
  .then((json) => console.log(json));

fetch("http://localhost:5050/v1/todos/byuserid?userId=2")
  .then((res) => res.json())
  .then((json) => console.log(json));
