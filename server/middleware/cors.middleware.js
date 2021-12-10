//middleware - промежуточное звено, которое позволит отправлять любые виды запросов с любых доменов

//третий параметр - функция next, которая вызовет по цепочке следующий мидлвейр
function cors(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
}

module.exports = cors;