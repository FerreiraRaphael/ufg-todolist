import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import SignUpForm from '../../components/Forms/SignUpForm/SignUpForm';

const SignUpFormContainer = ({ signUp, signingUp, history }) => (
  <SignUpForm
    isLoading={signingUp}
    handleSubmit={async ({ username, password }, { setErrors }) => {
      try {
        await signUp({ username, password });
        toast.success('Conta criada com sucesso.');
        history.push('/login');
      } catch (e) {
        setErrors(e);
        toast.error('Não foi possível criar sua conta.');
      }
    }}
  />
);

SignUpFormContainer.propTypes = {
  signUp: PropTypes.func.isRequired,
  signingUp: PropTypes.bool.isRequired,
  /* eslint-disable react/forbid-prop-types */
  history: PropTypes.object.isRequired
  /* eslint-enable react/forbid-prop-types */
};

export default SignUpFormContainer;
