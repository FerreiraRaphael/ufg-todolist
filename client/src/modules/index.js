import { combineReducers } from 'redux';
import auth from './auth';
import list from './list';
import task from './task';
import app from './app';
import activity from './activity';

export default combineReducers({
  auth,
  list,
  task,
  app,
  activity
});
