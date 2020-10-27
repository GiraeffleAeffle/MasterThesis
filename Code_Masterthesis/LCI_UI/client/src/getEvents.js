var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/LCI";
var Web3 = require('web3');
var infura_address = 'wss://rinkeby.infura.io/ws/v3/25f83305af074f0884d3c8873fa23fcd';
// var infura_address = 'https://rinkeby.infura.io/v3/25f83305af074f0884d3c8873fa23fcd';
var mongo = require('mongodb');
const web3 = new Web3(new Web3.providers.WebsocketProvider(infura_address));
var contractAddress = '0x3D9F4199CA3960f74749eD697eDfB2e79CA2206B';
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
  }
];
var contract = new web3.eth.Contract(abi,contractAddress);


contract.events.GetNewTransaction(
  {}, function(err, events) {
      console.log('Writing event data to data base...')
      console.log(events)
      MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        console.log("Database created!");
        db.db("LCI").collection("EnvironmentalData").insertOne(events, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted", '\n');
        db.close();
        });
      });
  })
