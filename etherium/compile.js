const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

// get path to build folder
const buildPath = path.resolve(__dirname, "build");
// delete build folder
fs.removeSync(buildPath);

// get path to Campaigns.sol
const campaignPath = path.resolve(__dirname, "contracts", "Campaing.sol");
// read campaign file
const source = fs.readFileSync(campaignPath, "utf8");
// compile contracts and get contracts
let input = {
  language: "Solidity",
  sources: {
    "Campaing.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};
// const output = solc.compile(output, 1);
const output = JSON.parse(solc.compile(JSON.stringify(input)));
// create build folder
fs.ensureDirSync(buildPath);

// loop over output and write each contract to different file in build directory
if (output.errors) {
  output.errors.forEach((err) => {
    console.log(err.formattedMessage);
  });
} else {
  const contracts = output.contracts["Campaing.sol"];
  for (let contractName in contracts) {
    const contract = contracts[contractName];
    fs.writeFileSync(
      path.resolve(buildPath, `${contractName}.json`),
      JSON.stringify(contract, null, 2),
      "utf8"
    );
  }
}
