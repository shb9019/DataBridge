import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import IpfsApi from 'ipfs-api';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSets: []
    };

    this.ipfsApi = IpfsApi({});
    if(typeof web3 !== 'undefined') {
      console.log("Using web3 detected from external source like Metamask");
      this.web3 = new Web3(web3.currentProvider);
    }
    else{
      console.log("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
      this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
    const MyContract = this.web3.eth.contract([
      {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "currentBalance",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "datasets",
        "outputs": [
          {
            "name": "owner",
            "type": "address"
          },
          {
            "name": "id",
            "type": "uint256"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "valid",
            "type": "bool"
          },
          {
            "name": "location",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_name",
            "type": "string"
          }
        ],
        "name": "uniqueName",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_id",
            "type": "uint256"
          }
        ],
        "name": "uniqueId",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "getAllDatasets",
        "outputs": [
          {
            "components": [
              {
                "name": "owner",
                "type": "address"
              },
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "name",
                "type": "string"
              },
              {
                "name": "description",
                "type": "string"
              },
              {
                "name": "valid",
                "type": "bool"
              },
              {
                "name": "location",
                "type": "string"
              }
            ],
            "name": "",
            "type": "tuple[]"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_id",
            "type": "uint256"
          },
          {
            "name": "_name",
            "type": "string"
          }
        ],
        "name": "getDatasetOwner",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_id",
            "type": "uint256"
          },
          {
            "name": "_name",
            "type": "string"
          }
        ],
        "name": "checkDatasetExists",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "numberValidDatasets",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_id",
            "type": "uint256"
          },
          {
            "name": "_name",
            "type": "string"
          }
        ],
        "name": "validateDataset",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_id",
            "type": "uint256"
          },
          {
            "name": "_name",
            "type": "string"
          },
          {
            "name": "_description",
            "type": "string"
          }
        ],
        "name": "uploadDataset",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "donate",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "constructor"
      },
      {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "kill",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]);
    this.state.ContractInstance = MyContract.at("0x7f583747f78387f11616f354fbc7e52b55293898");
  }

  componentDidMount() {
    // this.fetchAllDatasetsBackend();
  }

  uploadToIpfs = (file) => {
    this.ipfsApi.add(file)
      .then((response) => {
        let ipfsId = response[0].Hash;
        console.log(ipfsId)
      });
  };

  render() {
    return null;
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
);
