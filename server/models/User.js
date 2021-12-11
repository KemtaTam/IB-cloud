const {Schema, model, ObjectId} = require("mongoose");

//создадим схему, в которой будет хранится информация о полях, сущности
const User = new Schema({
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	diskSpace: {type: Number, default: 1024**3*10},	
	usedSpace: {type: Number, default: 0},
	avatar: {type: String},
	//связать сущность пользователя с сущностью файлов
	//это массив, каждый объект которого имеет тип ObjectId и ссылается на сущность файл
	files : [{type: ObjectId, ref:'File'}]
});

module.exports = model('User', User);