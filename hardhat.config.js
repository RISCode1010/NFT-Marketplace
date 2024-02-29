require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
const URL = process.env.NEXT_PUBLIC_URL;
const SEPOLIA_PRIVATE_KEY = process.env.NEXT_PUBLIC_SEPOLIA_PRIVATE_KEY;
module.exports = {
  solidity: "0.8.19",
  // defaultNetwork: "sepolia",
  networks: {
    N1: {
      url: URL,
      accounts: [SEPOLIA_PRIVATE_KEY],
    }
  }
};
