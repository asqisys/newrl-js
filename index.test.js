const newrl = require("./index");

test("Get Balance", async () => {
  const testNode = new newrl.Node();
  const balance = await testNode.getBalance(
    "TOKEN_IN_WALLET",
    "0xc29193dbab0fe018d878e258c93064f01210ec1a",
    9
  );
  expect(balance).toBe(0);
});
