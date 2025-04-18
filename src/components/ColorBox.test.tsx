import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ColorBox from "./ColorBox";

const mockedColorHex = "#ff5733";
const ColorBoxWrapper = () => {
  return <ColorBox hex={mockedColorHex} />;
};

beforeAll(() => {
  Object.defineProperty(window.navigator, "clipboard", {
    value: {
      writeText: vi.fn(),
    },
    configurable: true,
  });
});

describe("Button component", () => {
  it("renders the box with a hex color", () => {
    render(<ColorBoxWrapper />);

    const colorBox = screen.getByRole("presentation");
    expect(colorBox).toHaveStyle(`background-color: ${mockedColorHex}`);
  });

  it("should copy the hex color to clipboard when button is clicked", () => {
    render(<ColorBoxWrapper />);
    const copyButton = screen.getByRole("button", { name: /Copiar/i });
    copyButton.click();
    expect(window.navigator.clipboard.writeText).toHaveBeenCalledWith(
      mockedColorHex
    );
  });
});
