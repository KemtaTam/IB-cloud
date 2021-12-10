import axios from 'axios';	//для асинхронным http запросов на сервер
import {setUser} from '../reducers/userReducer';

export const registration = async (email, password) => {
	try {
		//первым параметром - url, вторым - тело запроса (какие-то данные)
		const response = await axios.post('http://localhost:5000/api/auth/registration', {
			email,
			password
		});
		alert(response.data.message)	//в случае успеха сообщение от сервера
	} catch (error) {
		alert(error.response.data.message);
	}
}

export const login = (email, password) => {
	//будем сохранять данные о пользователе в состоянии, а также укажем, что пользователь залогинен
	return async dispatch => {
		try {
			//первым параметром - url, вторым - тело запроса (какие-то данные)
			const response = await axios.post('http://localhost:5000/api/auth/login', {
				email,
				password
			});

			//вызываем диспатч, в который передаем тот созданный action creator в userReduce.js
			//параметром в эту функцию передадим юзера, полученного с запроса и по итогу этот action creator вернет объект, а именно action
			//dispatch прокинет его в reducer и мы получим измененного юзера и переменную, отвечающую за авторизацию
			dispatch(setUser(response.data.user));
			//локальное хранилище, чтобы хранить токен, полученный от сервера и хранить так, чтобы его можно было получить даже после того как закроем браузер
			localStorage.setItem('token', response.data.token);
			console.log(response.data);
		} 
		catch (error) {
			alert(error.response.data.message);
		}
	}	
	
}

export const auth = () => {
	return async dispatch => {
		try {
			const response = await axios.get(
				`http://localhost:5000/api/auth/auth`,
				{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
			)	//в header запроса добавим токен, который получим из локального хранилища

			dispatch(setUser(response.data.user));
			localStorage.setItem('token', response.data.token);
			console.log(response.data);
		} 
		catch (error) {
			alert(error.response.data.message);
			//в случае неудачного запроса, будем удалять токен из хранилища
			localStorage.removeItem('token');
		}
	}	
	
}