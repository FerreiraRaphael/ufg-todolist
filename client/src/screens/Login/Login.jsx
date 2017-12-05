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
      <p>
        Criado por{' '}
        <a href="https://github.com/FerreiraRaphael">Raphael Ferreira</a> e{' '}
        <a href="https://github.com/guicaixeta">Guilherme Caixeta</a> para a
        materia de Construção de Software na{' '}
        <a href="https://www.ufg.br/">UFG</a> 2017/2
      </p>
      <p>
        A documentação pode ser encontrada em <a href="/docs">aqui</a>
      </p>
      <p>
        A documentação da API pode ser encontrada{' '}
        <a href="https://app.swaggerhub.com/apis/FerreiraRaphael/ufg-todolist/1.0.0">
          aqui
        </a>
      </p>
    </div>
  </div>
);

export default LoginScreen;
