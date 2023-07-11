import express, { json } from 'express'
import bodyParser from 'body-parser'
import fs from 'fs'
import {v4 as uuidv4 } from 'uuid';

const app = express()
const path = './web/scripts/switches.json'
const PORT = 9999

app.use(bodyParser.urlencoded())
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', '*');
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/', (req, res) => {
    console.log("Somebody call the Homepage...")
    res.send("Connected!")
})

let sw = []

let initDevs = () => {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        //console.log(data.toString());+
        sw = JSON.parse(data)
    });
}
initDevs(path)

 app.get('/sw', (req, res) => {
    initDevs(path)
    console.log(sw)
    res.send(sw)
 })

 let indexer = 0;

 app.post('/add', (req, res) => {
    const device = req.body

    sw.push({"uuid": uuidv4(), ...device})
    fs.writeFileSync(path, JSON.stringify(sw))
    res.send(`"Added device ${device.name}"`)
 })

 app.delete("/del", (req, res) => {
    const devUuid = req.body.uuid
    let tempName

    for(let i in sw){
        if(sw[i].uuid == devUuid){
            tempName = sw[i].name
            delete sw[i]    
            let arr = sw.filter(elements => {return elements !== null})                    
            fs.writeFileSync(path, JSON.stringify(arr))
        }
    }

    res.send("Removed device " + tempName)
 })

app.listen(PORT, () => {
    console.log(`Users: http://localhost:${PORT}/users`)
})