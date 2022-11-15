const crypto = require("crypto");
const keccakHash = require("keccak");
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');


/**
 * Documentation
 * @class Wallet - Used to get wallet address, publicKey, privateKey
 * @method getWalletAddress
 */
class Wallet {
  getAddressFromPublicKey(publicKey) {
    const convertedKey = new Buffer.from(publicKey, "hex");
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
    const key = ec.genKeyPair();
    const pub = key.getPublic().encode('hex');
    const priv = key.getPrivate("hex");

    return {
      address: this.getAddressFromPublicKey(pub),
      publicKey: pub,
      privateKey: priv,
    };
  }
}

module.exports = Wallet;
