import React, { Component } from 'react'; // React for graphical user interface
import Web3 from 'web3'; // web3 for smart contract interaction
import './App.css';
import LciBlock from '../src/artifacts/LCIBlockchain.json' // smart contract data

// IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values
//const ipfs = ipfsClient('http://localhost:5001')

//var CryptoJS = require("../node_modules/crypto-js") // AES for encryption of sensitive product information

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }


  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = LciBlock.networks[networkId]
    if(networkData) {
      const contract = new web3.eth.Contract(LciBlock.abi, networkData.address)
      this.setState({ contract: contract })
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      ipfsHash: undefined,
      contract: null,
      web3: null,
      buffer: null,
      account: null,
      supplyChainId: undefined,
      toEthAddress: undefined,
      batchId: undefined,
      // cid: undefined,
      // getbackdata: undefined
    }

    //this.handleChange = this.handleChange.bind(this)
  }

  captureFile = (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }

  onSubmit1 = async (event) => {
    event.preventDefault()

    // Encrypt
    //console.log("Encrypting data...")
    //var ciphertext = CryptoJS.AES.encrypt(String(this.state.buffer), 'hund katze maus').toString();
    //console.log('ciphertext:', ciphertext)

    // Decrypt

    //var bytes  = CryptoJS.AES.decrypt(ciphertext, 'hund katze maus');
    //var originalText = bytes.toString(CryptoJS.enc.Utf8);
    //console.log(originalText); // 'my message'
    if (this.state.buffer != null && this.state.buffer.length>0){
      console.log("Submitting file to ipfs...")
      for await (const result of ipfs.add(this.state.buffer)) {
        this.setState({cid: result.cid})
        console.log(this.state.cid)
        this.setState({ipfsHash:result.path})
      }
    }
    else {
      window.alert("Please Upload a JSON file!")
    }


    /*ipfs.add(ciphertext, (error, result) => {
      console.log('Ipfs result', result)
      if(error) {
        console.error(error)
        return
      }
      return this.setState({ipfsHash: result})
    })*/
  }




  handleChange = (event) => {
    //console.log(event.target.name)
    this.setState({ clicked: true })
    //console.log(event.target.value)
  }


  onSubmit2 = (event) => {
    event.preventDefault()
    console.log("Sending transaction...")
    this.state.contract.methods.setNewTransaction(
      String(this.state.supplyChainId)
      ,this.state.toEthAddress
      ,String(this.state.batchId),
      this.state.ipfsHash)
      .send({ from: this.state.account }).then((r) => {
      return
    })
  }


  render() {
    return (
      <html>
      <head>
      <nav>
        <a
          href="https://gitlab.cc-asp.fraunhofer.de/kavi/blockchain-based-lci"
        >
          Blockchain-based LCI
        </a>
      </nav>
      </head>
      <body>
        <div>
          <h2> You are connected with: </h2>
          <h2> {this.state.account} </h2>
          <main>
            <div class="w3-card">
              <p>&nbsp;</p>
              <h2 class ="upload">Upload product information</h2>
              <form onSubmit={this.onSubmit1}>
                <input type='file' accept="application/JSON" onChange={this.captureFile} />
                <p>&nbsp;</p>
                <input type='submit' value="Upload JSON"/>
              </form>
              <p>&nbsp;</p>
              <h2 class ="upload">Fill input boxes and press submit to send Transaction</h2>
              <form onSubmit={this.onSubmit2}>
              <input type="text" name="supplyChainId" placeholder="SupplyChainID" value={this.state.supplyChainId} onChange={this.handleChange}/>
              <p>&nbsp;</p>
              <input type="text" name="toEthAddress" placeholder="To" value={this.state.toEthAddress} onChange={this.handleChange}/>
              <p>&nbsp;</p>
              <input type="text" name="batchId" placeholder="BatchID"value={this.state.batchId} onChange={this.handleChange}/>
              <p>&nbsp;</p>
              <input type="text" name="ipfsHash" placeholder="IPFS Hash" value={this.state.ipfsHash} onChange={this.handleChange}/>
              <p>&nbsp;</p>
              <input type='submit' value="Send Transaction"/>
              </form>

            </div>
          </main>
        </div>
      </body>
      </html>
    );
  }
}

export default App;
