import authReducer from './auths.red';
import userReducer from './user.red';
import cartReducer from './cart.red';
import { combineReducers} from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    cart: cartReducer
});

export default rootReducer;