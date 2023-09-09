import { Todo } from "@/types/Todo";

type TodoProps = {
  item: Todo;
  onUpdate: (todo: Todo) => void;
};

const TodoComponent = ({ item, onUpdate }: TodoProps) => {
  return (
    <div key={item.id}>
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => {
          onUpdate({
            ...item,
            completed: !item.completed,
          });
        }}
      />
      id:{item.id}
      &nbsp;&nbsp; teamId:{item.teamId}
      &nbsp;&nbsp;
      {item.title}
    </div>
  );
};

export default TodoComponent;
