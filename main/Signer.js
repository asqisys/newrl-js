const JWA = require("json-web-algorithms");

/**
 * Documentation
 * @param {Object}  walletData  - {JSON} - wallet object with address, publicKey, privateKey
 * @param {Object} transactionData - {JSON}- transaction data
 * @returns  {Object} - JSON object with transaction data
 */

module.exports = function signTransaction(walletData, transactionData) {
  const bytesPrivateKey = new Buffer.from(walletData.privateKey);
  const msg = new Buffer.from(JSON.stringify(transactionData["transaction"]));
  var signature = JWA.sign("HS512", msg, bytesPrivateKey);

  var isValid = JWA.verify("HS512", signature, msg, bytesPrivateKey);
  if (isValid.toString()) {
    transactionData["signatures"] = [
      {
        wallet_address: walletData["address"],
        msgsign: signature.toString("base64"),
      },
    ];
  }
  return transactionData;
};
