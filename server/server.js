require('dotenv').config()

const express = require('express');
const sequelize = require('./config/db.config')
const models = require('./models/models')
const router = require('./routes/routes')
const cors = require('cors')

const PORT = process.env.PORT || 8888;

const app = express();
app.use(cors())
app.use(express.json())
app.use('/api', router)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
})

const start = async () => {
  try {

    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  } catch (error) {
    console.error(error)
  }
}

start();
