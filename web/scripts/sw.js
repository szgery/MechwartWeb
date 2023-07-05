import express from 'express'
import fs from 'fs'

const router = express.Router()

const path = './web/scripts/switches.json'

let sw = []

let initDevs = () => {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        //console.log(data.toString());
        sw = JSON.parse(data)
    });
}
 initDevs(path);

 router.get('/', (req, res) => {
    initDevs(path)
    console.log(sw)
    res.send(sw)
 })

export default router