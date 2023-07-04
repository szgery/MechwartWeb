const express = require('express')
const app = express()
const port = 9999

app.get('/apitest', (req, res) => {
    res.send('Hello')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})