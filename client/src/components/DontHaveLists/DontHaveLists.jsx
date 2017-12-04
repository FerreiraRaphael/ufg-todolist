import React from 'react';
import PropTypes from 'prop-types';
import './DontHaveLists.css';

const DontHaveLists = ({onCreateClick}) => (
  <div className="DontHaveLists-container align-middle">
    <i className="material-icons align-middle">playlist_add</i>
    <p className="align-middle">
      Parece que você ainda não criou nenhuma lista.
    </p>
    <button
      onClick={() => {
        document.querySelector('.AppInput-container > textarea').focus();
        onCreateClick();
      }}
      type="button"
      className="btn btn-outline-primary"
    >
      <i className="material-icons align-middle">playlist_add</i> Crie uma Lista
    </button>
  </div>
);

DontHaveLists.propTypes = {
  onCreateClick: PropTypes.func.isRequired
}

export default DontHaveLists;
