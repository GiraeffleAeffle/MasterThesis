const { expect } = require("chai");
// const timeMachine = require('ganache-time-traveler');
const LCIBlockchain = artifacts.require("LCIBlockchain");

// Traditional Truffle test
contract("LCIBlockchain", accounts => {
  let lciBlockchain;

  before('Deploy Contracts', async() => {
      /* DEPLOY CONTRACTS HERE */
      lciBlockchain = await LCIBlockchain.new();
  });
    // TESTS
    
  it("Transaction should be send", async function() {
    const newTx = await lciBlockchain.setNewTransaction("Charge1","0xeAD9C93b79Ae7C1591b1FB5323BD777E86e150d4","BID1","Qme7PCkSTDtaMNPqF8seaZk3DxGjiWKNqShKfTNkU3VBbn");
  });

  it("Transaction should not be send and throw an error (first parameter not being a string)", async function() {
    try {
        await lciBlockchain.setNewTransaction(1,"0xeAD9C93b79Ae7C1591b1FB5323BD777E86e150d4","BID1","Qme7PCkSTDtaMNPqF8seaZk3DxGjiWKNqShKfTNkU3VBbn");
    }
    catch (err) {
      console.log("can not be an integer");
    }
    try {
        await lciBlockchain.setNewTransaction(true,"0xeAD9C93b79Ae7C1591b1FB5323BD777E86e150d4","BID1","Qme7PCkSTDtaMNPqF8seaZk3DxGjiWKNqShKfTNkU3VBbn");
    }
    catch (err) {
      console.log("can not be a bool");
    }
  });

  it("Transaction should not be send and throw an error (second parameter not being an address)", async function() {
    try {
        await lciBlockchain.setNewTransaction("Charge1",1,"BID1","Qme7PCkSTDtaMNPqF8seaZk3DxGjiWKNqShKfTNkU3VBbn");
    }
    catch (err) {
      console.log("can not be an integer");
    }
    try {
        await lciBlockchain.setNewTransaction("Charge1",true,"BID1","Qme7PCkSTDtaMNPqF8seaZk3DxGjiWKNqShKfTNkU3VBbn");
    }
    catch (err) {
      console.log("can not be a bool");
    }
  });

  it("Transaction should not be send and throw an error (third parameter not being a string)", async function() {
    try {
        await lciBlockchain.setNewTransaction("Charge1","0xeAD9C93b79Ae7C1591b1FB5323BD777E86e150d4",1,"Qme7PCkSTDtaMNPqF8seaZk3DxGjiWKNqShKfTNkU3VBbn");
    }
    catch (err) {
      console.log("can not be an integer");
    }
    try {
        await lciBlockchain.setNewTransaction("Charge1","0xeAD9C93b79Ae7C1591b1FB5323BD777E86e150d4",true,"Qme7PCkSTDtaMNPqF8seaZk3DxGjiWKNqShKfTNkU3VBbn");
    }
    catch (err) {
      console.log("can not be a bool");
    }
  });

  it("Transaction should not be send and throw an error (third parameter not being a string)", async function() {
    try {
        await lciBlockchain.setNewTransaction("Charge1","0xeAD9C93b79Ae7C1591b1FB5323BD777E86e150d4","BID1",1);
    }
    catch (err) {
      console.log("can not be an integer");
    }
    try {
        await lciBlockchain.setNewTransaction("Charge1","0xeAD9C93b79Ae7C1591b1FB5323BD777E86e150d4","BID1",true);
    }
    catch (err) {
      console.log("can not be a bool");
    }
  });


  it('Get data to Transaction', async () => {
    const checkProdInf = await lciBlockchain.getData("Charge1","0xc783df8a850f42e7F7e57013759C285caa701eB6", "0xeAD9C93b79Ae7C1591b1FB5323BD777E86e150d4","BID1");
    console.log(checkProdInf);
  });

});
