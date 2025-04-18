import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";
import { vi } from "vitest";

vi.mock("../hooks/useNavigation", () => {
  return {
    default: () => ({
      routes: [
        { path: "/", label: "Inicio", icon: "🏠" },
        { path: "/saved", label: "Mis Paletas", icon: "💾" },
      ],
      currentPath: "/saved",
    }),
  };
});

const changeModeMock = vi.fn();
vi.mock("../hooks/useDarkMode", () => {
  return {
    default: () => ({
      mode: "dark",
      changeMode: changeModeMock,
    }),
  };
});

describe("Header", () => {
  it("renders the title", () => {
    render(<Header />);
    expect(screen.getByText("Saturé")).toBeInTheDocument();
  });

  it("renders the navigation links", () => {
    render(<Header />);
    expect(screen.getByText("Inicio")).toBeInTheDocument();
    expect(screen.getByText("Mis Paletas")).toBeInTheDocument();
  });

  it("marks the active link correctly", () => {
    render(<Header />);
    const activeLink = screen.getByText("Mis Paletas").closest("a");
    expect(activeLink).toHaveClass("bg-gray-200");
  });

  it("renders the mode selector and changes mode when selecting another option", () => {
    render(<Header />);
    const select = screen.getByRole("combobox");
    expect(select).toHaveValue("dark");
    fireEvent.change(select, { target: { value: "light" } });
    expect(changeModeMock).toHaveBeenCalledWith("light");
  });
});
