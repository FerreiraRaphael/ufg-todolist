import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import ListItem from './ListItem';
import { editList } from '../../../modules/list';
import { collapseLeftSideBar } from '../../../modules/app';

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      collapseLeftSideBar,
      editList
    },
    dispatch
  );

export default withRouter(
  connect(() => ({}), mapDispatchToProps)(ListItem)
);
