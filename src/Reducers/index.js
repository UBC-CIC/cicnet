import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import userReducer from "./userReducer";


export default combineReducers({
    loginState: loginReducer,
    userListState: userReducer
});