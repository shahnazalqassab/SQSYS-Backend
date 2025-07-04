const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const userRouter = require('./Routes/userRoutes')
const categoryRouter = require('./Routes/categoryRoutes')
const supplierRouter = require('./Routes/supplierRoutes')
const productRouter = require('./Routes/productRoutes')

const PORT = process.env.PORT || 3000

const DB = require('./Database')

const app = express()   

// Middleware
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/user', userRouter)
app.use('/category', categoryRouter)
app.use('/supplier', supplierRouter)
app.use('/product', productRouter)


app.use('/', (req, res) => {
    res.send('Welcome to the API')
})

app.listen(PORT, () => {
    console.log(`Running Express is running on port ${PORT} . . .`)
}) 
