import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import api from './routes/api.js'
import rateLimit from 'express-rate-limit'

dotenv.config()
const app = express()
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const corsOptions = {
    origin: '*',
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type,Authorization',
};

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    message: "Too many requests from this IP, please try again after 15 minutes",
});

// Apply the rate limiter to all requests
app.use(limiter);

app.use(cors(corsOptions));


app.use('/api', api)
app.get('/', (req, res) => {
    res.send('Hello World')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})