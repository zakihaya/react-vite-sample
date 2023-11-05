import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Bugsnag from "@bugsnag/js";

type PersonFormProps = {
  onSubmit: (name: string, note: string, age: number | null) => void;
};

const FormValueSchema = z.object({
  name: z
    .string({ invalid_type_error: "入力値に誤りがあります" })
    .min(1, { message: "1文字以上で入力してください" })
    .max(10, { message: "10文字以下で入力してください" }),
  note: z
    .string({ invalid_type_error: "入力値に誤りがあります" })
    .min(1, { message: "1文字以上で入力してください" })
    .max(20, { message: "20文字以下で入力してください" }),
  age: z
    .number({
      required_error: "必須な値です",
      invalid_type_error: "数値を入力してください",
    })
    .gte(0, { message: "0以上で入力してください" })
    .lte(150, { message: "150以下で入力してください" }),
});

type FormValue = z.infer<typeof FormValueSchema>;

const PersonFormComponent = ({ onSubmit }: PersonFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useForm<FormValue>({
    resolver: zodResolver(FormValueSchema),
    reValidateMode: "onSubmit",
    criteriaMode: "all",
  });

  const onSubmitForm: SubmitHandler<FormValue> = (data) => {
    console.log("onSubmitForm");
    console.log(data);
    onSubmit(data.name, data.note, data.age);
    reset();
  };

  const onSubmitError: SubmitErrorHandler<FormValue> = (errorOnSubmit) => {
    console.log("onError");
    console.log(errorOnSubmit);
    // TODO: Bugsnagのテスト用にエラーを送っているが、本来は毎回送る必要はない
    const errorMessages = Object.entries(errorOnSubmit).map(
      ([type, message]) =>
        "{type: " + type + ", message: " + message?.message + "}"
    );
    console.log("getValues", getValues());
    Bugsnag.notify({
      errorClass: "FieldErrors",
      errorMessage: errorMessages.join(", "),
    });
  };

  // handleSubmitの第2引数はエラー時のコールバック
  return (
    <form onSubmit={handleSubmit(onSubmitForm, onSubmitError)}>
      <div>
        <input type="text" id="name" placeholder="name" {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <input type="text" id="note" placeholder="note" {...register("note")} />
        {errors.note && <p>{errors.note.message}</p>}
      </div>
      <div>
        <input
          type="number"
          id="age"
          placeholder="age"
          {...register("age", { valueAsNumber: true })}
        />
        {errors.age && <p>{errors.age.message}</p>}
      </div>
      <button type="submit" disabled={!isDirty || !isValid}>
        save（isValid時のみ有効）
      </button>
      <br />
      <button type="submit">save（エラーを確認する用）</button>
      <br />
      <button type="button" onClick={() => reset()}>
        reset
      </button>
    </form>
  );
};

export default PersonFormComponent;
