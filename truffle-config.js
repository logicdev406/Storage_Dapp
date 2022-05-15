const HDwalletProvider = require("@truffle/hdwallet-provider");
const path = require("path");
const privatekeys = [
  "0xa5230e551b11215b5f6c313493eb7b29ac38fb31b3277427db640d510bf9ea0e",
];

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      host: "127.0.0.1",
      network_id: "*",
      port: 8545,
    },
    rinkebyTestnet: {
      provider: () =>
        new HDwalletProvider(
          privatekeys,
          "https://rinkeby.infura.io/v3/8dd8d2c7a45a448b92bd59a6089e076e"
        ),
      network_id: 4,
      skipDryRun: true,
    },
  },
};
