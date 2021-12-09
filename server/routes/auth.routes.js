const Router = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");	//для хранения паролей в хеше
const {check, validationResult} = require("express-validator");	//валидация данных, чтобы скипать пустые пароли или невалидные маийлы
const router = new Router();

//post запрос по url registration
//второй параметр - массив
//третий параметр - функция, принимающая запрос и ответ
router.post (
	'/registration', 

	[
		check('email', "Uncorrect email").isEmail(),	//поле, сообщение с ошибкой, функция валидации
		check('password', "Password must be longer then 3 and shorter than 12").isLength({min:3, max:12})
	],

	async (req, res) => {
		try {
			console.log(req.body);
			//получим результат валидации
			const errors = validationResult(req);
			//если результат валидации содержит ошибки, вернем код 400
			if(!errors.isEmpty()){
				return res.status(400).json({message: "Uncorrect request", errors});
			}

			const {email, password} = req.body	//параметры из тела запроса
			const candidate = await User.findOne({email});	//существует ли такой пользователь в базе

			if(candidate) return res.status(400).json({message: `User with email ${email} already exist`});
			const hashPassword = await bcrypt.hash(password, 15);	//функция hash - асинхронная
			const user = new User({email, password: hashPassword});
			await user.save();	//сохранение пользователя в базе данных (операция асинхронная)
			return res.json({message: "User was created"})	//возврат ответа от сервера

		} catch (error) {
			console.log(error);
			res.send({message: "Server error"});	//ответ пользователю
		}
	}
)

module.exports = router;