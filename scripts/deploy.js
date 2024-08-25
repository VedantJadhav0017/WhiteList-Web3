async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    // Deploy Whitelist contract
    const Whitelist = await ethers.getContractFactory("Whitelist");
    const whitelist = await Whitelist.deploy(10); // Adjust _maxWhitelistedAddresses as needed
    await whitelist.deployed();
    console.log("Whitelist deployed to:", whitelist.address);
  
    // Deploy CryptoDevs contract
    const CryptoDevs = await ethers.getContractFactory("CryptoDevs");
    const cryptoDevs = await CryptoDevs.deploy(whitelist.address);
    await cryptoDevs.deployed();
    console.log("CryptoDevs deployed to:", cryptoDevs.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  