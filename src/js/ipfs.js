import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import IpfsApi from 'ipfs-api';
import { abi } from './abi.js';

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
    const MyContract = this.web3.eth.contract(abi);
    this.state.ContractInstance = MyContract.at("0xF12b5dd4EAD5F743C6BaA640B0216200e89B60Da");
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
