import React from 'react';
import {
  AppPanel,
  RightSideBar,
  LeftSideBar,
  AppMain
} from '../../components/App';

const AppScreen = () => (
  <AppPanel>
    <LeftSideBar />
    <AppMain />
    <RightSideBar />
  </AppPanel>
);

export default AppScreen;
