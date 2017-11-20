import React from 'react';
import Yup from 'yup';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withFormik } from 'formik';
import { login } from '../../modules/auth';

const LoginScreen = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting
}) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label htmlFor="formGroupExampleInput">Username</label>
      <input
        type="text"
        className="form-control"
        name="username"
        placeholder="Username"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.username}
      />
    </div>
    <div className="form-group">
      <label htmlFor="htmlformGroupExampleInput2">Senha</label>
      <input
        type="password"
        className="form-control"
        name="password"
        placeholder="Senha"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.password}
      />
    </div>
    <div className="form-group">
      <label htmlFor="htmlformGroupExampleInput2">Confirmação de Senha</label>
      <input
        type="password"
        className="form-control"
        name="passwordConfirm"
        placeholder="Confirmação de Senha"
      />
    </div>
    <button type="submit" className="btn btn-primary btn-lg btn-block">
      Cadastrar
    </button>
  </form>
);

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

export default connect(mapStateToProps, mapDispatchToProps)(withFormik({
  validationSchema: Yup.object().shape({
    username: Yup.string().required('is required.'),
    password: Yup.string().required('is required.')
  }),
  // Submission handler
  handleSubmit: async (values, { props, setSubmitting }) => {
    console.log('oi', props);
    setSubmitting(true);
    await login({ username: values.username, password: values.password });
  }
})(LoginScreen));
