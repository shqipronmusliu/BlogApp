jest.mock("@/api/services/News", () => ({
  __esModule: true,
  createNews: jest.fn().mockResolvedValue({ insertedId: "mocked-id" }),
  getNews: jest.fn().mockResolvedValue([]),
}));

import handler from "../../pages/api/news/index";
import { createMocks } from "node-mocks-http";

describe("POST /api/news", () => {
  it("kthen status 201 kur lajmi krijohet", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        title: "Test Lajmi",
        description: "Test përshkrimi",
        userEmail: "admin@test.com",
      },
    });

    await handler(req, res);
    expect(res._getStatusCode()).toBe(201);
  });
});
