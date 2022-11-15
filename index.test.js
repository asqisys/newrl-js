const newrl = require("./index");

test("Generate wallet",async()=>{
  const testNode = new newrl.Wallet();
  const wallet = await testNode.getWalletAddress(
  );
  expect(wallet).toBeDefined();
})


test("Generate Wallet - With Specified Public Key", () => {
  const testWallet = new newrl.Wallet();
  const wallet = testWallet.getAddressFromPublicKey(
    "04547380eadd27f3d82225ac787821da0d56c88971b95fcfb420ac2c5ab5af249812deee5ac27f4c7dee8f4f4dc44cc2edc06c8c7d6fd6bff2472a58eedcf34187"
  );
  expect(wallet).toBe("0x50b7060bbb38d93ec393ea6f40b1ff42c382eedf");
});

test("File Hash - With Specified file", async () => {
  const hash = await new newrl.getFileHash(
    "/home/newrl.jpeg"
  );
  console.log(hash)
  expect(hash).toBe(
    "9bcb0dd41b0c24d0f3aeba3aa82daacbfe9e58ef5fee7c1453647b90c4b13904"
  );
});

