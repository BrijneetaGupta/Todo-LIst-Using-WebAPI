var todos = document.querySelector(".todos");
var dropdown = document.querySelector("#dropdown");

fetch("https://jsonplaceholder.typicode.com/todos")
  .then((response) => response.json())
  .catch(function() {
    console.error("Could not fetch data");
  })
  .then((data) => {
    var todoArray = [];

    todoArray = data;
    addInList(todoArray)

    dropdown.addEventListener("change", populateList);
    
    function populateList(){
      if(dropdown.value === "All"){
        todoArray = data;
        addInList(todoArray)
      }
      else if(dropdown.value === "Completed"){
        todoArray = data.filter((item) => item.completed);
        addInList(todoArray);
      }
      else{
        todoArray = data.filter((item) => !item.completed);
        addInList(todoArray);
      }
    }
  })
  .catch(function() {
    console.error("Could not fetch data!");
  });

function addInList(todoArray) {
  todos.innerHTML = '';
  todoArray.forEach((item) => {
    var node = document.createElement("p");
    node.setAttribute("key", item.id);
    node.setAttribute("completed-status", item.completed)
    node.innerText = item.title;
    todos.appendChild(node);
  });
}