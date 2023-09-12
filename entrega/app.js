import express from 'express'
import productRouter  from './routes/product.routes.js'
import cartRouter from './routes/cart.routes.js'
import sessionsRoutes from './routes/sessions.routes.js'
import userRouter from './routes/user.routes.js'
import session from 'express-session'
import {dbConnection} from './dao/db/configDb.js'
import cookieParser from 'cookie-parser'
import MongoStore from 'connect-mongo'

const app = express()
const port = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}) )
app.use(cookieParser())
app.use(session({
  store: MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1/coderhouse',
    ttl: 15
  }),
  secret: 'secretoCoder',
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 60000}
}))

app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use("/sessions", sessionsRoutes)
app.use('/api/users', userRouter)


app.get('/', (req, res) => {
  res.send('Hello World!')
})







app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

await dbConnection()



