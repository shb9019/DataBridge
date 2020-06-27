import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import { abi } from './abi.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSets: [],
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

  componentDidMount() {
    this.getLoginStatus();
    this.loadDatasets();
  }

  getLoginStatus = () => {
    //Backend Call to get login status
    this.setState({
      loginStatus: true
    });
  };

  loadDatasets = () => {
    // Fetch all datasets, Fetch all upvoted and downvoted sets.
    let dataSets = [
      {
        owner: 'Sai Hemanth B',
        id: 1,
        name: 'First DataSet',
        description: 'This is the first ever ever ever dataset',
        valid: false,
        location: ''
      },
      {
        owner: 'Shivashis Padhi',
        id: 2,
        name: 'Second DataSet',
        description: 'This is the second ever ever ever dataset',
        valid: true,
        location: ''
      }
    ];
    this.setState({
      dataSets: dataSets
    });
  };

  upvoteDataset = (id) => {
    //Backend call to upvote a set
    console.log("Upvoting Dataset " + id);
  };

  downvoteDataset = (id) => {
    //Backend call to downvote a set
    console.log("Downvoting Dataset " + id);
  };

  alreadyVoted = (id) => {
    return !(this.state.upvotedSets.indexOf(id) === -1 && this.state.downvotedSets.indexOf(id) === -1);
  };

  render() {
    let dataSetCards = this.state.dataSets.map((data, index) => {
      if (!data.valid) {
        return (
          <div className="card" key={index} style={{marginTop: '10px'}}>
            <div className="card-block">
              <h4 className="card-title">{data.name}</h4>
              <p className="card-text">{data.description}</p>
            </div>
            <div className="card-footer">
              <small className="text-muted">{data.valid ? 'Approved' : 'Not Approved'}</small>
              {! this.alreadyVoted(data.id)
                ? <div>
                  <button className="badge badge-pill badge-success" onClick={() => this.upvoteDataset(data.id)}>Up Vote</button>
                  <button className="badge badge-pill badge-danger"  onClick={() => this.downvoteDataset(data.id)}>Down Vote</button>
                </div>
                : <div/>
              }
              <small>Owner: {data.owner}</small>
              <button className="btn btn-primary rightFloat">Download</button>
            </div>
          </div>
        );
      }
      else {
        return null;
      }
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
                <a className="nav-link" href="index.html">Verified<span className="sr-only">(current)</span></a>
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
