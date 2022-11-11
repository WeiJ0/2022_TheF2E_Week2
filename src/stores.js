import { createStore, combineReducers } from "redux";
import fileReducer from "./reducer/file";

const rootReducer = combineReducers({
    fileReducer,
});

const store = createStore(rootReducer);
export default store;