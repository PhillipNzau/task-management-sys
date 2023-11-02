import { render, screen } from "@testing-library/react";
import Home from "../../../pages/Home";

describe("Home component", () => {
  it("should be displayed on the page", () => {
    render(<Home />); // Render the Home component

    // Check if the Home component is displayed
    expect(screen.getByText("Task Management")).toBeInTheDocument();
  });
});
