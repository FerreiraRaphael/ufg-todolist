import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Navbar from './components/Navbar';
import LoginScreen from './screens/Login';
import SignUpScreen from './screens/SignUp';
import store from './store';

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

const Lists = () => (
  <div>
    <h2>Lists</h2>
  </div>
);

const BasicExample = () => (
  <Provider store={store}>
    <Router>
      <div className="app-wrapper">
        <div className="app-container">
          <Navbar />
          <hr />
          <div className="container">
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/lists" component={Lists} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/signup" component={SignUpScreen} />
          </div>
        </div>
      </div>
    </Router>
  </Provider>
);
export default BasicExample;
