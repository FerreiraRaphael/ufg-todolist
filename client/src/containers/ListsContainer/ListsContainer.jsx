import React from 'react';
import PropTypes from 'prop-types';
import Lists from '../../components/Lists';
import { listSchema } from '../../schemas';

class ListsContainer extends React.Component {
  async componentDidMount() {
    await this.props.fetchLists();
  }
  render() {
    const {lists, fetching} = this.props;
    return (
      <Lists lists={lists} loading={fetching} />
    );
  }
}

ListsContainer.defaultProps = {
  fetching: false
}

ListsContainer.propTypes = {
  fetching: PropTypes.bool,
  fetchLists: PropTypes.func.isRequired,
  lists: PropTypes.arrayOf(PropTypes.shape(listSchema)).isRequired
};

export default ListsContainer;
