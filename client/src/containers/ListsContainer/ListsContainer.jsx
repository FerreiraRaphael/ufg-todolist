import React from 'react';
import PropTypes from 'prop-types';
import Lists from '../../components/Lists';
import { listSchema } from '../../schemas';

class ListsContainer extends React.Component {
  async componentDidMount() {
    await this.props.fetchLists();
  }

  componentWillReceiveProps(newProps) {
    const { lists, history } = this.props;
    const newList = newProps.lists;

    if (lists.length === 0 && newList.length !== 0) {
      history.push(`/app/list/${newList[0].id}`);
    } else if (newProps.location.pathname === '/app' && newList.length) {
      history.push(`/app/list/${newList[0].id}`);
    }
  }

  render() {
    const { lists, fetching, selectedList, deleteList } = this.props;
    return (
      <Lists
        lists={lists}
        loading={fetching}
        selectedList={selectedList}
        onDelete={deleteList}
      />
    );
  }
}

ListsContainer.defaultProps = {
  fetching: false,
  selectedList: {
    id: 0,
    title: ''
  }
};

ListsContainer.propTypes = {
  fetching: PropTypes.bool,
  fetchLists: PropTypes.func.isRequired,
  selectedList: PropTypes.shape(listSchema),
  lists: PropTypes.arrayOf(PropTypes.shape(listSchema)).isRequired,
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  location: PropTypes.object.isRequired, // eslint-disable-line
  deleteList: PropTypes.func.isRequired
};

export default ListsContainer;
