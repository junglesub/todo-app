import "./App.css";
import { useState } from "react";

function App() {
  const [newTodoName, setNewTodoName] = useState("");
  const [allTodoItems, setAllTodoItems] = useState([]);

  const removeItem = (entry) => {
    setAllTodoItems((state) => state.filter((item) => item !== entry));
  };
  return (
    <div className="App">
      <div className="create">
        <h1>Todo App</h1>
        <input
          id="todo-item-input"
          value={newTodoName}
          onChange={(event) => setNewTodoName(event.target.value)}
        />
        <button
          id="create-btn"
          onClick={() => {
            setAllTodoItems((state) => [...state, newTodoName]);
            setNewTodoName("");
          }}
        >
          Create
        </button>
      </div>
      <div className="list" id="todo-list">
        {allTodoItems.map((item) => (
          <div key={item} onClick={() => removeItem(item)}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
