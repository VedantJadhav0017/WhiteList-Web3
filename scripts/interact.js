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

const walletPrivateKey = "0x906adfc59cdedcaa060767008764349a03028fc2215ed1e81ebfd939ad683407"; // Ensure this is a valid private key
const wallet = new ethers.Wallet(walletPrivateKey, provider);

const whitelistContract = new ethers.Contract(whitelistAddress, whitelistAbi, wallet);
const cryptoDevsContract = new ethers.Contract(cryptoDevsAddress, cryptoDevsAbi, wallet);

async function addAddressToWhitelist(address) {
  try {
    const tx = await whitelistContract.addAddressToWhitelist(address);
    await tx.wait();
    console.log(`Address ${address} added to whitelist`);
  } catch (error) {
    console.error("Error adding address to whitelist:", error);
  }
}

async function mint() {
  try {
    const tx = await cryptoDevsContract.mint({ value: ethers.utils.parseEther("0.001") });
    await tx.wait();
    console.log("NFT Minted");
  } catch (error) {
    console.error("Error minting NFT:", error);
  }
}

// Function to be called from the frontend
export async function run(addrToAdd) {
  try {
    await addAddressToWhitelist(addrToAdd);
    await mint();
  } catch (error) {
    console.error("Error in run function:", error);
  }
}

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
    await run(address);
    res.send("Address added to whitelist and NFT minted successfully");
  } catch (error) {
    console.error("Error in /run endpoint:", error);
    res.status(500).send("An error occurred");
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});