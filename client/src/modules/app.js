/**
 * Actions
 */
const EXPAND_LEFT_SIDE_BAR = 'app/EXPAND_LEFT_SIDE_BAR';
const COLLAPSE_LEFT_SIDE_BAR = 'app/COLLAPSE_LEFT_SIDE_BAR';
const EXPAND_RIGHT_SIDE_BAR = 'app/EXPAND_RIGHT_SIDE_BAR';
const COLLAPSE_RIGHT_SIDE_BAR = 'app/COLLAPSE_RIGHT_SIDE_BAR';

const initialState = {
  leftSideBar: false,
  rightSideBar: false
};

/**
 * Reducer
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case EXPAND_LEFT_SIDE_BAR:
      return {
        ...state,
        rightSideBar: false,
        leftSideBar: true
      };

    case COLLAPSE_LEFT_SIDE_BAR:
      return {
        ...state,
        leftSideBar: false
      };

    case EXPAND_RIGHT_SIDE_BAR:
      return {
        ...state,
        leftSideBar: false,
        rightSideBar: true
      };

    case COLLAPSE_RIGHT_SIDE_BAR:
      return {
        ...state,
        rightSideBar: false
      };

    default:
      return state;
  }
};

/**
 * Action Creators
 */

export const expandLeftSideBar = () => ({
  type: EXPAND_LEFT_SIDE_BAR
});

export const collapseLeftSideBar = () => ({
  type: COLLAPSE_LEFT_SIDE_BAR
});

export const expandRightSideBar = () => ({
  type: EXPAND_RIGHT_SIDE_BAR
});

export const collapseRightSideBar = () => ({
  type: COLLAPSE_RIGHT_SIDE_BAR
});

export const toggleLeftBar = () => (dispatch, getState) => {
  dispatch(
    getState().app.leftSideBar ? collapseLeftSideBar() : expandLeftSideBar()
  );
};

export const toggleRightBar = () => (dispatch, getState) => {
  dispatch(
    getState().app.rightSideBar ? collapseRightSideBar() : expandRightSideBar()
  );
};
