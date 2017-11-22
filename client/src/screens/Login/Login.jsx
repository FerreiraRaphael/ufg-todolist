import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../containers/LoginForm';
import './Login.css';

const LoginScreen = () => (
  <div className="Login-container App-shadow rounded">
    <div className="Login-main row">
      <div className="Login-welcome col-sm-6 col-12">
        <h1>Todo UFG</h1>
        <h3>Bem vindo, utilize seu nome de usuário e senha para entrar.</h3>

        <Link to="/signup">Não tem uma conta ainda ? Cadastre-se</Link>
      </div>
      <div className="Login-form col-sm-6 col-12">
        <LoginForm />
      </div>
    </div>
    <div className="Login-footer rounded-bottom">
      <h3>Este é o footer</h3>
      <div />
    </div>
  </div>
);

export default LoginScreen;
