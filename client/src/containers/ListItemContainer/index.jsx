import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import ListItemContainer from './ListItemContainer';
import { collapseLeftSideBar } from '../../modules/app';

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      collapseLeftSideBar
    },
    dispatch
  );

export default withRouter(
  connect(() => ({}), mapDispatchToProps)(ListItemContainer)
);
