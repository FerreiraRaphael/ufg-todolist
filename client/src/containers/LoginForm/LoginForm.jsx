import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import LoginForm from '../../components/Forms/LoginForm/LoginForm';

const LoginFormContainer = ({ login, logginIn, history }) => (
  <LoginForm
    isLoading={logginIn}
    handleSubmit={async (values, { setErrors }) => {
      try {
        await login(values);
        toast.success('Bem vindo de volta.');
        history.push('/');
      } catch(e) {
        setErrors(e);
        toast.error('Não foi entrar na conta desejada.');
      }
    }}
  />
);

LoginFormContainer.propTypes = {
  login: PropTypes.func.isRequired,
  logginIn: PropTypes.bool.isRequired,
  /* eslint-disable react/forbid-prop-types */
  history: PropTypes.object.isRequired
  /* eslint-enable react/forbid-prop-types */
};

export default LoginFormContainer;
