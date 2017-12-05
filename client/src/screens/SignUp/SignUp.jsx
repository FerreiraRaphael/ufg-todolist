import React from 'react';
import { Link } from 'react-router-dom';
import SignUpForm from '../../containers/SignUpForm';
import './SignUp.css';

const SignUpScreen = () => (
  <div className="SignUp-container App-shadow rounded">
    <div className="SignUp-main row">
      <div className="SignUp-welcome col-sm-6 col-12">
        <h1>Todo UFG</h1>
        <h3>
          Crie sua conta utilizando apenas um nome de usuário e uma senha.
        </h3>

        <Link to="/login">Já tem uma conta ? Faça o login</Link>
      </div>
      <div className="SignUp-form col-sm-6 col-12">
        <SignUpForm />
      </div>
    </div>
    <div className="SignUp-footer rounded-bottom">
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

export default SignUpScreen;
