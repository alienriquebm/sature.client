import { vi } from "vitest";

export const mockedPalettes = [["#FF0000", "#00FF00", "#0000FF"]];

export const setLocalStorageMock = (data: string | null) => {
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: vi.fn(() => data),
      setItem: vi.fn(),
    },
    writable: true,
  });
};
