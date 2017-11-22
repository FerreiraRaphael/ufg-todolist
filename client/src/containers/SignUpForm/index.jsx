import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import SignUpForm from './SignUpForm';
import { signUp } from '../../modules/auth';

const mapStateToProps = ({ auth }) => ({
  signUpError: auth.signUpError,
  signingUp: auth.signingUp
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      signUp
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUpForm));
