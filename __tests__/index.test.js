import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "@/pages";

describe("Home", () => {
  test("Dummy test for checking the home page", () => {
    // Arrange

    // Act
    render(<Home />);

    // Assert
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    
  });
});
