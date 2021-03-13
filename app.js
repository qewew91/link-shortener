const express = require('express')
const mongoose = require('mongoose')
const config = require('config')

const app = express()

app.use(express.json())

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))

const start = async port => {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    app.listen(port, () => console.log(`App has been started on port ${port}...`))
  } catch (e) {
    console.error('Server error', e.message)
  }
}

start(config.get('port'))
