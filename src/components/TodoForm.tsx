import { useState, useCallback } from "react";
import { Todo } from "@/types/Todo";

type TodoFormProps = {
  onAdd: (todo: Todo) => void;
};

type FormValue = {
  title: string;
};

const TodoFormComponent = ({ onAdd }: TodoFormProps) => {
  const [formValue, setFormValue] = useState<FormValue>({ title: "" });

  const getId = useCallback(() => {
    return new Date().getTime();
  }, []);

  return (
    <div>
      <input
        type="text"
        value={formValue.title}
        onChange={(e) => setFormValue({ ...formValue, title: e.target.value })}
      />
      <br />
      <button
        style={{ color: "#fff" }}
        onClick={() => {
          onAdd({
            id: getId(),
            title: formValue.title,
            completed: false,
          });
          setFormValue({ title: "" });
        }}
      >
        Add
      </button>
    </div>
  );
};

export default TodoFormComponent;
