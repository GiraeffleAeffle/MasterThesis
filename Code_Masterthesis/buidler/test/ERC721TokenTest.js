const { expect } = require("chai");
const timeMachine = require('ganache-time-traveler');
const EnvItem = artifacts.require("EnvItem");

// Traditional Truffle test
contract("EnvItem", accounts => {
  let envItem;

  before('Deploy Contracts', async() => {
      /* DEPLOY CONTRACTS HERE */
      envItem = await EnvItem.new();
  });

  it("Token should be minted", async function() {
    // console.log(accounts);
    const newItemId1 = await envItem.produceItem(accounts[0], "https://ipfs.io/ipfs/Qme7PCkSTDtaMNPqF8seaZk3DxGjiWKNqShKfTNkU3VBbn");
    // console.log(newItemId1);
  });

     it('Product Information should be displayed', async () => {
       const checkProdInf = await envItem.tokenURI(1);
       //console.log(checkProdInf);
     });


     it('Token should have a new owner', async () => {
       const tokenOwner = await envItem.ownerOf(1);
       console.log("Owner before: ",tokenOwner);
       const shallBeNewOwner = accounts[1];
       const sendItem1 = await envItem.sendItem(tokenOwner, shallBeNewOwner, 1 );
       const isNewOwner = await envItem.ownerOf(1);
       assert.equal(isNewOwner,shallBeNewOwner);
       console.log("Owner after: ",isNewOwner);
     });
});
