const {Router} = require('express')
//подключаем модель
const User = require('../models/user')
const router = Router()
const bcrypt = require('bcryptjs')

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
    //для этого надо захэшировать пароль. bcryptjs
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({email, password: hashedPassword })

    await user.save()

    res.status(201).json({message:'Пользователь создан'})

  } catch(e){
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'})
  }
})

// /api/auth/login
router.post('/register', async(req, res)=> {

})


module.exports = router