# newrl-js
JS wrapper functions for interacting with the Newrl blockchain.

## Requirements

- Node JS (>=14.0.0)
- npm (Node JS package manager)

## Installation
Add `newrl-js` to your project requirements 
and/or run the installation with:
```bash
npm i newrl-js
```


## Usage

### Node JS
```
const newrl = require("newrl-js");
```

### Initialise a node connection
A node address along with port can be given to initialise a new node connection. If no address is provided, the default newrl foundation node at address `http://newrl.net:8090` will be used.

```bash
const node = new newrl.Node('http://3.6.236.206:8090/');
```

#### Get balance
The balance of a given token in a wallet, across wallets or all tokens in a wallet can be obtained with get balance function.
```bash
    getBalance(balance_type, wallet_address, token_code)
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `balance_type` | `string` | **Required**. Balance Type |
| `wallet_address` | `string` | **Required**. Wallet Address |
| `token_code` | `number` | **Required**. Token Code |



Example
```bash
async () => {
  try {
    await node.getBalance(
      "TOKEN_IN_WALLET",
      "0xc29193dbab0fe018d878e258c...",
      9
    );
    ...
  } catch (error) {
    ...
  }
};
```


# Test
Type the following command for testing
```bash
  npm test
```
