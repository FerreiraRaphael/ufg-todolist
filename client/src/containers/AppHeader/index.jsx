import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AppHeader from './AppHeader';
import { toggleRightBar, toggleLeftBar } from '../../modules/app';

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleLeftBar,
      toggleRightBar
    },
    dispatch
  );

export default connect(() => ({}), mapDispatchToProps)(AppHeader);
