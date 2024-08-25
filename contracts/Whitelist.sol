// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Whitelist {
    uint8 public MaxWhitelistedAddresses;
    mapping(address => bool) public WhitelistedAddresses;
    uint8 public WhitelistedAddressesCount;

    constructor(uint8 _maxWhitelistedAddresses) {
        MaxWhitelistedAddresses = _maxWhitelistedAddresses;
    }

    function addAddressToWhitelist(address _newAddress) public {
        require(WhitelistedAddressesCount < MaxWhitelistedAddresses, "Max number of whitelisted addresses reached");
        WhitelistedAddresses[_newAddress] = true;
        WhitelistedAddressesCount++;
    }

    // Uncomment this function if you need to use it
    // function removeAddressFromWhitelist(address _address) public {
    //     require(WhitelistedAddresses[_address], "Address is not whitelisted");
    //     WhitelistedAddresses[_address] = false;
    //     WhitelistedAddressesCount--;
    // }
}
