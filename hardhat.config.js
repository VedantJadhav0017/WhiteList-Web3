require('@nomiclabs/hardhat-ethers');

module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/L48GvvFcr3uke99FH2mWBG0tvM2L_Np8`,
      accounts: [`0x906adfc59cdedcaa060767008764349a03028fc2215ed1e81ebfd939ad683407`]
    }
  }
};
