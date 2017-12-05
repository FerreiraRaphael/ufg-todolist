import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import moment from 'moment';
import { taskSchema } from '../../../schemas';
import MoreOptions from '../../MoreOptions';
import ArchiveButton from '../../ArchiveButton';
import DatePicker from '../../DatePicker';
import TaskItemInput from './TaskItemInput';
import './TaskItem.css';

const REFERENCE = moment();
const TODAY = REFERENCE.clone().startOf('day');
const YESTERDAY = REFERENCE.clone()
  .subtract(1, 'days')
  .startOf('day');
const TOMORROW = REFERENCE.clone()
  .add(1, 'days')
  .startOf('day');

function isToday(momentDate) {
  return momentDate.isSame(TODAY, 'd');
}
function isYesterday(momentDate) {
  return momentDate.isSame(YESTERDAY, 'd');
}
function isTomorrow(momentDate) {
  return momentDate.isSame(TOMORROW, 'd');
}

function formatDate(finishDate) {
  const date = moment(finishDate);
  const time = date.format('HH:mm');
  if (isToday(date)) return `Hoje as ${time}`;
  if (isYesterday(date)) return `Ontem as ${time}`;
  if (isTomorrow(date)) return `Amanhã as ${time}`;
  return `${date.format('DD')} de ${date.format('MMMM')} ${date.year() ===
  moment().year()
    ? ''
    : `de ${date.year()}`} as ${time}`;
}

class TaskItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      value: props.title
    };
  }
  render() {
    const {
      id,
      title,
      done,
      onDelete,
      onTaskToggle,
      editTask,
      archived,
      finishDate,
      onArchiveClick,
      onDatePick
    } = this.props;
    const { value, editing } = this.state;
    return (
      <li className={cs('TaskItem-container')}>
        <TaskItemInput
          done={done}
          onChange={checked => {
            onTaskToggle({ id, title, done: checked });
          }}
          disabled={editing}
        />
        {editing ? (
          <input
            value={value}
            onChange={event => {
              this.setState({ value: event.target.value });
            }}
            style={{
              marginLeft: 10,
              flex: 1,
              fontSize: 16,
              outline: '-webkit-focus-ring-color auto 5px'
            }}
          />
        ) : (
          <div className="TaskItem-title ellipsify">
            <span className="ellipsify">{title}</span>
            {finishDate && <div className="ellipsify">{formatDate(finishDate)}</div>}
          </div>
        )}
        {editing ? (
          <div style={{ display: 'flex' }}>
            <div className="MoreOptions-container">
              <div
                role="button"
                onClick={() => {
                  this.setState({ editing: false });
                  editTask({ id, title: value, done });
                }}
                tabIndex={0}
                onKeyPress={event => {
                  if (event.key === 'Enter') {
                    this.setState({ editing: false });
                    editTask({ id, title: value, done });
                  }
                }}
                className="rounded-circle MoreOptions-menu"
                styles={{ margin: 0 }}
              >
                <i className="material-icons">check</i>
              </div>
            </div>
            <div
              role="button"
              onClick={() => {
                this.setState({ editing: false, value: title });
              }}
              tabIndex={0}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.setState({ editing: false, value: title });
                }
              }}
              className="MoreOptions-container"
            >
              <div
                className="rounded-circle MoreOptions-menu"
                styles={{ margin: 0 }}
              >
                <i className="material-icons">close</i>
              </div>
            </div>
          </div>
        ) : (
          <div className="TaskItem-controls">
            <DatePicker
              onChange={date => {
                onDatePick(date);
              }}
              selected={finishDate}
              locale="pt-BR"
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="LLL"
              withPortal
            />
            <ArchiveButton
              onClick={() => {
                onArchiveClick({ id, archived: !archived });
              }}
              archived={archived}
            />
            <MoreOptions icon="keyboard_arrow_down">
              <a
                role="button"
                onClick={() => {
                  this.setState({ editing: true });
                }}
                tabIndex={0}
                onKeyPress={event => {
                  if (event.key === 'Enter') this.setState({ editing: true });
                }}
              >
                Editar
              </a>
              <a
                role="button"
                onClick={() => onDelete(id)}
                tabIndex={0}
                onKeyPress={event => {
                  if (event.key === 'Enter') onDelete(id);
                }}
              >
                Deletar
              </a>
            </MoreOptions>
          </div>
        )}
      </li>
    );
  }
}

TaskItem.defaultProps = {
  selected: false
};

TaskItem.propTypes = {
  ...taskSchema,
  selected: PropTypes.bool,
  editTask: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onDatePick: PropTypes.func.isRequired,
  onArchiveClick: PropTypes.func.isRequired,
  onTaskToggle: PropTypes.func.isRequired
};

export default TaskItem;
