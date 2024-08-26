import { ethers } from 'ethers';
import React, { useState } from 'react';

const AddToWhitelist = () => {
  const [address, setAddress] = useState('');
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('MetaMask is not installed!');
      return;
    }

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const newProvider = new ethers.providers.Web3Provider(window.ethereum);
      const newSigner = newProvider.getSigner();
      setProvider(newProvider);
      setSigner(newSigner);
      alert('Wallet connected!');
    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert('An error occurred. Please check the console for details.');
    }
  };

  const handleAddToWhitelist = async () => {
    if (!signer) {
      alert('Please connect your wallet first!');
      return;
    }

    try {
      const whitelistAddress = "0xC0e5086CEC444e6cbA5a082323a751b83530299F";
      const whitelistAbi = [
        "function addAddressToWhitelist(address _newAddress) public",
      ];

      const whitelistContract = new ethers.Contract(whitelistAddress, whitelistAbi, signer);
      const tx = await whitelistContract.addAddressToWhitelist(address);
      await tx.wait();
      console.log(`Address ${address} added to whitelist`);
      alert('Address added to whitelist successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please check the console for details.');
    }
  };

  const handleMintNFT = async () => {
    if (!signer) {
      alert('Please connect your wallet first!');
      return;
    }

    try {
      const cryptoDevsAddress = "0x2622F1565a5776D465B32b7fF8F3cD3098B6B2FD";
      const cryptoDevsAbi = [
        "function mint() public payable",
      ];

      const cryptoDevsContract = new ethers.Contract(cryptoDevsAddress, cryptoDevsAbi, signer);
      const tx = await cryptoDevsContract.mint({ value: ethers.utils.parseEther("0.001") });
      await tx.wait();
      console.log("NFT Minted");
      alert('NFT minted successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please check the console for details.');
    }
  };

  return (
    <div>
      <h1>Whitelist and Mint NFT</h1>
      <button onClick={connectWallet}>Connect to Wallet</button>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter address"
      />
      <button onClick={handleAddToWhitelist}>Add to Whitelist</button>
      <button onClick={handleMintNFT}>Mint NFT</button>
    </div>
  );
};

export default AddToWhitelist;