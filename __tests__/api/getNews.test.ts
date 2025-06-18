import handler from  "../../pages/api/news"
import { createMocks } from "node-mocks-http";

jest.mock("@/api/services/News", () => ({
  getNews: jest.fn(() => Promise.resolve([
    { id: "1", title: "Test Title", description: "Test Description" },
  ])),
}));

describe("GET /api/news", () => {
  it("kthehet me 200 dhe listën e lajmeve", async () => {
    const { req, res } = createMocks({ method: "GET" });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);

    const data = JSON.parse(res._getData());
    expect(Array.isArray(data)).toBe(true);
    expect(data[0].title).toBe("Test Title");
  });
});
