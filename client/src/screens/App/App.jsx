import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import {
  AppPanel,
  RightSideBar,
  RightSideBarHeader,
  LeftSideBar,
  LeftSideBarHeader,
  AppMainHeader,
  AppMain
} from '../../components/App';
import DontHaveLists from '../../components/DontHaveLists';
import ListsContainer from '../../containers/ListsContainer';
import ActivitiesContainer from '../../containers/ActivitiesContainer';
import TasksContainer from '../../containers/TasksContainer';
import ListInput from '../../containers/ListInput';
import TaskInput from '../../containers/TaskInput';
import { userSchema, listSchema } from '../../schemas';

const AppScreen = ({
  user,
  selectedList,
  haveLists,
  fetchActivities,
  leftSideBar,
  rightSideBar,
  logout,
  expandLeftSideBar,
  collapseRightSideBar,
  toggleLeftBar,
  toggleRightBar
}) => (
  <AppPanel>
    <LeftSideBar open={leftSideBar}>
      <LeftSideBarHeader username={user.username} onSignOutClick={logout} />
      <ListsContainer />
      <ListInput />
    </LeftSideBar>
    {haveLists ? (
      <AppMain>
        <AppMainHeader
          label={selectedList ? selectedList.title : ''}
          onLeftControlClick={toggleLeftBar}
          onRightControlClick={() => {
            if (!rightSideBar) {
              fetchActivities(selectedList.id);
            }
            toggleRightBar();
          }}
        />
        <Route path="/app/list/:listId" component={TasksContainer} />
        <TaskInput />
      </AppMain>
    ) : (
      <div>
        <AppMainHeader
          label="Crie uma lista"
          onLeftControlClick={toggleLeftBar}
          onRightControlClick={toggleRightBar}
          showInfoControls={false}
        />
        <DontHaveLists onCreateClick={expandLeftSideBar} />
      </div>
    )}
    <RightSideBar open={rightSideBar}>
      <RightSideBarHeader
        label="Atividades"
        onCloseClick={collapseRightSideBar}
        onUpdateClick={() => {
          fetchActivities(selectedList.id);
        }}
      />
      <ActivitiesContainer />
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
  fetchActivities: PropTypes.func.isRequired,
  expandLeftSideBar: PropTypes.func.isRequired,
  collapseRightSideBar: PropTypes.func.isRequired,
  toggleLeftBar: PropTypes.func.isRequired,
  toggleRightBar: PropTypes.func.isRequired,
  rightSideBar: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

export default AppScreen;
