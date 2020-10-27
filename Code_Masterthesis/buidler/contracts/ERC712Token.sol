pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@nomiclabs/buidler/console.sol";

contract EnvItem is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() public ERC721("EnvItem", "ENI") {}

    function produceItem(address producer, string memory tokenURI)
        public
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(producer, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }

    function sendItem(address owner, address newOwner, uint256 tokenId)
        public
        returns (bool)
    {
          safeTransferFrom(owner, newOwner, tokenId);
          return true;
    }

}
