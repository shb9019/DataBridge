import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSets: [],
      pubKey: "",
      loginStatus: true,
      upvotedSets: [],
      downvotedSets: []
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
    this.state.ContractInstance = MyContract.at("0x7f583747f78387f11616f354fbc7e52b55293898");
  }

  componentWillMount() {
    this.getLoginStatus();
  }

  componentDidMount() {
    this.loadDatasets();
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
        else {
          this.setState({
            pubKey : response.pub_key
          });
        }
      }).catch(error => {
      console.error(error);
    });
  };

  logout = () => {

  };

  loadDatasets = () => {
    fetch('http://localhost:3000/users/getDatasets', {
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
        this.setState({
          dataSets: response.dataset1
        });
      }).catch(error => {
      console.error(error);
    });
  };

  upvoteDataset = (id) => {
    fetch('http://localhost:3000/downvote/' + id, {
      method: 'POST',
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
        this.loadDatasets();
      }).catch(error => {
      console.error(error);
    });
    console.log("Upvoting Dataset " + id);
  };

  downvoteDataset = (id) => {
    fetch('http://localhost:3000/upvote/' + id, {
      method: 'POST',
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
        this.loadDatasets();
      }).catch(error => {
      console.error(error);
    });
    console.log("Downvoting Dataset " + id);
  };

  downloadFile = (file, url) => {
    if (url === "") {

    }
  };

  alreadyVoted = (data) => {
    return !(data.upvoters.indexOf(this.state.pubKey) === -1 && data.downvoters.indexOf(this.state.pubKey) === -1);
  };

  render() {
    let dataSetCards = this.state.dataSets.map((data, index) => {
      return (
        <div className="card" key={index} style={{marginTop: '10px'}}>
          <div className="card-block">
            <h4 className="card-title">{data.title}</h4>
            <p className="card-text">{data.description}</p>
          </div>
          <div className="card-footer">
            <small className="text-muted">{data.valid ? 'Approved' : 'Not Approved'}</small>
            {!data.valid && ! this.alreadyVoted(data)
              ? <div>
                  <button className="badge badge-pill badge-success" onClick={() => this.upvoteDataset(data.hash_id)}>Up Vote</button>
                  <button className="badge badge-pill badge-danger"  onClick={() => this.downvoteDataset(data.hash_id)}>Down Vote</button>
                </div>
              : <div/>
            }
            <small>Owner: {data.author}</small>
            <a href={data.url} target="_blank" className="btn btn-primary rightFloat" onClick={this.downloadFile(data.file, data.url)}>Download</a>
          </div>
        </div>
      );
    });

    return (
      <div>
        <nav className="navbar navbar-inverse navbar-toggleable-md bg-primary">
          <button className="navbar-toggler navbar-toggler-right"
                 type="button" data-toggle="collapse"
                 data-target="#navbarSupportedContent"
                 aria-controls="navbarSupportedContent"
                 aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"/>
          </button>
          <a className="navbar-brand" href="#">DataBridge</a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="verified.html">Verified<span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="unverified.html">UnVerified</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="upload.html">Upload</a>
              </li>
              <li>
                <a className="nav-link" href="about.html">About</a>
              </li>
              <li>
                <a className="nav-link" onClick={this.logout}>Logout</a>
              </li>
            </ul>
          </div>
        </nav>
        <br/>
        <div className="container">
          <nav className="navbar navbar-light bg-primary">
            <h2><span className="badge badge-pill bg-primary" >Explore Survey Data</span></h2>
          </nav>
        <div>
          {dataSetCards}
        </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
);
