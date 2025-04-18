import { act, renderHook } from "@testing-library/react";
import useDarkMode from "./useDarkMode";
import { vi } from "vitest";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn(() => ({
    matches: false,
    addListener: vi.fn(),
    removeListener: vi.fn(),
  })),
});


describe("useDarkMode", () => {
  it("should toggle dark mode", () => {
    const { result } = renderHook(() => useDarkMode());
    expect(result.current.mode).toBe("light");
    act(() => {
      result.current.changeMode("dark");
    });
    expect(result.current.mode).toBe("dark");
  });

  it("should set mode to auto", () => {
    const { result } = renderHook(() => useDarkMode());
    act(() => {
      result.current.changeMode("auto");
    });
    expect(result.current.mode).toBe("auto");
  });

});