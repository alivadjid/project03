const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
  if(req.method === 'OPTIONS') { //базовая проверка. спец. метод в rest API, кот-ый проверяет доступность сервера
    return next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"
    console.log('token: ', token)
    if(!token) {
      //если токена нет
      return res.status(401).json({ message: 'Нет авторизации.'})
    }
    //раскодировка токена

    const decoded = jwt.verify(token, config.get('jwtSecret'))

    req.user = decoded
    next()
    console.log(decoded)
  } catch(e) {
      res.status(401).json({message: 'Нет авторизации. Catch'})
  }
}