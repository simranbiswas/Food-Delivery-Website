import authReducer from './auths.red';
import userReducer from './user.red';
import { combineReducers} from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer
});

export default rootReducer;