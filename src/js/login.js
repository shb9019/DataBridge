
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

  authenticateUser = (e) => {
    e.preventDefault();
    // Backend call to authenticate user
    console.log("Inside this");
    if (this.state.username === "root" && this.state.password === "root") {
      window.location.href = "index.html";
    }
  };

  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse navbar-toggleable-md bg-primary">
          <button className="navbar-toggler navbar-toggler-right"
                  type="button" data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"/>
          </button>
          <a className="navbar-brand" href="#">DataBridge</a>
          <div className="collapse navbar-collapse"
               id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto"/>
            <form className="form-inline my-2 my-lg-0">
              <a className="btn btn-outline-success my-2 my-sm-0"
                 href="login.html">Login</a>
              <a className="btn btn-outline-success my-2 my-sm-0"
                 href="register.html">Register</a>
            </form>
          </div>
        </nav>
        <br />
        <br />
        <br />
        <div className="container">
          <nav className="navbar navbar-light bg-primary">
            <h2>
              <span className="badge badge-pill bg-primary">Login</span>
            </h2>
          </nav>
          <form>
            <br/><br/>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Username</label>
              <div className="col-sm-10">
                <input type="email" className="form-control"
                       id="inputUsername" placeholder="Username"
                       onChange={this.updateUsername}/>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Password</label>
              <div className="col-sm-10">
                <input type="password" className="form-control"
                       id="inputPassword" placeholder="Password"
                       onChange={this.updatePassword}/>
              </div>
            </div>
            <div className="form-group row">
              <div className="offset-sm-2 col-sm-10">
                <button onClick={this.authenticateUser} className="btn btn-primary">Sign in</button>
                <button type="submit" className="btn btn-primary" style={{ float: "right"}}>Register</button>
                <p style={{float : "right", paddingRight: "20px"}}>Is this your first time? Register Now.
                </p>
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
