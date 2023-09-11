import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import TodoFormComponent from "@/components/TodoForm";
import { TeamIdProvider } from "@/contexts/TeamIdContext";

test("Call onAdd when click Add Button", async () => {
  // mock functionを準備
  const onAddMock = vi.fn();

  // render
  render(
    <TeamIdProvider>
      <TodoFormComponent onAdd={onAddMock} />
    </TeamIdProvider>
  );

  // text入力
  const textInput = screen.getByRole("textbox");
  await userEvent.type(textInput, "testvalue");

  // Add Buttonをクリック
  const addButton = screen.getByRole("button", { name: "Add" });
  await userEvent.click(addButton);

  // onAddが呼ばれたか確認
  expect(onAddMock).toBeCalledTimes(1);
  // propsで渡したonAddが呼ばれた時の引数を確認
  // 引数にはid, teamIdも含まれるが、固定されないため確認していない
  expect(onAddMock).toHaveBeenCalledWith(
    expect.objectContaining({
      title: "testvalue",
      completed: false,
    })
  );
});
