import express, { urlencoded } from 'express'
import router from './routes/index.routes.js'
import morgan from 'morgan'
import cors from 'cors'
import corsOptions from './config/corsOptions.js'
const app = express()
app.set('port', process.env.PORT || 4000)

//middlewares
app.use(morgan('dev'))

app.use(cors(corsOptions))
app.use(express.json())
app.use(urlencoded({extended:false}))

//rutas
app.get('/', (req,res) => {
  res.send("hola pepe")
})
app.use('/api', router)

export default app
