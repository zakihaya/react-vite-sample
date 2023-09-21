import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { BrowserRouter } from "react-router-dom";
import App from "@/App";

test("renders currentTeamId", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  const teamIdTitleLabel = screen.getByText(/^currentTeamId: \d{13}$/);
  expect(teamIdTitleLabel).toBeInTheDocument();
});

test("renders Add Button", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  const addButton = screen.getByRole("button", { name: "Add" });
  expect(addButton).toBeInTheDocument();
});

test("renders Refresh TeamId Button", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  const refreshTeamIdButton = screen.getByRole("button", {
    name: "Refresh TeamId",
  });
  expect(refreshTeamIdButton).toBeInTheDocument();
});
