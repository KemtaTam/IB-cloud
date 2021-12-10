//что каждый раз при открытии приложения в браузере, получать данные о пользователе

const jwt = require('jsonwebtoken');	//jwt и config чтобы получать секретный ключ
const config = require('config');

module.exports = (req, res, next) => {
	//если метод запроса опшинс, то вызовем следующий мидлвейр
	if(req.method === 'OPTIONS') return next();

	try {
		//получим токен из заголовка запроса "authorization"
		//тк токен состоит из двух частей, разделим его и получим второй элемент массива (сам токен)
		const token = req.headers.authorization.split(' ')[1];
		if(!token) return res.status(401).json({message: 'Auth error'});
		//раскодируем токен, получим из него все данные
		const decoded = jwt.verify(token, config.get('secretKey'));
		//в запрос в поле юзер добавим декодированные данные из токена
		req.user = decoded;
		//вызвать следующий мидлвейр 
		next();
	} catch (error) {
		return res.status(401).json({message: 'Auth error'});
	}
}