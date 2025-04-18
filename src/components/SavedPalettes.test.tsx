import { act, render, screen } from "@testing-library/react";
import SavedPalettes from "./SavedPalettes";
import { mockedPalettes, setLocalStorageMock } from "../utils/tests/mocks";

const SavedPalettesWrapper = () => <SavedPalettes />;

describe("SavedPalettes", () => {
  it("should render a message when there are no saved palettes", () => {
    setLocalStorageMock(null);
    render(<SavedPalettesWrapper />);
    const message = screen.getByText("No has guardado ninguna paleta aún.");
    expect(message).toBeInTheDocument();
    expect(screen.queryByRole("presentation")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Eliminar paleta/i })
    ).not.toBeInTheDocument();
  });

  it("should render the palettes correctly", async () => {
    setLocalStorageMock(JSON.stringify(mockedPalettes));
    render(<SavedPalettesWrapper />);
    const paletteElements = await screen.findAllByRole("presentation", {
      name: /Paleta de colores/i,
    });
    expect(paletteElements.length).toBe(mockedPalettes.length);
  });

  it("should delete a palette when the delete button is clicked", async () => {
    setLocalStorageMock(JSON.stringify(mockedPalettes));
    render(<SavedPalettesWrapper />);
    const deleteButtons = await screen.findAllByRole("button", {
      name: /Eliminar paleta/i,
    });
    expect(deleteButtons.length).toBe(mockedPalettes.length);

    act(() => {
      deleteButtons[0].click();
    });

    const modal = screen.getByRole("dialog");
    expect(modal).toBeInTheDocument();

    const confirmButton = screen.getByRole("button", {
      name: /Confirmar eliminar paleta/i,
    });
    expect(confirmButton).toBeInTheDocument();

    act(() => {
      confirmButton.click();
    });

    const emptyMessage = await screen.findByText(
      "No has guardado ninguna paleta aún."
    );
    expect(emptyMessage).toBeInTheDocument();
  });

  it("should close the modal when the cancel button is clicked", async () => {
    setLocalStorageMock(JSON.stringify(mockedPalettes));
    render(<SavedPalettesWrapper />);
    const deleteButtons = await screen.findAllByRole("button", {
      name: /Eliminar paleta/i,
    });
    expect(deleteButtons.length).toBe(mockedPalettes.length);

    act(() => {
      deleteButtons[0].click();
    });

    const modal = screen.getByRole("dialog");
    expect(modal).toBeInTheDocument();

    const cancelButton = screen.getByRole("button", {
      name: /Cancelar/i,
    });
    expect(cancelButton).toBeInTheDocument();

    act(() => {
      cancelButton.click();
    });

    expect(modal).not.toBeInTheDocument();
  });
});
