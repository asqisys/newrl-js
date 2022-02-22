# newrl-js v 1.0.1

JS wrapper functions for interacting with the Newrl blockchain.

## Requirements

- Node JS (>=14.0.0)
- npm (Node JS package manager)

## Installation

Add `newrl-js` to your project requirements
and/or run the installation with:

```js
npm i newrl-js
```

## Usage

### Node JS

```js
const newrl = require("newrl-js");
```

### Initialise a node connection

A node address along with port can be given to initialise a new node connection. If no address is provided, the default newrl foundation node at address `http://newrl.net:8090` will be used.

```js
const node = new newrl.Node("http://3.6.236.206:8090");
```

## Off chain operations

#### Get file hash

Certain Newrl operations use document hashes for verification purpose. A file hash can be obtained with the below command.

| Parameter | Type     | Description             |
| :-------- | :------- | :---------------------- |
| `file`    | `string` | **Required**. file path |

Example

```js
const hash = await newrl.getFileHash("/home/user/file.txt");
```

#### Generate new wallet

A wallet address generation can be done off-chain. The result is a dictionary containing public, private and address of the new wallet. A wallet once generated should be added to the chain to make it available for use.

Example

```js
const testWallet = new newrl.Wallet();

const wallet = await testWallet.getWalletAddress();
```

#### Sign transaction

A transaction need to be signed with the applicable wallet for addition to chain.

| Parameter          | Type     | Description                      |
| :----------------- | :------- | :------------------------------- |
| `wallet_data`      | `object` | **Required**. {JSON} wallet      |
| `transaction_data` | `object` | **Required**. {JSON} transaction |

Example

```js
const signedWallet = await newrl.signTransaction(wallet, walletAddTransaction);
```

## On chain operations

#### Add wallet to chain

A wallet address once genearated need to be signed and then added to the chain.

| Parameter             | Type     | Description                             |
| :-------------------- | :------- | :-------------------------------------- |
| `custodian_address`   | `string` | **Required**. Address of the custodian  |
| `jurisdiction`        | `string` | **Required**. Jurisdiction of the owner |
| `public_key`          | `string` | **Required**. Public key of the owner   |
| `ownertype ?= "1"`    | `string` | _{Optional}_ Type of owner              |
| `kyc_docs ?= []`      | `array`  | _{Optional}_ kyc documents of the owner |
| `specific_data ?= {}` | `object` | _{Optional}_ Specific data of the owner |

Example

```js
let walletAddTransaction = await node.addWallet(
  wallet["address"],
  "910",
  wallet["publicKey"]
);
```

#### Add token to chain

A token can be created, signed and then validated to add to the chain.

| Parameter                          | Type      | Description                                   |
| :--------------------------------- | :-------- | :-------------------------------------------- |
| `token_name`                       | `string`  | **Required**. Name of the token               |
| `token_type`                       | `string`  | **Required**. Type of the token               |
| `first_owner`                      | `string`  | **Required**. First owner of the token        |
| `custodian`                        | `string`  | **Required**. Custodian of the token          |
| `legal_doc_hash`                   | `string`  | **Required**. Hash of the legal document      |
| `amount_created`                   | `number`  | **Required**. Amount of the token created     |
| `value_created`                    | `number`  | **Required**. Value of the token created      |
| `disallowed_regions ?= []`         | `array`   | _{Optional}_. Disallowed regions of the token |
| `token_attributes ?= {}`           | `object`  | _{Optional}_. Attributes of the token         |
| `is_smart_contract_token ?= false` | `boolean` | _{Optional}_. Smart contract token            |

Example

```js
const tokenDetails = await node.addToken(
  "my_new_token",
  "1",
  "0x16031ef543619a8569f0d7c3e73feb66114bf6a0",
  "0x16031ef543619a8569f0d7c3e73feb66114bf6a0",
  "fhdkfhldkhf",
  10000,
  10000
);
```

#### Add transfer

A transfer can be created between two wallets either unilaterally or bilaterally depending on the transfer type.

| Parameter         | Type     | Description                          |
| :---------------- | :------- | :----------------------------------- |
| `asset1_code`     | `number` | **Required**. Code of the asset1     |
| `asset2_code`     | `number` | **Required**. Code of the asset2     |
| `wallet1_address` | `string` | **Required**. Address of the wallet1 |
| `wallet2_address` | `string` | **Required**. Address of the wallet2 |
| `asset1_qty`      | `number` | **Required**. Quantity of the asset1 |
| `asset2_qty`      | `number` | **Required**. Quantity of the asset2 |
| `transfer_type`   | `number` | **Required**. Type of the transfer   |

Example

```js
const transferTransaction = await node.addTransfer(
  9,
  10,
  "0x16031ef543619a8569f0d7c3e73feb66114bf6a0",
  "0x16031ef543619a8569f0d7c3e73feb66114bf6a0",
  10,
  10,
  4
);
```

#### Get balance

The balance of a given token in a wallet, across wallets or all tokens in a wallet can be obtained with get balance function.

| Parameter        | Type     | Description                  |
| :--------------- | :------- | :--------------------------- |
| `balance_type`   | `string` | **Required**. Balance Type   |
| `wallet_address` | `string` | **Required**. Wallet Address |
| `token_code`     | `number` | **Required**. Token Code     |

Example

```js
const balance = await node.getBalance(
  "TOKEN_IN_WALLET",
  "0xc29193dbab0fe018d878e258c...",
  9
);
```

# Test

Type the following command for testing

```js
  npm test
```
