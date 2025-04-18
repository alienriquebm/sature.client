import { render } from "@testing-library/react";
import Loader from "./Loader";

const LoaderWrapper = () => <Loader />;

describe("Loader", () => {
  it("renders the loader", () => {
    const { getByRole } = render(<LoaderWrapper />);
    const loader = getByRole("status");
    expect(loader).toBeInTheDocument();
  });
});
