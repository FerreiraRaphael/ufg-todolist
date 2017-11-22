import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import App from './App';
import { loadUser } from '../../modules/auth';

const mapStateToProps = ({ auth }) => ({
  loading: auth.loading,
  authenticated: auth.authenticated
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadUser
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
