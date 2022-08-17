import 'dotenv/config'
import sequelize from './db.js'
import buildServer from './server.js'

const PORT = process.env.PORT || 5000
const app = buildServer()

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()
