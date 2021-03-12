const express = require('express')
const mongoose = require('mongoose')
const config = require('config')

const app = express()

const start = async port => {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    app.listen(port, () => console.log(`App has been started on port ${port}...`))
  } catch (e) {
    console.error('Server error', e.message)
  }
}

start(config.get('port'))
