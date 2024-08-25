// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Whitelist.sol";

contract CryptoDevs is ERC721Enumerable, Ownable {
    uint256 constant public maxTokenIds = 100;
    uint256 constant public _price = 0.001 ether;
    uint256 public reservedTokens;
    uint256 public reservedTokensClaimed = 0;

    // Whitelist contract instance
    Whitelist whitelist;

    constructor (address whitelistContract) 
    ERC721("Crypto Devs", "CD")
    Ownable() {
        whitelist = Whitelist(whitelistContract);
        reservedTokens = whitelist.MaxWhitelistedAddresses();
    }

    function mint() public payable {
        require(totalSupply() + reservedTokens - reservedTokensClaimed < maxTokenIds, "EXCEEDED_MAX_SUPPLY");

        if (whitelist.WhitelistedAddresses(msg.sender) && msg.value < _price) {
            require(balanceOf(msg.sender) == 0, "ALREADY_OWNED");
            reservedTokensClaimed += 1;
        } else {
            require(msg.value >= _price, "NOT_ENOUGH_ETHER");
        }
    }
}
