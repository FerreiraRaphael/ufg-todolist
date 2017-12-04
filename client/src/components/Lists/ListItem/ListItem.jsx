import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { listSchema } from '../../../schemas';
import MoreOptions from '../../MoreOptions';
import './ListItem.css';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.title,
      editing: false
    };
  }
  render() {
    const {
      title,
      id,
      selected,
      onDelete,
      collapseLeftSideBar,
      history,
      editList
    } = this.props;
    const { value, editing } = this.state;
    return (
      <li className={cs('ListItem-container', { selected })}>
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
          <div
            onClick={() => {
              collapseLeftSideBar();
              history.push(`/app/list/${id}`);
            }}
            role="link"
            tabIndex={0}
            onKeyPress={event => {
              if (event.key === 13) {
                collapseLeftSideBar();
                history.push(`/app/list/${id}`);
              }
            }}
            className="ListItem-title ellipsify"
          >
            {title}
          </div>
        )}

        {editing ? (
          <div style={{ width: 100, display: 'flex' }}>
            <div className="MoreOptions-container">
              <div
                role="button"
                onClick={() => {
                  this.setState({ editing: false });
                  editList({ id, title: value });
                }}
                tabIndex={0}
                onKeyPress={event => {
                  if (event.key === 'Enter') {
                    this.setState({ editing: false });
                  }
                }}
                className="rounded-circle MoreOptions-menu"
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
              <div className="rounded-circle MoreOptions-menu">
                <i className="material-icons">close</i>
              </div>
            </div>
          </div>
        ) : (
          <div className="ListItem-controls">
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

ListItem.defaultProps = {
  selected: false
};

ListItem.propTypes = {
  ...listSchema,
  selected: PropTypes.bool,
  editList: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  collapseLeftSideBar: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

export default ListItem;
