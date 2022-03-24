import homeScreenReducer from './reducer.homeScreen';
import splashScreenReducer from './reducer.splashScreen';
import LoginScreenReducer from './reducer.loginScreen';
import {jsonLog} from '../../App';
const reducers = [homeScreenReducer, splashScreenReducer, LoginScreenReducer];

var state = {};

reducers.forEach(item => {
  state = Object.assign(state, item.state);
});

var stateKeys = [];
var dispatchFunctions = [];

reducers.forEach(item => {
  item.dispatch.forEach(item2 => {
    stateKeys = [...stateKeys, item2.stateKey];
    dispatchFunctions = [
      ...dispatchFunctions,
      {
        setFunction: item2.setFunction,
        functionKey: item2.case,
        stateKey: item2.stateKey,
      },
    ];
  });
});

export default {
  dispatch: [...reducers],
  state,
  stateKeys,
  dispatchFunctions,
};
