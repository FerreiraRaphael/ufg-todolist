/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from "react-redux";

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <Link className="navbar-brand" to="/">
      UFG Todo
    </Link>
    <button
      className="navbar-toggler navbar-toggler-right"
      type="button"
      data-toggle="collapse"
      data-target="#navbarsExampleDefault"
      aria-controls="navbarsExampleDefault"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarsExampleDefault">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item active">
          <Link className="nav-link" to="/about">
            Sobre
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/signup">
            Cadastrar
          </Link>
        </li>
      </ul>
    </div>
  </nav>
);

const mapStateToProps = ({ auth }, { location }) => ({
  auth,
  location
});

export default withRouter(connect(mapStateToProps)(Navbar));
