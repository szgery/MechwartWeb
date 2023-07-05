import express from 'express'
import bodyParser from 'body-parser'

import swRoutes from './sw.js'

const app = express()

const PORT = 9999

app.use(bodyParser.json())
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', '*');
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use('/sw', swRoutes)

app.get('/', (req, res) => {
    console.log("Somebody call the Homepage...")
})

app.listen(PORT, () => {
    console.log(`Users: http://localhost:${PORT}/users`)
})