//middleware - промежуточное звено, которое позволит отправлять любые виды запросов с любых доменов

//третий параметр - функция next, которая вызовет по цепочке следующий мидлвейр
function cors(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");	//указывает браузеру разрешить запросы из любых источников
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");	//указывает на то, какие методы поддерживаются URL-ом ответа в контексте CORS протокола. 
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");	//указывает, на то, какие заголовки поддерживаются URL-ом ответа в контексте CORS протокола.
    next();
}

module.exports = cors;