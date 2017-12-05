import React from 'react';
import PropTypes from 'prop-types';
import ReactDatePicker from 'react-datepicker';
import moment from 'moment';
import 'moment/locale/pt-br';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css';

moment.locale('pt-BR');

const DatePickerElement = ({ onClick }) => (
  <div
    onClick={onClick}
    onKeyPress={event => {
      if (event.key === 13) onClick(event);
    }}
    role="button"
    tabIndex={-1}
    className="DatePicker-container"
    style={{margin: '0 8px'}}
  >
    <i className="material-icons">date_range</i>
  </div>
);

DatePickerElement.defaultProps = {
  onClick: () => {}
};

DatePickerElement.propTypes = {
  onClick: PropTypes.func
};

class DatePicker extends React.Component {
  constructor() {
    super();
    this.state = {
      value: moment()
    };
  }
  render() {
    const { selected, onChange, ...props } = this.props;
    return (
      <ReactDatePicker
        customInput={<DatePickerElement />}
        selected={moment(this.state.value)}
        onChange={value => {
          this.setState({ value });
          onChange(value);
        }}
        {...props}
      />
    );
  }
}

DatePicker.propTypes = {
  selected: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  onChange: PropTypes.func.isRequired
};

export default DatePicker;
