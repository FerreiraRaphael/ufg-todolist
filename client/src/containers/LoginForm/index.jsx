import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import LoginForm from './LoginForm';
import { login } from '../../modules/auth';

const mapStateToProps = ({ auth }) => ({
  loginError: auth.loginError,
  logginIn: auth.logginIn
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
