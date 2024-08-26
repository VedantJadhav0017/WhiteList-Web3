import { ethers } from "ethers";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors"; // Import cors

// Set up provider and contracts
const provider = new ethers.providers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/L48GvvFcr3uke99FH2mWBG0tvM2L_Np8");

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

const whitelistContract = new ethers.Contract(whitelistAddress, whitelistAbi, provider);
const cryptoDevsContract = new ethers.Contract(cryptoDevsAddress, cryptoDevsAbi, provider);

// Set up Express server
const app = express();
app.use(cors()); // Use cors middleware
app.use(bodyParser.json());

app.post('/run', async (req, res) => {
  const { address } = req.body;
  if (!address) {
    return res.status(400).send("Address is required");
  }

  try {
    // Just a placeholder response, actual transaction will be handled on the frontend
    res.send("Ready to add address to whitelist and mint NFT");
  } catch (error) {
    console.error("Error in /run endpoint:", error);
    res.status(500).send("An error occurred");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});