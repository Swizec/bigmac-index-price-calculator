import ParityPrice from "./index";

test("init", () => {
    expect(
        () => new ParityPrice("cb952dd732eb8e511d44d441788fcf67")
    ).not.toThrow();
});
