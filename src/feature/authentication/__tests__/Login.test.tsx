import { render, screen } from "@testing-library/react";
import Login from "../../../components/Login";

describe("Login component", () => {
  it("should render correctly", () => {
    render(<Login />); // Render the Login component

    // Assert that specific elements are present on the page
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
  });
});
