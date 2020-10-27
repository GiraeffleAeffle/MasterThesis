// MONGODB
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/LCI";

// WEB3
var Web3 = require('web3');
var infura_address = 'wss://rinkeby.infura.io/ws/v3/25f83305af074f0884d3c8873fa23fcd';
// var infura_address = 'https://rinkeby.infura.io/v3/25f83305af074f0884d3c8873fa23fcd';
const web3 = new Web3(new Web3.providers.WebsocketProvider(infura_address));

// IPFS
const ipfsClient = require('ipfs-http-client')
const IPFS = require('ipfs')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values

const math = require('mathjs')

// VARIABLES

var supplyChainId = [];
var fromEthAddress = [];
var toEthAddress = [];
var batchId = [];
var productInformation = [];
var node;
var ipfsData = [];
var outp_Cmps = [];
var supp_outp_Cmps = [];
var inp_Cmps = [];
var sup_array = [];
var sup_nb_array = [];
var sup_ext_outp_array = [];


// TEST VERSION //

// This script takes the environmental data out of the database, looks up the product
// information from IPFS and calculates the LCI for a small supply chain of a toaster.
// To further extend the automation it would have to sort the supplyChainId and
// batchId by matching pairs. After that casually random samples would have to
// be taken to perform quality checks and avoid spam.

MongoClient.connect(url, { useUnifiedTopology: true },async function(err, db) {
    if (err) throw err;
    await setUpIPFS()
    db.db("LCI").collection("EnvironmentalData").find({}).toArray(async function(err, result) {
      if (err) throw err;
      for await(let ii of Object.keys(result)) {
        supplyChainId[ii] = result[ii].returnValues._supplyChainId;
        fromEthAddress[ii] = result[ii].returnValues._fromEthAddress;
        toEthAddress[ii] = result[ii].returnValues._toEthAddress;
        batchId[ii] = result[ii].returnValues._batchId;
        productInformation[ii] = result[ii].returnValues._productInformation;
        ipfsData[ii] = JSON.parse(await getIpfsData(productInformation[ii]));
      }
      db.close();
      var inputData;
      var inputComp;
      var inputFM = [];
      var outputData;
      var outputComp;
      var outputFM = [];
      var co2Pull = [];
      // SupplychainID and BatchID has to match for the pairs
      // var uniqueSID = new Set(supplyChainId)
      // var uniqueBID = new Set(batchId)
      // Here the code would have to be extended to support the matching of
      // supplychainID and BatchId pairs
      for await(let jj of Object.keys(ipfsData)) {
        inputData = ipfsData[jj]["Input"]
        outputData = ipfsData[jj]["Output"]
        for await(let kk of Object.keys(inputData)) { //INPUT
          inputComp = Object.keys(inputData[kk])[0];
          inp_Cmps.push(inputComp);
          inputFM.push(inputData[kk][String(inputComp)]);
        }
        for await(let ll of Object.keys(outputData)) { //OUTPUT
          outputComp = Object.keys(outputData[ll])[0];
          if (String(outputComp) == "CO2") {
            co2Pull.push(outputData[ll][String(outputComp)]);
          }
          else {
            outputFM.push(outputData[ll][String(outputComp)]);
            outp_Cmps.push(outputComp);
            supp_outp_Cmps.push(outputComp);
            if (Object.keys(inputData).length >1 ){
              supp_outp_Cmps.push(outputComp);
            }
          }
        }
      }
      for (let aa = 0; aa< outp_Cmps.length;aa++) {
        for (let bb = 0; bb< supp_outp_Cmps.length;bb++) {
          if ( supp_outp_Cmps[bb] == outp_Cmps[aa] ) {
            sup_ext_outp_array.push(aa)
          }
        }
      }
      for (let tt = 0; tt< inp_Cmps.length;tt++) {
        for (let ss = 0; ss< outp_Cmps.length;ss++) {
          if ( outp_Cmps[ss] == inp_Cmps[tt] ) {
            sup_nb_array.push(ss)
          }
        }
      }
      var mat_A = math.zeros(outp_Cmps.length, outp_Cmps.length);
      for (let mm = 0; mm < outp_Cmps.length; mm++){
          sup_array[mm] = mm;
      }
      // Setting up Matrices
      for await(let column of sup_array) { // Filling Matrix
        for await(let row of sup_array) { // Filling Matrix
          if (outp_Cmps[column] == outp_Cmps[row]) {
            mat_A.set([column,row], outputFM[column])
          }
        }
      }
      for (let gg = 0; gg < sup_ext_outp_array.length; gg++) {
        mat_A.set([sup_nb_array[gg],sup_ext_outp_array[gg]], inputFM[gg])
      }
      console.log("A:",mat_A);
      mat_A_inv = math.inv(mat_A);

      var mat_B = math.zeros(outp_Cmps.length);
      for (dd = 0; dd < co2Pull.length; dd++){
        mat_B.set([0,dd], co2Pull[dd]);
      }
      console.log("B:",mat_B)
      var mat_k = [[0],[0],[1]]; // Functional Unit

      // Calculate LCI
      console.log("mat_k:",mat_k);
      var mat_B_A_inv = math.dotMultiply(mat_B, mat_A_inv)
      console.log(mat_B_A_inv);

      var mat_M = math.multiply( mat_B_A_inv , mat_k);
      console.log(mat_M);

    });
  });



// Getting Data from IPFS
async function setUpIPFS() {
  node = await IPFS.create()
}

async function getIpfsData(productInformation){
const stream = node.cat(productInformation)
let data = ''

for await (const chunk of stream) {
  // chunks of data are returned as a Buffer, convert it back to a string
  data += chunk.toString()
}
return data
}


// EALIER VERSION //

// MongoClient.connect(url, { useUnifiedTopology: true },async function(err, db) {
//   if (err) throw err;
//   await setUpIPFS()
//   db.db("LCI").collection("EnvironmentalData").find({}).toArray(function(err, result) {
//     if (err) throw err;
//     for (ii = 0; ii<= Object.keys(result).length-1; ii++) {
//       supplyChainId[ii] = result[ii].returnValues._supplyChainId;
//       fromEthAddress[ii] = result[ii].returnValues._fromEthAddress;
//       toEthAddress[ii] = result[ii].returnValues._toEthAddress;
//       batchId[ii] = result[ii].returnValues._batchId;
//       productInformation[ii] = result[ii].returnValues._productInformation;
//       getIpfsData(productInformation[ii]);
//     }
//     db.close();
//   });
// });
//
// async function setUpIPFS() {
//   node = await IPFS.create()
// }
//
// async function getIpfsData(productInformation){
//   const stream = node.cat(productInformation)
//   let data = ''
//
//   for await (const chunk of stream) {
//     // chunks of data are returned as a Buffer, convert it back to a string
//     data += chunk.toString()
//   }
//
//   console.log(data)
// }



// THIS CAN BE USED TO DELETE THE DATA COLLECTION

// MongoClient.connect(url, { useUnifiedTopology: true },async function(err, db) {
//   if (err) throw err;
//   db.db("LCI").dropCollection("EnvironmentalData", function(err, delOK) {
//     if (err) throw err;
//     if (delOK) console.log("Collection deleted");
//     db.close();
//   });
// });
