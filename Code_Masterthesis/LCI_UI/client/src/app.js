const Tx = require('ethereumjs-tx');
var Web3 = require('web3');
var infura_address = 'https://rinkeby.infura.io/v3/25f83305af074f0884d3c8873fa23fcd';
var web3 = new Web3(infura_address);

// WALLET ADDRESSES
var walletAdresses = [
  '0x9690e4564DE716d2c0C5ec4C66bD304ca2b9D933',
  '0x4280c6Ef5851D6c2AA00f2344929a3AF21c05EEF',
  '0x62851803D86dE4BE12651750604044Fc9B2A9589',
  '0x293B3F0285F45D86E7F03dc81fc22031Ee10C838',
  '0xBdD949173df8E7F472f51cd0cf450AB7F075A78c',
  '0x4B21A9335d1B13d09EAB8FBAE54f74b84a0A27b2',
  '0x4ebb4c5B60a5259Ce63F37207F0A22bdc467eB27',
  '0x699cbCc49E59643916Fc3Bf4e616C2E412b48C77',
  '0x5Ec67cDed5c06894a6DB95783257136581c9C8E4',
  '0x8ff91875E24b5Ce3A00Ea6A5662224D0738eB02A'
];
var a_A = walletAdresses[0];
var b_B = walletAdresses[1];
var c_C = walletAdresses[2];
var d_D = walletAdresses[3];
var e_E = walletAdresses[4];
var f_F = walletAdresses[5];
var g_G = walletAdresses[6];
var h_H = walletAdresses[7];
var i_I = walletAdresses[8];
var j_J = walletAdresses[9];

// GET PRIVATE KEYS FROM .env
require('dotenv').config();
var contractAddress = '0x3D9F4199CA3960f74749eD697eDfB2e79CA2206B'; // address of contract on ETH Blockchain
var abi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "_supplyChainId",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "_fromEthAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "_toEthAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "_batchId",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "_productInformation",
        "type": "string"
      }
    ],
    "name": "GetNewTransaction",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "_supplyChainId",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_toEthAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_batchId",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_productInformation",
        "type": "string"
      }
    ],
    "name": "setNewTransaction",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "string",
        "name": "_supplyChainId",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_fromEthAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_toEthAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_batchId",
        "type": "string"
      }
    ],
    "name": "getData",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }]; //changes when contract changes
var contract = new web3.eth.Contract(abi,contractAddress);
var priv_keys = [
  Buffer.from(process.env.PRIV_KEY_A,'hex'),
  Buffer.from(process.env.PRIV_KEY_B,'hex'),
  Buffer.from(process.env.PRIV_KEY_C,'hex'),
  Buffer.from(process.env.PRIV_KEY_D,'hex'),
  Buffer.from(process.env.PRIV_KEY_E,'hex'),
  Buffer.from(process.env.PRIV_KEY_E,'hex'),
  Buffer.from(process.env.PRIV_KEY_F,'hex'),
  Buffer.from(process.env.PRIV_KEY_G,'hex'),
  Buffer.from(process.env.PRIV_KEY_H,'hex'),
  Buffer.from(process.env.PRIV_KEY_I,'hex'),
  Buffer.from(process.env.PRIV_KEY_J,'hex')
];

var key_A = priv_keys[0];
var key_B = priv_keys[1];
var key_C = priv_keys[2];
var key_D = priv_keys[3];
var key_E = priv_keys[4];
var key_F = priv_keys[5];
var key_G = priv_keys[6];
var key_H = priv_keys[7];
var key_I = priv_keys[8];
var key_J = priv_keys[9];


// DATA TO SEND
const datas = [
  contract.methods.setNewTransaction(
  "TX1",c_C,"BID1", "QmUunaTmqUP457AyfUGZpZNc6svPdLPKqXtL68CBeLFBqx").encodeABI(),
  contract.methods.setNewTransaction(
  "TX1",c_C,"BID2", "QmUunaTmqUP457AyfUGZpZNc6svPdLPKqXtL68CBeLFBqx").encodeABI(),
  contract.methods.setNewTransaction(
  "TX1",e_E,"BID3", "QmUunaTmqUP457AyfUGZpZNc6svPdLPKqXtL68CBeLFBqx").encodeABI(),
  contract.methods.setNewTransaction(
  "TX1",e_E,"BID3", "QmUunaTmqUP457AyfUGZpZNc6svPdLPKqXtL68CBeLFBqx").encodeABI(),
  contract.methods.setNewTransaction(
  "TX1",f_F,"BID3", "QmUunaTmqUP457AyfUGZpZNc6svPdLPKqXtL68CBeLFBqx").encodeABI(),
  contract.methods.setNewTransaction(
  "TX1",g_G,"BID3", "QmUunaTmqUP457AyfUGZpZNc6svPdLPKqXtL68CBeLFBqx").encodeABI(),
  contract.methods.setNewTransaction(
  "TX1",h_H,"BID3", "QmUunaTmqUP457AyfUGZpZNc6svPdLPKqXtL68CBeLFBqx").encodeABI(),
  contract.methods.setNewTransaction(
  "TX1",h_H,"BID3", "QmUunaTmqUP457AyfUGZpZNc6svPdLPKqXtL68CBeLFBqx").encodeABI(),
  contract.methods.setNewTransaction(
  "TX1",i_I,"BID3", "QmUunaTmqUP457AyfUGZpZNc6svPdLPKqXtL68CBeLFBqx").encodeABI(),
  contract.methods.setNewTransaction(
  "TX1",j_J,"BID3", "QmUunaTmqUP457AyfUGZpZNc6svPdLPKqXtL68CBeLFBqx").encodeABI()
];

var data_A = datas[0];
var data_B = datas[1];
var data_C = datas[2];
var data_D = datas[3];
var data_E1 = datas[4];
var data_E2 = datas[5];
var data_F = datas[6];
var data_G = datas[7];
var data_H = datas[8];
var data_I = datas[9];


//// TRANSACTIONS ////


function transactionsToSendFunction(contractAddress, fromAddress, key, transData) {
      web3.eth.getTransactionCount(fromAddress, (err, txCount) => {

        //Create transaction object
        const txObject = {
          nonce: web3.utils.toHex(txCount),
          gasLimit: web3.utils.toHex(8000000),
          gasPrice: web3.utils.toHex(web3.utils.toWei('50','gwei')),
          to: contractAddress,
          chainId:4,
          data: transData
        }

        // Sign the transaction
        const tx = new Tx(txObject, {chain:'rinkeby', hardfork: 'petersburg'})
        tx.sign(key)

        const serializedTx = tx.serialize()
        const raw = '0x' + serializedTx.toString('hex')

        //Broadcast the transaction
        // try {
          web3.eth.sendSignedTransaction(raw, (err, txHash) => {
            console.log('err:', err, 'txHash:', txHash);
            })
        // }
        // catch(err) {
        //   console.log("transaction failed, because nonce was too low");
        // }
      });
}

// SEND RANDOM TRANSACTION
var randnum = Math.floor(Math.random()*10);
transactionsToSendFunction(contractAddress,walletAdresses[randnum],priv_keys[randnum], datas[randnum]);
