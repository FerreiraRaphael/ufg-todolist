import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { logout } from '../../modules/auth';
import { expandLeftSideBar, collapseRightSideBar } from '../../modules/app';
import App from './App';

const mapStateToProps = ({
  auth: { user },
  list: { selectedList, lists },
  app
}) => ({
  user,
  selectedList,
  haveLists: !!lists.length,
  leftSideBar: app.leftSideBar,
  rightSideBar: app.rightSideBar
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logout,
      expandLeftSideBar,
      collapseRightSideBar
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
