async function main() {
  // const [deployer] = await ethers.getSigners();

  // console.log("Deploying contracts with the account:", deployer.address);

  const NFTMarketplace = await ethers.deployContract("NFTMarketplace");

  console.log("NFTMarketplace address:", await NFTMarketplace.getAddress());
  // console.log("NFT contract ABI:", JSON.stringify(nft.interface, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
