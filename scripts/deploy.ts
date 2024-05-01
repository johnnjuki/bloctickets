const hre = require('hardhat');

async function main() {
  await hre.run("compile");

  const ticketopia = await hre.ethers.deployContract('Ticketopia');
  await ticketopia.waitForDeployment();
  console.log(`Ticketopia deployed to ${ticketopia.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});