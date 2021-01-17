const { Schema, model, Types} = require('mongoose')

const schema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  // можно еще добавить имя.
  // сокращение ссылок. То можно хранить эти ссылки для пользоватея
  links: [{type: Types.ObjectId, ref: 'Link'}]
})

module.exports = model('User', schema)