import { renderHook, waitFor } from "@testing-library/react";
import useNavigation from "./useNavigation";

describe("useNavigation", () => {
  it("should set the / path as the current path on mount", async () => {
    const { result } = renderHook(() => useNavigation());
    await waitFor(() => {
      expect(result.current.currentPath).toBe("/");
    });
  });

  it("should update currentPath when popstate event is fired", async () => {
    Object.defineProperty(window, "location", {
      value: {
        pathname: "/saved",
      },
      writable: true,
    });

    const { result } = renderHook(() => useNavigation());

    window.dispatchEvent(new PopStateEvent("popstate"));

    await waitFor(() => {
      expect(result.current.currentPath).toBe("/saved");
    });
  });
});
