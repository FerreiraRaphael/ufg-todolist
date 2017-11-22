import React from 'react';
import { Formik, Field, Form } from 'formik';
import Yup from 'yup';
import PropTypes from 'prop-types';
import { FormGroup } from '../index';

const LoginForm = ({ handleSubmit, isLoading }) => (
  <Formik
    validationSchema={Yup.object().shape({
      username: Yup.string().required('Campo é obrigatório.'),
      password: Yup.string().required('Campo é obrigatório.')
    })}
    onSubmit={handleSubmit}
    render={({ errors, touched }) => (
      <Form>
        <FormGroup error={errors.username} touched={touched.username}>
          <label htmlFor="username">Nome de Usuário</label>
          <Field className="form-control" name="username" type="text" />
        </FormGroup>
        <FormGroup error={errors.password} touched={touched.password}>
          <label htmlFor="password">Senha</label>
          <Field className="form-control" type="password" name="password" />
        </FormGroup>
        <button className="btn btn-outline-primary btn-block" type="submit" disabled={isLoading}>
          Entrar
        </button>
      </Form>
    )}
  />
);

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default LoginForm;
