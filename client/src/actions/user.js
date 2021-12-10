import axios from 'axios';	//для асинхронным http запросов на сервер

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