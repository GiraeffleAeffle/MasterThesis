const HDWalletProvider = require('./client/node_modules/truffle-hdwallet-provider');


module.exports = {
  contracts_build_directory: './client/src/artifacts/',
  networks: {
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(
          "rose all canyon rescue dentist shrug decide budget helmet angry scheme mystery",
          "https://rinkeby.infura.io/v3/25f83305af074f0884d3c8873fa23fcd"
        )
      },
      gasPrice: 17000000000,
      network_id: 4
    },
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};
