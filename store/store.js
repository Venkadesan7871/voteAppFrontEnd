import { createStore } from "redux";
import rootReducer from "./localstore";

const store = createStore(rootReducer);

export default store;