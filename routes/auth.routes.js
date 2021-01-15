const {Router} = require('express')
//подключаем модель
const User = require('../models/user')
const router = Router()
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')

// /api/auth/register
router.post(
  '/register',
  // массив middlewar-ов для валидации данных из фронта
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 6 симоволов')
      .isLength({ min: 6})
  ],
  async(req, res)=> {
  try{
    // обработка валидации
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректные данные при регистрации'
      })
    }

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
router.post(
  '/register',
  [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists() // exists - пароль просто существует
  ],
  async(req, res)=> {
    try{
      // обработка валидации
      const errors = validationResult(req)
      if (errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при входе в систему'
        })
      }
      const { email, password } = req.body

      const user = await User.findOne({ email })

      if(!user) {
        return res.status(400).json({message: 'Пользователь не найден'})
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if(!isMatch) {
        return res.status(400).json({message:'Неверный пароль, попробуйте снова'})
      }

      const token = jwt.sign(
        { userId: user.id }, // объект для шифрования
        config.get('jwtSecret'),  //секретный ключ
        { expiresIn: '1h'} //через сколько этот токен перестанет действовать
      )

      res.json({ token, userId: user.id })

    } catch(e){
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'})
    }
})


module.exports = router