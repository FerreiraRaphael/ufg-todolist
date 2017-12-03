import React from 'react';
import PropTypes from 'prop-types';

class TaskItemInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      done: this.props.done
    };
  }

  render() {
    const { done } = this.state;
    return (
      <div className="TaskItem-input">
        <div className="form-check">
          <div className="form-check-label">
            <input
              type="checkbox"
              className="form-check-input"
              value={done}
              checked={done}
              onChange={event => {
                this.setState({ done: event.target.checked });
                this.props.onChange(event.target.checked);
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

TaskItemInput.defaultProps = {
  done: false
};

TaskItemInput.propTypes = {
  done: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

export default TaskItemInput;
