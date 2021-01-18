const { Router } = require('express')
const Link = require('../models/Link')
const router  = Router()
const auth = require('../middleware/auth.middleware')
const config = require('config')
const shortid = require('shortid')

//обработка нескольких запросов

router.post('/generate', auth, async(req,res) => {
  try{
    const baseUrl = config.get('baseUrl')

    //с фронта получаем обеъкт from
    const { from } = req.body

    const code = shortid.generate()

    //проверка в базе ссылки from

    const existing = await Link.findOne({from})

    if(existing) {
      return res.json({ link: existing})
    }

    const to = baseUrl + '/t/' + code
    // console.log('to: ', to)
    const link = new Link({
      code, to, from, owner: req.user.userId
    })

    await link.save()
    //статус created
    res.status(201).json({ link })

  } catch(e){
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'})
  }
})

// get. для получения всех ссылок
router.get('/', auth, async(req, res) => {
  try{
    //const links = await Link.find({ owner: null}) //??
    //запрос в базу где мы ищем все ссылки который относится к текущему пользователю
    const links = await Link.find({ owner: req.user.userId })
    res.json(links)
  } catch(e){
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'})
  }
})

// get для получения ссылки по id
router.get('/:id', auth,async(req,res) => {
  try{
    const link = await Link.findById(req.params.id) //??
    res.json(link)
  } catch(e){
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'})
  }
})

module.exports = router