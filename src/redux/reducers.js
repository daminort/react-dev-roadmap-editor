import { combineReducers } from 'redux';
import App from './app/reducer';
import Diagram from './diagram/reducer';

export default combineReducers({
  App,
  Diagram,
});
