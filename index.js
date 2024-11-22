import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import api from './routes/api.js'

dotenv.config()
const app = express()
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const corsOptions = {
    origin: 'http://your-frontend-url.com', // Replace with your frontend URL
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));


app.use('/api', api)
app.get('/', (req, res) => {
    res.send('Hello World')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})