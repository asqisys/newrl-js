const crypto = require("crypto");
const keccakHash = require("keccak");

/**
 * Documentation
 * @class Wallet - Used to get wallet address, publicKey, privateKey
 * @method getWalletAddress
 */
class Wallet {
  getAddressFromPublicKey(publicKey) {
    const convertedKey = new Buffer.from(publicKey, "base64");
    const rawAddress = keccakHash("keccak256")
      .update(convertedKey)
      .digest()
      .toString("hex");
    const address = "0x" + rawAddress.slice(-40);
    return address;
  }

  /**
   * Documentation
   * @method - Get wallet address.
   * @returns {Object} - The wallet address, public key, private key.
   */

  getWalletAddress() {
    const primeLength = 600;
    const diffHell = crypto.createDiffieHellman(primeLength);
    diffHell.generateKeys("base64");

    return {
      address: this.getAddressFromPublicKey(diffHell.getPublicKey()),
      publicKey: diffHell.getPublicKey("base64"),
      privateKey: diffHell.getPrivateKey("base64"),
    };
  }
}

module.exports = Wallet;
