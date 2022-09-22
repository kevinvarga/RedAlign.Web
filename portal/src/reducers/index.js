import { combineReducers } from "redux";
import SessionReducer from "./Session.js";

const reducer = combineReducers({
    session: SessionReducer
});

export default reducer;
