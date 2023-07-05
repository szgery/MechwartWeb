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

 router.post('/', (req, res) => {
    const device = req.body

    sw.push ({
        ...device        
    })
    fs.writeFileSync(path, JSON.stringify(sw))

    res.send(`${device.name} ${device.ip_add}`)
 })

 router.delete('/:remove', (req, res) => {
    const {remove} = req.params

    sw = sw.filter((dev) => dev.name !== remove)
    fs.writeFileSync(path, JSON.stringify(sw))
    res.send(`User with the id [${remove}] DELETED!`)
 })

export default router