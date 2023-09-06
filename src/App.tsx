import { useState } from "react";
import { Todo } from "@/types/Todo";
import "./App.css";

function App() {
  const [items, setItems] = useState<Array<Todo>>([]);
  const [title, setTitle] = useState<string>("");

  return (
    <div className="App">
      <div className="items">
        {items.map((item) => (
          <div key={item.id}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => {
                setItems(
                  items.map((i) => {
                    if (i.id === item.id) {
                      return {
                        ...i,
                        completed: !item.completed,
                      };
                    }
                    return i;
                  })
                );
              }}
            />
            id:{item.id}
            &nbsp;&nbsp;
            {item.title}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <button
        style={{ color: "#fff" }}
        onClick={() => {
          setItems([
            ...items,
            {
              id: new Date().getTime(),
              title,
              completed: false,
            },
          ]);
          setTitle("");
        }}
      >
        Add
      </button>
    </div>
  );
}

export default App;
