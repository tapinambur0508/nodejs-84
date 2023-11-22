const lottery = require("./lottery");

const mockGenerateNumber = jest.fn();

jest.mock("./generateNumber", () => {
  return () => mockGenerateNumber();
});

describe("lottery", () => {
  beforeAll(() => {
    mockGenerateNumber.mockImplementation(() => 10);
  });

  test("should won when 10", () => {
    const result = lottery(10);
    expect(result).toBe("$$$ You WIN! $$$");
  });

  test("should lose when 1", () => {
    const result = lottery(1);
    expect(result).toBe("You lost:(");
  });
});
