const SET_USER = "SET_USER";	//action
const LOGOUT = "LOGOUT";	//action, при котором пользователь будет разлогиниваться

//дефолтное состояние редьюсера
const defaultState = {
	currentUser: {},
	isAuth: false
}

export default function userReducer(state = defaultState, action){	//сам редьюсер
	switch (action.type) {
		case SET_USER:
			return{
				...state,	//возвращаем текущее состояние
				currentUser: action.payload,
				isAuth: true	//в случае успешного логина
			}
		case LOGOUT:
			//удаляем токен из локального хранилища
			localStorage.removeItem('token');
			return{
				...state,	//возвращаем текущее состояние
				currentUser: {},
				isAuth: false	//в случае успешного логина
			}
		default:
			return state;
	}
}

//action creator
//это функция, которая принимает на вход какие то данные и возвращает объект с типом экшена и данными, переданными через параметр
export const setUser = user => ({type: SET_USER, payload: user});
export const logout = () => ({type: LOGOUT});