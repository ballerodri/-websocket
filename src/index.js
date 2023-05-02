import express from 'express'
import { engine } from 'express-handlebars'
import { __dirname, __filename } from './path.js'
import * as path from 'path'
import productRouter from './routes/product.routes.js'
import cartRouter from './routes/cart.routes.js'
import viewsRouter from './routes/views.routes.js'
import { Server } from 'socket.io'

// Configuraciones
const app = express()
const PORT = 8080

// Server HTTP
const server = app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))

// Configuraciones
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, './views') )

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//ServerIO
const io = new Server( server, {cors: {origin:'*'}})

//Acceso de io para las rutas
app.use((req, res, next) => {
  req.io = io
  return next()
});

// Routes
app.use('/', express.static(__dirname + '/public'))
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/', viewsRouter)