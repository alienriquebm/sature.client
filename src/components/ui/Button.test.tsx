import { render } from "@testing-library/react";
import Button from "./Button";

const ButtonWrapped = () => <Button onClick={() => {}}>Test</Button>;

describe("Button", () => {
  it("renders correctly", () => {
    const { getByRole } = render(<ButtonWrapped />);
    const button = getByRole("button", { name: /Test/i });
    expect(button).toBeInTheDocument();
  });

  it("should apply fullWidth class when fullWidth is true", () => {
    const { getByRole } = render(
      <Button onClick={() => {}} fullWidth>
        Test
      </Button>
    );
    const button = getByRole("button", { name: /Test/i });
    expect(button).toHaveClass("w-full");
  });
});
