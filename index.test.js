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

test("Get Balance - Exception Error", async () => {
  const testNode = new newrl.Node("http://3.6.236.206:8090");
  try {
    await testNode.getBalance(
      "TOKEN_IN_WALLET",
      "0xc29193dbab0fe018d878e258c93064f01210ec1a",
      9
    );
  } catch ({ message }) {
    expect(message).toBe("Request failed with status code 404");
  }
});

test("Generate Wallet - With Specified Public Key", () => {
  const testWallet = new newrl.Wallet();
  const wallet = testWallet.getAddressFromPublicKey(
    "sB8/+o32Q7tRTjB2XcG65QS94XOj9nP+mI7S6RIHuXzKLRlbpnu95Zw0MxJ2VGacF4TY5rdrIB8VNweKzEqGzg=="
  );
  expect(wallet).toBe("0xc29193dbab0fe018d878e258c93064f01210ec1a");
});

test("File Hash - With Specified file", async () => {
  const hash = await new newrl.getFileHash(
    "/Users/ps/Downloads/wolf-3022813_1920.jpg"
  );
  expect(hash).toBe(
    "dcc52801f53bf960e7305ae52eb76b0f883fcf3829a2c4bb553ad6272a254d7e"
  );
});
