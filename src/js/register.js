
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  updateUsername = (username) => {
    this.setState({
      username: username.target.value
    });
  };

  updatePassword = (password) => {
    this.setState({
      password: password.target.value
    });
  };

  registerUser = () => {
    // User Register Backend Integration
    console.log("User Registered");
  };

  render() {
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
          <a className="navbar-brand" href="index.html">DataBridge</a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <button className="btn btn-outline-success my-2 my-sm-0">Login</button>
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Register</button>
            </form>
          </div>
        </nav>
        <br/><br/><br/>
          <div className="container">
            <nav className="navbar navbar-light bg-primary">
              <h2><span className="badge badge-pill bg-primary">Register</span></h2>
            </nav>
            <form>
              <br/><br/>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Username</label>
                  <div className="col-sm-10">
                    <input type="email" className="form-control" id="inputUsername" placeholder="Username" onChange={this.updateUsername}/>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Password</label>
                  <div className="col-sm-10">
                    <input type="password" className="form-control" id="inputPassword" placeholder="Password" onChange={this.updatePassword}/>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="offset-sm-2 col-sm-10">
                    <button type="submit" className="btn btn-primary" onClick={this.registerUser}>Register</button>
                  </div>
                </div>
            </form>
          </div>
      </div>
    )
  }
}
ReactDOM.render(
  <App />,
  document.querySelector('#root')
);
