import React from 'react';
import './DontHaveLists.css';
import AppHeader from '../../containers/AppHeader';

const DontHaveLists = () => (
  <div className="DontHaveLists-container align-middle">
    <AppHeader label="Crie uma lista" />
    <i className="material-icons align-middle">playlist_add</i>
    <p className="align-middle">
      Parece que você ainda não criou nenhuma lista.
    </p>
    <button
      onClick={() => {
        document.querySelector('.AppInput-container > textarea').focus();
      }}
      type="button"
      className="btn btn-outline-primary"
    >
      <i className="material-icons align-middle">playlist_add</i> Crie uma Lista
    </button>
  </div>
);

export default DontHaveLists;
