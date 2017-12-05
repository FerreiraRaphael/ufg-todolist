import React from 'react';
import PropTypes from 'prop-types';
import './DatePicker.css';

const DatePicker = ({ archived, onClick }) => (
  <div
    onClick={() => {
      onClick();
    }}
    onKeyPress={event => {
      if (event.key === 13) onClick();
    }}
    role="button"
    tabIndex={-1}
    className="DatePicker-container"
  >
    <i className="material-icons">{archived ? 'unarchive' : 'archive'}</i>
  </div>
);

DatePicker.propTypes = {
  archived: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default DatePicker;
