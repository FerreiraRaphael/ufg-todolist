import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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

export default withRouter(connect(mapStateToProps)(App));
