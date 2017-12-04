import React from 'react';
import PropTypes from 'prop-types';

import { AppMainHeader } from '../../components/App';

const AppHeader = ({ label, toggleLeftBar, toggleRightBar }) => (
  <AppMainHeader
    label={label}
    onLeftControlClick={toggleLeftBar}
    onRightControlClick={toggleRightBar}
  />
);

AppHeader.propTypes = {
  label: PropTypes.string.isRequired,
  toggleLeftBar: PropTypes.func.isRequired,
  toggleRightBar: PropTypes.func.isRequired
};

export default AppHeader;
