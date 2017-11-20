import React from 'react';

const LoginScreen = () => (
  <div>
    <form>
      <div className="form-group">
        <label htmlFor="formGroupExampleInput">Username</label>
        <input
          type="text"
          className="form-control"
          name="username"
          placeholder="Username"
        />
      </div>
      <div className="form-group">
        <label htmlFor="htmlformGroupExampleInput2">Senha</label>
        <input
          type="password"
          className="form-control"
          name="password"
          placeholder="Senha"
        />
      </div>
      <button type="button" className="btn btn-primary btn-lg btn-block">
        Entrar
      </button>
    </form>
  </div>
);

export default LoginScreen;
