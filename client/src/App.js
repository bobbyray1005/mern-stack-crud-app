import React, { Component } from "react";
import "./App.css";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import history from "./history";
import * as actions from "./actions";

class App extends Component {
  componentDidMount() {
    this.props.preserveToken();
  }

  logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("myUserName");
    history.push("/");
  };

  render() {
    return (
      <div>
        <div className="header">
          <Link to="/" style={{ textDecoration: "none" }}>
            <h1>MERN CRUD REDUX APP</h1>
          </Link>
          <br />
          <br />
          {localStorage.getItem("jwtToken") ? (
            <Button color="primary" onClick={this.logout}>
              Logout
            </Button>
          ) : (
            <div>
              <Link to="/login">
                <Button color="primary">Login</Button>
              </Link>
              <Link to="/register">
                <Button color="primary">Register</Button>
              </Link>
            </div>
          )}
        </div>
        {/* hiển thị data con  */}
        {this.props.children}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    preserveToken: () => {
      dispatch(actions.preserveToken());
    }
  };
};

export default connect(null, mapDispatchToProps)(App);
