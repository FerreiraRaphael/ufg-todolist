import React from 'react';
import PropTypes from 'prop-types';
import {
  AppPanel,
  RightSideBar,
  LeftSideBar,
  LeftSideBarHeader,
  AppMain
} from '../../components/App';
import InputLists from '../../components/InputLists';
import ListsContainer from '../../containers/ListsContainer';
import { userSchema } from '../../schemas';

const AppScreen = ({ user }) => (
  <AppPanel>
    <LeftSideBar>
      <LeftSideBarHeader username={user.username} />
      <ListsContainer />
      <InputLists />
    </LeftSideBar>
    <AppMain>
      <div />
    </AppMain>
    <RightSideBar>
      <div />
    </RightSideBar>
  </AppPanel>
);

AppScreen.propTypes = {
  user: PropTypes.shape(userSchema).isRequired
};

export default AppScreen;
