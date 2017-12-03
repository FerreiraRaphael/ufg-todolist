import React from 'react';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';
import Textarea from 'react-textarea-autosize';
import './AppInput.css';

class AppInput extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      canSend: false
    };
  }

  onInputChange(event) {
    const { value } = event.target;
    this.setState({ canSend: !!value, value });
  }

  onInputKeyDown(event) {
    const { loading } = this.props;
    const { canSend, value } = this.state;
    if (event.keyCode === 13 && event.ctrlKey && canSend && !loading) {
      this.handleSubmit(value);
    }
  }

  handleSubmit(value) {
    this.props.onSubmit(value);
    this.setState({ canSend: false, value: '' });
  }

  render() {
    const { loading, onSubmit, ...props } = this.props;
    const { value, canSend } = this.state;
    return (
      <div className="AppInput-container">
        <Textarea
          onChange={event => {
            this.onInputChange(event);
          }}
          onKeyDown={event => {
            this.onInputKeyDown(event);
          }}
          style={{ minHeight: 40 }}
          maxRows={6}
          {...props}
          value={value}
        />
        {loading && (
          <ReactLoading
            style={{
              position: 'absolute',
              width: 24,
              top: 23,
              right: 15,
              fill: '#2196F3'
            }}
            type="spin"
            delay={1}
          />
        )}

        <i
          onClick={() => {
            if (canSend && !loading) this.handleSubmit(value);
          }}
          onKeyPress={e => {
            if (e.nativeEvent.key === 'Enter' && canSend && !loading)
              this.handleSubmit(value);
          }}
          style={{
            cursor: 'pointer',
            color: canSend ? '#2196F3' : '',
            marginRight: loading ? -40 : 0,
            zIndex: loading ? -1 : 0,
            transition: 'all .24s ease'
          }}
          className="material-icons"
          role="button"
          tabIndex={0}
        >
          add_circle_outline
        </i>
      </div>
    );
  }
}

AppInput.defaultProps = {
  loading: false
};

AppInput.propTypes = {
  loading: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired
};

export default AppInput;
