// usePlugin("@nomiclabs/buidler-waffle");
usePlugin("@nomiclabs/buidler-ganache");
usePlugin("@nomiclabs/buidler-truffle5");

task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(await account.getAddress());
  }
});

module.exports = {
  solc: {
    version: "0.6.8"
  }
};
