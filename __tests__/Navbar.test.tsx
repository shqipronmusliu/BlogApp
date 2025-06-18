
import { render, screen } from "@testing-library/react";
import Header from "@/components/Header";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Header", () => {
   beforeEach(() => {
      (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "unauthenticated",
      });

      (useRouter as jest.Mock).mockReturnValue({
      pathname: "/",
      push: jest.fn(),
      });
   });

   it("renderon titullin 'BlogIn'", () => {
      render(<Header />);
      expect(screen.getByText("Blog")).toBeInTheDocument();
      expect(screen.getByText("In")).toBeInTheDocument();
   });

   it("shfaq menunë kryesore", () => {
      render(<Header />);
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("About")).toBeInTheDocument();
      expect(screen.getByText("Contact")).toBeInTheDocument();
      expect(screen.getByText("Blogs")).toBeInTheDocument();
      expect(screen.getByText("News")).toBeInTheDocument();
   });

   it("shfaq butonat 'Regjistrohu' dhe 'Kyçu' kur nuk është i kyçur", () => {
      render(<Header />);
      expect(screen.getByText("Regjistrohu")).toBeInTheDocument();
      expect(screen.getByText("Kyçu")).toBeInTheDocument();
   });
});
