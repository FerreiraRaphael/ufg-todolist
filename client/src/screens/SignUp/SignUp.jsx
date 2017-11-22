import React from 'react';
import { Link } from 'react-router-dom';
import SignUpForm from '../../containers/SignUpForm';
import './SignUp.css';

const SignUpScreen = () => (
  <div className="SignUp-container App-shadow rounded">
    <div className="SignUp-main row">
      <div className="SignUp-welcome col-sm-6 col-12">
        <h1>Todo UFG</h1>
        <h3>Crie sua conta utilizando apenas um nome de usuário e uma senha.</h3>

        <Link to="/login">Já tem uma conta ? Faça o login</Link>
      </div>
      <div className="SignUp-form col-sm-6 col-12">
        <SignUpForm />
      </div>
    </div>
    <div className="SignUp-footer rounded-bottom">
      <h3>Este é o footer</h3>
      <div />
    </div>
  </div>
);

export default SignUpScreen;
