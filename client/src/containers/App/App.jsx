import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import LoginScreen from '../../screens/Login';
import SignUpScreen from '../../screens/SignUp';
import AppScreen from '../../screens/App';
import './App.css';

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

const Loading = () => (
  <div className="App-wrapper">
    <h1>TODO UFG</h1>
    <h3>LOADING...</h3>
  </div>
);

class App extends React.Component {
  async componentWillMount() {
    if (localStorage.userid && localStorage.token) {
      await this.props.loadUser();
    }
  }
  render() {
    return this.props.loading ? (
      <Loading />
    ) : (
      <div className="App-wrapper">
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
        />
        <Route
          exact
          path="/"
          render={() =>
            this.props.authenticated ? (
              <Redirect to="/app" />
            ) : (
              <Redirect to="/signup" />
            )}
        />
        <Route
          path="/app"
          render={() =>
            this.props.authenticated ? <AppScreen /> : <Redirect to="/login" />}
        />
        <Route exact path="/about" component={About} />
        <Route
          exact
          path="/login"
          render={() =>
            this.props.authenticated ? <Redirect to="/app" /> : <LoginScreen />}
        />
        <Route
          exact
          path="/signup"
          render={() =>
            this.props.authenticated ? (
              <Redirect to="/app" />
            ) : (
              <SignUpScreen />
            )}
        />
      </div>
    );
  }
}

App.defaultProps = {
  loading: false,
  loadingError: {}
};

App.propTypes = {
  loading: PropTypes.bool,
  loadUser: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired
};

export default App;
