const JWA = require("json-web-algorithms");
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
var SHA1 = require('crypto-js/sha1')

/**
 * Documentation
 * @param {Object}  walletData  - {JSON} - wallet object with address, publicKey, privateKey
 * @param {Object} transactionData - {JSON}- transaction data
 * @returns  {Object} - JSON object with transaction data
 */

module.exports = function signTransaction(walletData, transactionData) {

  const key_options = {
    priv: walletData.private,
    pub: walletData.public,
    privEnc: "hex",
    pubEnc: "hex"
  }
  const key = ec.keyPair(key_options)
  const msg = JSON.stringify(transactionData['transaction']).replaceAll(":", ": ").replaceAll(",", ", ")
  const msgHsh = SHA1(msg).toString();
  var signature = key.sign(msgHsh, "hex", { canonical: true });
  var totalSign = signature.r.toString("hex", 64).concat(signature.s.toString("hex", 64))
  var isValid = key.verify(msgHsh, signature)
  if (isValid.toString()) {
    transactionData["signatures"] = [
      {
        wallet_address: walletData["address"],
        msgsign: totalSign,
      },
    ];
  }
  return transactionData;
};
