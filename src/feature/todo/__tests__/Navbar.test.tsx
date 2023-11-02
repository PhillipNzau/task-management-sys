import { render, fireEvent, screen } from "@testing-library/react";
import Navbar from "../../../components/Navbar";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: any) => key }),
}));

jest.mock("../hooks/useAuth", () => ({
  useAuth: jest.fn(),
}));

jest.mock("../hooks/useUser", () => ({
  useUser: jest.fn(),
}));

jest.mock("@/feature/todo/context/SearchContext", () => ({
  useSearch: jest.fn(),
}));

describe("Navbar component", () => {
  it("should render correctly", () => {
    // Mock functions and values
    const { logout } = useAuth();
    const setSearchQuery = jest.fn();
    const navigate = useNavigate();


    const mockUser = { first_name: "John" };

    // Render the Navbar component with mocked values
    render(<Navbar />);

    // Ensure the logo is rendered
    expect(screen.getByAltText("logo")).toBeInTheDocument();

    // Ensure user-related content is present
    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByText(mockUser.first_name)).toBeInTheDocument(); // Use the mock user

    // Ensure the search input is rendered
    const searchInput = screen.getByRole("search");
    expect(searchInput).toBeInTheDocument();

    // Simulate a change in the search input
    fireEvent.change(searchInput, { target: { value: "Test Search" } });
    expect(setSearchQuery).toHaveBeenCalledWith("Test Search");

    // Ensure the language selector is present
    const languageSelector = screen.getByRole("combobox");
    expect(languageSelector).toBeInTheDocument();

    // Ensure the logout button is rendered
    expect(screen.getByText("Logout")).toBeInTheDocument();

    // Simulate a click on the logout button
    fireEvent.click(screen.getByText("Logout"));
    expect(logout).toHaveBeenCalled();

    // Ensure that the navigate function is called after logout
    expect(navigate).toHaveBeenCalledWith("/login");
  });
});
