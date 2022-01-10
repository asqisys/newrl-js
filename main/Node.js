const { axiosFun } = require("../util/axios");

/**
 * Documentation
 * @param {String} url - A node address along with port can be given to initialise a new node connection. If no address is provided, the default newrl foundation node at address http://newrl.net:8090 will be used.
 */

class Node {
  // private value
  #url;
  constructor(url) {
    this.#url = url || "http://newrl.net:8090";
  }

  /**
   * Documentation
   * @method - Get the balance of a wallet address.
   * @param {String} balance_type - The type of balance to be retrieved.
   * @param {String} wallet_address - The wallet address to be retrieved.
   * @param {Number} token_code - The token code to be retrieved.
   * @returns Promise {Number} - Balance of the wallet address.
   * @throws {Error} - If the request fails.
   *
   * @example
   * node.getBalance("http://", "TOKEN_IN_WALLET", "0x16031ef543619a8569...", 1);
   */

  async getBalance(balance_type, wallet_address, token_code) {
    const balance_path = "/get-balance";
    let data = {
      balance_type: balance_type,
      wallet_address: wallet_address,
      token_code: token_code,
    };
    const result = await axiosFun({
      method: "POST",
      url: this.#url + balance_path,
      data: data,
    });
    return result.data.balance;
  }
}

module.exports = Node;
