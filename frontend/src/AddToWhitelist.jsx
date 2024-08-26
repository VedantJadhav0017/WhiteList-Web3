import React, { useState } from 'react';
import { ethers } from 'ethers';

const App = () => {
  const [address, setAddress] = useState('');

  const handleAddToWhitelist = async () => {
    if (!window.ethereum) {
      alert('MetaMask is not installed!');
      return;
    }

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const whitelistAddress = "0xC0e5086CEC444e6cbA5a082323a751b83530299F";
      const cryptoDevsAddress = "0x2622F1565a5776D465B32b7fF8F3cD3098B6B2FD";

      const whitelistAbi = [
        "function addAddressToWhitelist(address _newAddress) public",
        "function WhitelistedAddresses(address) public view returns (bool)",
        "function MaxWhitelistedAddresses() public view returns (uint8)"
      ];

      const cryptoDevsAbi = [
        "function mint() public payable",
        "function withdraw() public",
        "function totalSupply() public view returns (uint256)",
        "function balanceOf(address) public view returns (uint256)"
      ];

      const whitelistContract = new ethers.Contract(whitelistAddress, whitelistAbi, signer);
      const cryptoDevsContract = new ethers.Contract(cryptoDevsAddress, cryptoDevsAbi, signer);

      const tx1 = await whitelistContract.addAddressToWhitelist(address);
      await tx1.wait();
      console.log(`Address ${address} added to whitelist`);

      const tx2 = await cryptoDevsContract.mint({ value: ethers.utils.parseEther("0.001") });
      await tx2.wait();
      console.log("NFT Minted");

      alert('Address added to whitelist and NFT minted successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please check the console for details.');
    }
  };

  return (
    <div>
      <h1>Whitelist and Mint NFT</h1>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter address"
      />
      <button onClick={handleAddToWhitelist}>Add to Whitelist and Mint NFT</button>
    </div>
  );
};

export default App;