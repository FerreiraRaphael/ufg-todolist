import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import LoginScreen from '../../screens/Login';
import SignUpScreen from '../../screens/SignUp';
import './App.css';

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

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
            this.props.authenticated ? <Home /> : <Redirect to="/signup" />}
        />
        <Route path="/about" component={About} />
        <Route
          path="/login"
          render={() =>
            this.props.authenticated ? <Redirect to="/" /> : <LoginScreen />}
        />
        <Route
          path="/signup"
          render={() =>
            this.props.authenticated ? <Redirect to="/" /> : <SignUpScreen />}
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
