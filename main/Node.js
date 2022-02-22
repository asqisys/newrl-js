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
      balance_type,
      wallet_address,
      token_code,
    };
    const result = await axiosFun({
      method: "POST",
      url: this.#url + balance_path,
      data: data,
    });
    return result.data.balance;
  }

  /**
   * Documentation
   * @method - Add Wallet to the node.
   * @param {String} custodian_address: The address of the custodian.
   * @param {String} jurisdiction: The jurisdiction of the owner.
   * @param {String} public_key: The public key of the owner.
   * @param {String} ownertype: The type of owner.
   * @param {Array} kyc_docs: The kyc documents of the owner.
   * @param {Object} specific_data: The specific data of the owner.
   * @returns Promise {Object} - The wallet address.
   * @throws {Error} - If the request fails.
   * @example
   * node.addWallet(wallet-address, '910', wallet-public, 1)
   */
  async addWallet(
    custodian_address,
    jurisdiction,
    public_key,
    ownertype = "1",
    kyc_docs = [],
    specific_data = {}
  ) {
    const add_wallet_path = "/add-wallet";
    const data = {
      custodian_address,
      ownertype,
      jurisdiction,
      public_key,
      kyc_docs,
      specific_data,
    };
    const result = await axiosFun({
      method: "POST",
      url: this.#url + add_wallet_path,
      data: data,
    });
    return result.data;
  }

  /**
   * Documentation
   * @method - Add Token to the node.
   * @param {String} token_name: The name of the token.
   * @param {String} token_type: The type of the token.
   * @param {String} first_owner: The first owner of the token.
   * @param {String} custodian: The custodian of the token.
   * @param {String} legal_doc_hash: The hash of the legal document.
   * @param {String} amount_created: The amount of the token created.
   * @param {String} value_created: The value of the token created.
   * @param {Array} disallowed_regions: The disallowed regions of the token.
   * @param {Object} token_attributes: The attributes of the token.
   * @param {Boolean} is_smart_contract_token: The smart contract token.
   * @returns Promise {Object} - The token address.
   * @throws {Error} - If the request fails.
   */
  async addToken(
    token_name,
    token_type,
    first_owner,
    custodian,
    legal_doc_hash,
    amount_created,
    value_created,
    disallowed_regions = [],
    token_attributes = {},
    is_smart_contract_token = false
  ) {
    const add_token_path = "/add-token";
    const data = {
      token_name,
      token_type,
      first_owner,
      custodian,
      legal_doc_hash,
      amount_created,
      value_created,
      disallowed_regions,
      token_attributes,
      is_smart_contract_token,
    };
    const result = await axiosFun({
      method: "POST",
      url: this.#url + add_token_path,
      data: data,
    });
    return result.data;
  }

  /**
   * Documentation
   * @method - Add transfer to the node.
   * @param {Number} asset1_code: The code of the asset1.
   * @param {Number} asset2_code: The code of the asset2.
   * @param {String} wallet1_address: The address of the wallet1.
   * @param {String} wallet2_address: The address of the wallet2.
   * @param {Number} asset1_qty: The quantity of the asset1.
   * @param {Number} asset2_qty: The quantity of the asset2.
   * @param {Number} transfer_type: The type of the transfer.
   * @returns Promise {Object} - The transfer address.
   * @throws {Error} - If the request fails.
   */
  async addTransfer(
    asset1_code,
    asset2_code,
    wallet1_address,
    wallet2_address,
    asset1_qty,
    asset2_qty,
    transfer_type = 4
  ) {
    const add_transfer_path = "/add-transfer";
    const data = {
      asset1_code,
      asset2_code,
      wallet1_address,
      wallet2_address,
      asset1_qty,
      asset2_qty,
      transfer_type,
    };
    const result = await axiosFun({
      method: "POST",
      url: this.#url + add_transfer_path,
      data: data,
    });
    return result.data;
  }

  /**
   * Documentation
   * @method - Validate transcation.
   * @param {Object} transaction: The transaction to be validated.
   * @returns Promise {Object} - The validation result.
   * @throws {Error} - If the request fails.
   * @example
   * node.validateTransaction(transaction);
   */
  async validateTransaction(transaction) {
    const validate_transaction_path = "/validate-transaction";
    const result = await axiosFun({
      method: "POST",
      url: this.#url + validate_transaction_path,
      data: transaction,
    });
    return result.data;
  }

  /**
   * Documentation
   * @method - Run updater.
   * @returns Promise {Object} - The updater result.
   * @throws {Error} - If the request fails.
   * @example
   * node.runUpdater();
   */
  async runUpdater() {
    const run_updater_path = "/run-updater";
    const result = await axiosFun({
      method: "POST",
      url: this.#url + run_updater_path,
    });
    return result.data;
  }

  /**
   * Documentation
   * @method - Sign transaction.
   * @param {Object}  data  - {JSON} - {walletData,transactionData}  wallet object with address, publicKey, privateKey, transaction data
   * @returns  {Object} - JSON object with transaction data
   */
  async signTransaction(data) {
    const sign_transaction_path = "/sign-transaction";
    const result = await axiosFun({
      method: "POST",
      url: this.#url + sign_transaction_path,
      data,
    });
    return result.data;
  }

  /**
   * Documentation
   * @method - Get wallet address.
   * @returns {Object} - The wallet address, public key, private key.
   */
  async generateWalletAddress() {
    const generate_wallet_address_path = "/generate-wallet-address";
    const result = await axiosFun({
      method: "GET",
      url: this.#url + generate_wallet_address_path,
    });
    return result.data;
  }

  /**
   * Documentation
   * @method - Get Address form public Key.
   * @param {String}  publicKey  - {encodeURIComponent} - publicKey
   * @returns {Object} - The wallet address.
   */
  async getWalletAddress(publicKey) {
    const generate_wallet_address_path = `/get-address-from-publickey?public_key=${publicKey}`;
    const result = await axiosFun({
      method: "GET",
      url: this.#url + generate_wallet_address_path,
    });
    return result.data;
  }
}

module.exports = Node;
