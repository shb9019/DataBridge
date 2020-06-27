import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import { abi } from './abi';

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
    const MyContract = this.web3.eth.contract(abi);
    this.state.ContractInstance = MyContract.at("0xF12b5dd4EAD5F743C6BaA640B0216200e89B60Da");
  }

  componentWillMount() {}

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
    fetch('http://localhost:3000/users/logout', {
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
      window.location.href = "http://localhost:8081";
      console.log(response);
    }).catch(error => {
        console.error(error);
    });
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

    console.log(this.state.ContractInstance);
    this.state.ContractInstance.getAllDatasets({
      from: web3.eth.accounts[0]
    }, function(result) {
      console.log(result);
    });
    // console.log(this.state.ContractInstance.getAllDatasets.call());
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
    (async () => {
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);

      // const balance = await web3.eth.getBalance(accounts[0]);
      // console.log("balance", web3.utils.fromWei(balance, "ether"));
    })();

    let dataSetCards = [];
    
    if (this.state.dataSets) {
      dataSetCards = this.state.dataSets.map((data, index) => {
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
    }

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
