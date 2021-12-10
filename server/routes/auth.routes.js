const Router = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");	//для хранения паролей в хеше
const config = require("config");
const jwt = require("jsonwebtoken");
const {check, validationResult} = require("express-validator");	//валидация данных, чтобы скипать пустые пароли или невалидные маийлы
const router = new Router();
const authMiddleware = require('../middleware/auth.middleware');

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

			const {email, password} = req.body	//получаем параметры из тела запроса
			const candidate = await User.findOne({email});	//существует ли пользователь с таким email в базе
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

router.post ('/login', 
	async (req, res) => {
		try {
			const {email, password} = req.body;
			const user = await User.findOne({email});
			if(!user) return res.status(404).json({message: "User not found"});

			//если пользователь найден, нужно сравнить пароль из запроса с паролем из бд
			//compareSync сравнивает зашифрованный пароль с не зашифрованным
			const isPassValid = bcrypt.compareSync(password, user.password);
			if(!isPassValid) return res.status(404).json({message: "Invalid password"});
			//первый параметр - объект с данными, которые хотим поместить в токен
			//второй параметр - секретный ключ из папки config
			//третий параметр - объект, указывающий сколько времени токен будет существовать
			const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"});	//создание токена
			//после создания токена его необходимо вернуть обратно на клиент
			return res.json({
				token,
				user: {
					id: user.id,
					email: user.email,
					diskSpace: user.diskSpace,
					usedSpace: user.usedSpace,
					avatar: user.avatar
				}
			})
		} catch (error) {
			console.log(error); 
			res.send({message: "Server error"});	//ответ пользователю
		}
	}
)

router.get ('/auth', authMiddleware,
	async (req, res) => {
		try {
			//получим пользователя по тому id, который достали из токена
			const user = await User.findOne({_id: req.user.id});
			const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"});	//создание токена
			//после создания токена его необходимо вернуть обратно на клиент
			return res.json({
				token,
				user: {
					id: user.id,
					email: user.email,
					diskSpace: user.diskSpace,
					usedSpace: user.usedSpace,
					avatar: user.avatar
				}
			})
		} catch (error) {
			console.log(error); 
			res.send({message: "Server error"});	//ответ пользователю
		}
	}
)

module.exports = router;