import { useState } from "react";

type PersonFormProps = {
  onSubmit: (name: string, note: string, age: number | null) => void;
};

type FormValue = {
  name: string;
  note: string;
  age: number | null;
};

const PersonFormComponent = ({ onSubmit }: PersonFormProps) => {
  const [formValue, setFormValue] = useState<FormValue>({
    name: "",
    note: "",
    age: null,
  });

  const onClick = () => {
    onSubmit(formValue.name, formValue.note, formValue.age);
  };

  return (
    <>
      <div>
        <input
          type="text"
          name="name"
          placeholder="name"
          value={formValue.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormValue({
              ...formValue,
              name: e.target.value,
            });
          }}
        />
      </div>
      <div>
        <input
          type="text"
          name="note"
          placeholder="note"
          value={formValue.note}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormValue({
              ...formValue,
              note: e.target.value,
            });
          }}
        />
      </div>
      <div>
        <input
          type="number"
          name="age"
          placeholder="age"
          value={formValue.age ?? ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value ? parseInt(e.target.value) : null;
            setFormValue({
              ...formValue,
              age: newValue,
            });
          }}
        />
      </div>
      <button onClick={onClick}>save</button>
    </>
  );
};

export default PersonFormComponent;
