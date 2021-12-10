const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const authRouter = require("./routes/auth.routes"); //импортируем роутер
const app = express();	//создаем сам сервер
const PORT = config.get('serverPort');	//номер порта, на котором будет работать сервер (взяли его по ключу из default.json)
const corsMiddleware = require('./middleware/cors.middleware');

app.use(corsMiddleware);
app.use(express.json());
//первый параметр - url, второй - сам роутер
app.use("/api/auth", authRouter);

//функция которая будет подключаться к базе данных и запускать сервер (подключение к бд - асинхронный процесс)
const start = async() => {
	//чтобы отлавливать потенциальные ошибки
	try {
		//передаем url в connect
		await mongoose.connect(config.get("dbUrl"));

		//вторым параметром - функция, которая вызывается после того, как сервер запустился
		app.listen(PORT, () => {
			console.log('Server started on port ', PORT);
		});
	} catch (error) {
		
	}
}
start();

