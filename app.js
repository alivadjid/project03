const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

//middlewar для корректного парсинга из фронта
app.use(express.json({extended: true}))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))

const PORT = config.get('port') || 5000

async function start(){
  try{
    await mongoose.connect(config.get('mongoUri'), {
      // для успешного коннекта
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    //только после соединения с БД
    app.listen(PORT, ()=> {console.log(`App has been started on port ${PORT}`)})
  }catch(e){
    console.log(`Server error`, e.message)
    process.exit(1) //глобальный объект
  }
}

start()
