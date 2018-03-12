import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import IpfsApi from 'ipfs-api';
const Buffer = require('buffer/').Buffer;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      dataset: null,
      actualFile: null,
      loginStatus: true
    };

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
    this.state.ContractInstance = MyContract.at("0x55dd6f8ee6ffa06b29f9999dcda7fb038f71431e");
  }

  componentWillMount() {
    this.getLoginStatus();
  }

  getLoginStatus = () => {
    fetch('http://localhost:3000/users/login', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Something went wrong on api server!');
        }
      })
      .then(response => {
        console.log(response);
        if (!response.success) {
          window.location.pathname = 'login.html';
        }
      }).catch(error => {
      console.error(error);
    });
  };

  uploadTransactionToBlockchain = (id, name, description, file) => {
    this.state.ContractInstance.uploadDataset(id, name, description, {
      from: web3.eth.accounts[0],
      gas: 3000000,
    }, function(error, result) {
      if (!error) {
        console.log(result);
        window.location.pathname = "index.html";
      }
      else {
        console.log(error);
      }
    });
  };

  updateName = (name) => {
    this.setState({
      name: name.target.value
    });
    console.log(this.state.name);
  };

  updateDescription = (description) => {
    this.setState({
      description: description.target.value
    });
  };

  updateDataset = (dataset) => {
    dataset.stopPropagation();
    dataset.preventDefault();
    this.setState({
      actualFile: dataset.target.files[0]
    });
    const file = dataset.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => this.addFileToState(reader);
    reader.readAsArrayBuffer(file);
  };

  addFileToState = (reader) => {
    const buffer = Buffer.from(reader.result);
    this.setState({
      dataset: buffer
    });
  };

  uploadFileToDb = (url) => {
    fetch('http://localhost:3000/create', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'url' : url,
        'file' : null,
        'title' : this.state.name,
        'description' : this.state.description,
      })
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Something went wrong on api server!');
        }
      })
      .then(response => {
        console.log(response);
        if (!response.success) {
          window.location.pathname = 'login.html';
        }
        else {
          console.log(response);
          this.uploadTransactionToBlockchain(response.id, this.state.name, this.state.description, this.state.dataset);
          // window.location.pathname = 'index.html';
        }
      }).catch(error => {
      console.error(error);
    });
  };

  uploadDataset = (e) => {
    console.log("Uploading Set");
    e.preventDefault();
    this.ipfsApi = IpfsApi({});
    this.ipfsApi.add(this.state.dataset)
      .then((response) => {
        console.log(response, "IPFS Response Here");
        let ipfsId = response[0].path;
        console.log(ipfsId);
        this.uploadFileToDb('https://gateway.ipfs.io/ipfs/' + ipfsId);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse navbar-toggleable-md bg-primary">
          <button className="navbar-toggler navbar-toggler-right" type="button"
                  data-toggle="collapse" data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent" aria-expanded="false"
                  aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"/>
          </button>
          <a className="navbar-brand" href="index.html">DataBridge</a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="unverified.html">UnVerified</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="upload.html">Upload<span className="sr-only">(current)</span></a>
              </li>
              <li>
                <a className="nav-link" href="about.html">About</a>
              </li>
            </ul>
          </div>
        </nav>
        <br/>
        <div className='container'>
          <nav className="navbar navbar-light bg-primary">
            <h2><span className="badge badge-pill bg-primary">Enter your survey into the chain</span></h2>
          </nav>
          <br/>
          <div className="form">
            <div className="form-group">
              <label>Survey Name</label>
              <textarea className="form-control" id="exampleTextarea" rows="1" onChange={this.updateName}/>
            </div>
            <div className="form-group">
              <label>Brief Description</label>
              <textarea className="form-control" id="exampleTextarea" rows="3" onChange={this.updateDescription}/>
            </div>
            <div className="form-group">
              <label>Upload file containing survey data</label>
              <input type="file" className="form-control-file" id="exampleInputFile" aria-describedby="fileHelp" onChange={this.updateDataset}/>
              <small id="fileHelp" className="form-text text-muted">File containing all the data of your survey. Compressed files are encouraged.</small>
            </div>
            <button onClick={this.uploadDataset} className="btn btn-primary">Submit</button>
          </div>
        </div>
        <br/><br/>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
);
