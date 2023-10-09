import React, { useState } from "react";
import { z } from "zod";
import Bugsnag from "@bugsnag/js";

type PersonFormProps = {
  onSubmit: (name: string, note: string, age: number | null) => void;
};

const FormValueSchema = z.object({
  name: z.string().min(1).max(10),
  note: z.string().min(1).max(20),
  age: z.number().gte(0).lte(150).nullable(),
});

type FormValue = z.infer<typeof FormValueSchema>;

const PersonFormComponent = ({ onSubmit }: PersonFormProps) => {
  const [formValue, setFormValue] = useState<FormValue>({
    name: "",
    note: "",
    age: null,
  });
  const [errors, setErrors] = useState<string[]>([]);

  const onClick = () => {
    try {
      FormValueSchema.parse(formValue);
    } catch (e) {
      const submitErrors: string[] = [];
      if (e instanceof z.ZodError) {
        console.log("zod error");
        const errors = e.flatten();
        if (errors.formErrors.length > 0) {
          submitErrors.push("formErrors");
          submitErrors.push(...errors.formErrors);
        }
        if (errors.fieldErrors.name) {
          submitErrors.push("name");
          submitErrors.push(...errors.fieldErrors.name);
        }
        if (errors.fieldErrors.note) {
          submitErrors.push("note");
          submitErrors.push(...errors.fieldErrors.note);
        }
        if (errors.fieldErrors.age) {
          submitErrors.push("age");
          submitErrors.push(...errors.fieldErrors.age);
        }
        setErrors(submitErrors);
        // TODO: Bugsnagのテスト用にエラーを送っているが、本来は毎回送る必要はない
        Bugsnag.notify(e);
      }
      console.log("error", e);
      return;
    }
    setErrors([]);
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
      <div className="errors">
        {errors.map((e, index) => (
          <div key={index}>{e}</div>
        ))}
      </div>
    </>
  );
};

export default PersonFormComponent;
