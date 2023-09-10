import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import App from "@/App";

test("renders currentTeamId", () => {
  render(<App />);

  const teamIdTitleLabel = screen.getByText(/^currentTeamId: \d{13}$/);
  expect(teamIdTitleLabel).toBeInTheDocument();
});

test("renders Add Button", () => {
  render(<App />);

  const addButton = screen.getByRole("button", { name: "Add" });
  expect(addButton).toBeInTheDocument();
});

test("renders Refresh TeamId Button", () => {
  render(<App />);

  const refreshTeamIdButton = screen.getByRole("button", {
    name: "Refresh TeamId",
  });
  expect(refreshTeamIdButton).toBeInTheDocument();
});
