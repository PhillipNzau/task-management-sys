import { render, screen } from "@testing-library/react";
import SignUp from "@/components/SignUp";

describe("SignUp component", () => {
  it("should render correctly", () => {
    render(<SignUp />); // Render the SignUp component

    // Assert that specific elements are present on the page
    expect(screen.getByText("First Name")).toBeInTheDocument();
    expect(screen.getByText("Last Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByText("Signup")).toBeInTheDocument();
    expect(screen.getByText("Already have an account?")).toBeInTheDocument();
  });
});
