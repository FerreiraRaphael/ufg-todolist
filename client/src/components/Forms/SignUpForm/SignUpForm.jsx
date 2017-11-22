import React from 'react';
import { Formik, Field, Form } from 'formik';
import PropTypes from 'prop-types';
import { FormGroup } from '../index';

const SignUpForm = ({ handleSubmit, isLoading }) => (
  <Formik
    validate={values => {
      const errors = Object.keys(values).reduce((result, key) => ({
        ...result,
        ...(!values[key] ? { [key]: 'Campo é obrigatório.' } : {})
      }), {});

      if (!(values.password === values.passwordConfirm)) {
        errors.passwordConfirm = 'Senha e Confirmação de Senha devem ser a mesma.';
      }
      return errors;
    }}
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
        <FormGroup
          error={errors.passwordConfirm}
          touched={touched.passwordConfirm}
        >
          <label htmlFor="passwordConfirm">Confirmação de Senha</label>
          <Field
            className="form-control"
            type="password"
            name="passwordConfirm"
          />
        </FormGroup>
        <button
          className="btn btn-outline-primary btn-block"
          type="submit"
          disabled={isLoading}
        >
          Entrar
        </button>
      </Form>
    )}
  />
);

SignUpForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default SignUpForm;
