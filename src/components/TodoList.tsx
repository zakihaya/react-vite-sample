import { useState } from "react";
import TodoComponent from "./Todo";
import TodoFormComponent from "./TodoForm";
import { Todo } from "@/types/Todo";
import ButtonComponent from "@/components/ui/Button";
import { useTeamId } from "@/contexts/TeamIdContext";

const TodoListComponent = () => {
  const [items, setItems] = useState<Array<Todo>>([]);
  const currentTeamId = useTeamId();

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
      <div className="current-team-id">currentTeamId: {currentTeamId}</div>
      <div className="items">
        {items.map((item) => (
          <TodoComponent key={item.id} item={item} onUpdate={onUpdate} />
        ))}
      </div>
      <TodoFormComponent onAdd={onAdd} />
      <br />
      <br />
      <br />
      <ButtonComponent
        text="sample button"
        onClick={() => {
          window.alert("clicked");
        }}
      />
    </>
  );
};

export default TodoListComponent;
