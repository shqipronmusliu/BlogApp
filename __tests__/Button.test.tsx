import { render, screen, fireEvent } from "@testing-library/react";
import Button from "@/components/shared/Button"; 
import React from "react";

describe("Button", () => {
   it("shfaq tekstin e butonit", () => {
      render(<Button text="Kliko Këtu" onClick={() => {}} />);
      expect(screen.getByRole("button", { name: "Kliko Këtu" })).toBeInTheDocument();
   });

   it("thërret onClick kur klikohet", () => {
      const mockClick = jest.fn();
      render(<Button text="Shto" onClick={mockClick} />);
      fireEvent.click(screen.getByText("Shto"));
      expect(mockClick).toHaveBeenCalledTimes(1);
   });

   it("vendos type='submit' kur i jepet", () => {
      render(<Button text="Dergo" onClick={() => {}} type="submit" />);
      expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
   });
});
