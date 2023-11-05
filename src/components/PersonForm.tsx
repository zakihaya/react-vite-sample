import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
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
  const [errors, setErrors] = useState<string[]>([]);
  const { register, handleSubmit } = useForm<FormValue>();

  const onSubmitForm: SubmitHandler<FormValue> = (data) => {
    console.log("onSubmitForm");
    console.log(data);
    // setFormValue(data);
    onClick(data);
  };

  const onClick = (formValue: FormValue) => {
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
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <div>
        <input type="text" id="name" placeholder="name" {...register("name")} />
      </div>
      <div>
        <input type="text" id="note" placeholder="note" {...register("note")} />
      </div>
      <div>
        <input
          type="number"
          id="age"
          placeholder="age"
          {...register("age", { valueAsNumber: true })}
        />
      </div>
      <button type="submit">save</button>
      <div className="errors">
        {errors.map((e, index) => (
          <div key={index}>{e}</div>
        ))}
      </div>
    </form>
  );
};

export default PersonFormComponent;
