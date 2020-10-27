pragma solidity >=0.5.0 <0.7.0;


import "@nomiclabs/buidler/console.sol";

/*
  contract LCIBlockchain erbt von Ownable, SafeMath, dem ERC721 und ERC20 Token
*/
contract LCIBlockchain {      //is Ownable, SafeMath, ERC721, ERC20, ChainlinkClient {


  mapping (string => mapping (address => mapping (address => mapping (string => string)))) supplyChainIDToData;
  // supplychainID : fromEthAddress : toEthAddress : string : string
  // Jede Lieferkette hat eine Identifikationsnummer, welche zu der Sender
  // Ethadresse gemappt wird, welche zu der Empfängeradrresse gemappt wird,
  // welche zu den Batches gemappt wird.

    // 2. Funktion, um name, supplyEthAddress und IPFS Hash zu speichern und anzuschauen

  event GetNewTransaction(string _supplyChainId, address _fromEthAddress, address _toEthAddress, string _batchId, string _productInformation);

  function setNewTransaction(string memory _supplyChainId, address _toEthAddress, string memory _batchId, string memory _productInformation) public {
    supplyChainIDToData[_supplyChainId][msg.sender][_toEthAddress][_batchId] = _productInformation;
    emit GetNewTransaction(_supplyChainId, msg.sender, _toEthAddress, _batchId, _productInformation);
  }


  //Read function
  function getData(string memory _supplyChainId, address _fromEthAddress, address _toEthAddress, string memory _batchId) public view returns(string memory) {
    return supplyChainIDToData[_supplyChainId][_fromEthAddress][_toEthAddress][_batchId];
  }

}
