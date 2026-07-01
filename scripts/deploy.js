const hre = require('hardhat');

async function main() {
  console.log('\n🚀 Deploying ORA Universe Contracts...\n');

  try {
    const accounts = await hre.ethers.getSigners();
    const deployer = accounts[0];
    console.log(`📍 Deploying from: ${deployer.address}`);

    console.log('\n1️⃣  Deploying OTToken...');
    const OTToken = await hre.ethers.getContractFactory('OTToken');
    const otToken = await OTToken.deploy();
    await otToken.waitForDeployment();
    const tokenAddress = await otToken.getAddress();
    console.log(`✅ OTToken deployed: ${tokenAddress}`);

    console.log('\n2️⃣  Deploying KamaraPayment...');
    const KamaraPayment = await hre.ethers.getContractFactory('KamaraPayment');
    const kamaraPayment = await KamaraPayment.deploy();
    await kamaraPayment.waitForDeployment();
    const paymentAddress = await kamaraPayment.getAddress();
    console.log(`✅ KamaraPayment deployed: ${paymentAddress}`);

    const fs = require('fs');
    const deploymentAddresses = {
      network: hre.network.name,
      chainId: (await hre.ethers.provider.getNetwork()).chainId,
      deployer: deployer.address,
      OTToken: tokenAddress,
      KamaraPayment: paymentAddress,
      deployedAt: new Date().toISOString()
    };

    fs.writeFileSync(
      'deployment-addresses.json',
      JSON.stringify(deploymentAddresses, null, 2)
    );

    console.log('\n✨ Deployment Summary:');
    console.log('================================');
    console.log(`Network: ${hre.network.name}`);
    console.log(`OTToken: ${tokenAddress}`);
    console.log(`KamaraPayment: ${paymentAddress}`);
    console.log('================================\n');

    console.log('📝 Update your .env file with:');
    console.log(`CONTRACT_ADDRESS=${paymentAddress}`);
    console.log(`TOKEN_ADDRESS=${tokenAddress}\n`);

  } catch (error) {
    console.error('❌ Deployment failed:', error);
    process.exitCode = 1;
  }
}

main();
