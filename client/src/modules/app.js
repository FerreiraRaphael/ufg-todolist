/** @module client/modules/app */
/**
 * Actions
 */

const EXPAND_LEFT_SIDE_BAR = 'app/EXPAND_LEFT_SIDE_BAR';
const COLLAPSE_LEFT_SIDE_BAR = 'app/COLLAPSE_LEFT_SIDE_BAR';
const EXPAND_RIGHT_SIDE_BAR = 'app/EXPAND_RIGHT_SIDE_BAR';
const COLLAPSE_RIGHT_SIDE_BAR = 'app/COLLAPSE_RIGHT_SIDE_BAR';

/**
 * @namespace App Estado da aplicação que envolve o App
 * @property {boolean} leftSideBar Indicador de que sideBar esquerda está aberta
 * @property {boolean} rightSideBar Indicador de que sideBar direita está aberta
 */
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

/**
 * Ação abre side bar esquerda
 * @function expandLeftSideBar
 * @return {Object} Objeto Ação do tipo EXPAND_LEFT_SIDE_BAR
 */
export const expandLeftSideBar = () => ({
  type: EXPAND_LEFT_SIDE_BAR
});

/**
 * Ação fecha side bar esquerda
 * @function collapseLeftSideBar
 * @return {Object} Objeto Ação do tipo COLLAPSE_LEFT_SIDE_BAR
 */
export const collapseLeftSideBar = () => ({
  type: COLLAPSE_LEFT_SIDE_BAR
});

/**
 * Ação abre side bar direita
 * @function expandRightSideBar
 * @return {Object} Objeto Ação do tipo EXPAND_RIGHT_SIDE_BAR
 */
export const expandRightSideBar = () => ({
  type: EXPAND_RIGHT_SIDE_BAR
});

/**
 * Ação fecha side bar direita
 * @function collapseRightSideBar
 * @return {Object} Objeto Ação do tipo COLLAPSE_RIGHT_SIDE_BAR
 */
export const collapseRightSideBar = () => ({
  type: COLLAPSE_RIGHT_SIDE_BAR
});

/**
 * Abre ou fecha barra esquerda, dependendo do estado anterior
 * @function toggleLeftBar
 */
export const toggleLeftBar = () => (dispatch, getState) => {
  dispatch(
    getState().app.leftSideBar ? collapseLeftSideBar() : expandLeftSideBar()
  );
};

/**
 * Abre ou fecha barra direita, dependendo do estado anterior
 * @function toggleRightBar
 */
export const toggleRightBar = () => (dispatch, getState) => {
  dispatch(
    getState().app.rightSideBar ? collapseRightSideBar() : expandRightSideBar()
  );
};
