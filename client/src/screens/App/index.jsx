import { connect } from 'react-redux';
import App from './App';

const mapStateToProps = ({ auth }) => ({
  user: auth.user
});

export default connect(mapStateToProps)(App);
