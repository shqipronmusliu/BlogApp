import { render, screen } from "@testing-library/react";
import NewsCard from "@/components/MainLayout/NewsCard";
import React from "react";

describe("NewsCard", () => {
  it("shfaq titullin dhe përshkrimin", () => {
    render(<NewsCard title="Titulli Test" description="Përshkrimi Test" />);
    expect(screen.getByText("Titulli Test")).toBeInTheDocument();
    expect(screen.getByText("Përshkrimi Test")).toBeInTheDocument();
  });
});
