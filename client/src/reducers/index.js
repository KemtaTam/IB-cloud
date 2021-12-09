import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import fileReducer from "./fileReducer";
import userReducer from "./userReducer";

//создание корневого редьюсера
const rootReducer = combineReducers({
	//добавление созданных редьюсеров в общий
	user: userReducer,
	files: fileReducer,
})

//второй параметр - чтобы использовать инструменты разработчика 
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));	//создание стора