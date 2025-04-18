import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import PaletteActions from "./PaletteActions";
import { mockedPalettes, setLocalStorageMock } from "../utils/tests/mocks";

const PaletteActionsWrapper = () => <PaletteActions />;

describe("PaletteActions", () => {
  it("renders 5 color boxes", () => {
    render(<PaletteActionsWrapper />);
    const colorBoxes = screen.getAllByRole("paragraph");
    expect(colorBoxes).toHaveLength(5);
  });

  it("should generate new colors when regenerate button is clicked", async () => {
    render(<PaletteActionsWrapper />);

    const initialColors = screen
      .getAllByRole("paragraph")
      .map((box) => box.textContent);

    const regenerateButton = screen.getByRole("button", {
      name: /generar nueva paleta/i,
    });

    act(() => {
      fireEvent.click(regenerateButton);
    });

    const newColors = screen
      .getAllByRole("paragraph")
      .map((box) => box.textContent);
    expect(newColors).not.toEqual(initialColors);
  });

  it("should save the palette when save button is clicked", () => {
    setLocalStorageMock(JSON.stringify(mockedPalettes));
    render(<PaletteActionsWrapper />);
    const saveButton = screen.getByRole("button", {
      name: /guardar paleta/i,
    });
    act(() => {
      fireEvent.click(saveButton);
    });
    const savedPalettes = JSON.parse(localStorage.getItem("palettes") || "[]");
    expect(savedPalettes.length).toBe(mockedPalettes.length);
    expect(savedPalettes[savedPalettes.length - 1]).toHaveLength(
      mockedPalettes[0].length
    );
    expect(savedPalettes[savedPalettes.length - 1]).toEqual(
      expect.arrayContaining([expect.stringMatching(/^#[0-9A-F]{6}$/i)])
    );
    waitFor(() => {
      expect(
        screen.getByText("Tu paleta ha sido guardada")
      ).toBeInTheDocument();
    });
  });

  it("should use a empty array by default when localStorage is empty", () => {
    setLocalStorageMock(null);
    render(<PaletteActionsWrapper />);
    const saveButton = screen.getByRole("button", {
      name: /guardar paleta/i,
    });
    act(() => {
      fireEvent.click(saveButton);
    });
    waitFor(() => {
      expect(
        screen.getByText("Tu paleta ha sido guardada")
      ).toBeInTheDocument();
    });
  });
});
