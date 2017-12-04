import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import {
  AppPanel,
  RightSideBar,
  LeftSideBar,
  LeftSideBarHeader,
  AppMain
} from '../../components/App';
import DontHaveLists from '../../components/DontHaveLists';
import AppHeader from '../../containers/AppHeader';
import ListsContainer from '../../containers/ListsContainer';
import TasksContainer from '../../containers/TasksContainer';
import ListInput from '../../containers/ListInput';
import TaskInput from '../../containers/TaskInput';
import { userSchema, listSchema } from '../../schemas';

const AppScreen = ({
  user,
  selectedList,
  haveLists,
  leftSideBar,
  rightSideBar,
  logout,
  expandLeftSideBar
}) => (
  <AppPanel>
    <LeftSideBar open={leftSideBar}>
      <LeftSideBarHeader username={user.username} onSignOutClick={logout} />
      <ListsContainer />
      <ListInput />
    </LeftSideBar>
    {haveLists ? (
      <AppMain>
        <AppHeader label={selectedList ? selectedList.title : ''} />
        <Route path="/app/list/:listId" component={TasksContainer} />
        <TaskInput />
      </AppMain>
    ) : (
      <DontHaveLists onCreateClick={expandLeftSideBar} />
    )}
    <RightSideBar open={rightSideBar}>
      <div />
    </RightSideBar>
  </AppPanel>
);

AppScreen.defaultProps = {
  selectedList: {
    id: 0,
    title: ''
  }
};

AppScreen.propTypes = {
  user: PropTypes.shape(userSchema).isRequired,
  selectedList: PropTypes.shape(listSchema),
  haveLists: PropTypes.bool.isRequired,
  leftSideBar: PropTypes.bool.isRequired,
  expandLeftSideBar: PropTypes.func.isRequired,
  rightSideBar: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

export default AppScreen;
