const axios = require('axios');

// const main = async () => {
//   try {
//     const result = await axios.post(
//       'https://api.thegraph.com/subgraphs/name/giraeffleaeffle/blockchainbasedlci',
//       {
//         query: `
//         {
//           exampleEntities(where: {supplyChainId: "TX1", batchId: "BID1"}) {
//             supplyChainId
//             fromEthAddress
//             toEthAddress
//             batchId
//             productInformation
//           }
//         }
//         `
//       }
//
//     );
//     console.log(result.data.data.exampleEntities);
//     console.log('HI');
//   } catch(error) {
//     console.error(error)
//     console.log('Error')
//     }
//   }


  const main = async () => {
    try {
      const result = await axios.post(
        'https://api.thegraph.com/subgraphs/name/aave/protocol',
        {
          query: `
          {
            flashLoans(first: 10, orderBy: timestamp, orderDirection: desc) {
              id
              reserve {
                name
                symbol
              }
              amount
              target
              timestamp
              }
            }
          }
          `
        }

      );
      console.log(result.data.data.flashLoans);
      console.log('HI');
    } catch(error) {
      console.error(error)
      console.log('Error')
      }
    }
