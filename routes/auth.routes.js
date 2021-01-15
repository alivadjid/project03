const {Router} = require('express')
//подключаем модель
const User = require('../models/user')
const router = Router()

// /api/auth/register
router.post('/register', async(req, res)=> {
  try{
    //получаем данные из фронт
    const { email, password } = req.body

    //логика непосредственной регистрации
    const candidate = await User.findOne({ email: email})

    if (candidate) {
      return res.status(400).json({ message: 'Такой пользователь уже существует'})
    }

    // Если пользователя нет, то добавляем пользователя
  } catch(e){
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'})
  }
})

// /api/auth/login
router.post('/register', async(req, res)=> {

})


module.exports = router