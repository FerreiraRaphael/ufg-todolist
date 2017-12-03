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
  rightSideBar
}) => (
  <AppPanel>
    <LeftSideBar open={leftSideBar}>
      <LeftSideBarHeader username={user.username} />
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
      <DontHaveLists />
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
  rightSideBar: PropTypes.bool.isRequired
};

export default AppScreen;
