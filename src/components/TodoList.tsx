import { useState } from "react";
import TodoComponent from "./Todo";
import TodoFormComponent from "./TodoForm";
import { Todo } from "@/types/Todo";

const TodoListComponent = () => {
  const [items, setItems] = useState<Array<Todo>>([]);

  const onUpdate = (newValue: Todo) => {
    setItems(
      items.map((item) => {
        if (item.id === newValue.id) {
          return {
            ...item,
            ...newValue,
          };
        }
        return item;
      })
    );
  };

  const onAdd = (item: Todo) => {
    setItems([...items, item]);
  };

  return (
    <>
      <div className="items">
        {items.map((item) => (
          <TodoComponent key={item.id} item={item} onUpdate={onUpdate} />
        ))}
      </div>
      <TodoFormComponent onAdd={onAdd} />
    </>
  );
};

export default TodoListComponent;
