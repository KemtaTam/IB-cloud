//дефолтное состояние редьюсера
const defaultState = {
	currentUser: {},
	isAuth: false
}

//первый параметр - состояние, второй - action
export default function userReducer(state = defaultState, action){	//сам редьюсер
	switch (action.type) {
	
		default:
			return state;
	}
}