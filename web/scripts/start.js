import express, { json } from 'express'
import bodyParser from 'body-parser'
import fs from 'fs'
import {v4 as uuidv4 } from 'uuid';
import ping from 'ping'
import { resolve } from 'path';
//import {ip_arr} from './start.js'

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
        }else{
            sw = JSON.parse(data)
        }
    });
}
initDevs(path)

app.get('/sw', (req, res) => {
    initDevs(path)

    for(let i in sw){
        ping.sys.probe(sw[i].ip_add, function(isAlive){
            const msg = isAlive ? "true": "false";     
            if(sw[i])       
                sw[i].ip_add_isAlive = msg;
            fs.writeFileSync(path, JSON.stringify(sw))
        })
    }   

    console.log(sw)
    res.send(sw)
})

app.post('/add', (req, res) => {
    const device = req.body

    ping.sys.probe(device.ip_add, function(isAlive){
        const msg = isAlive ? "true": "false";

        sw.push({"ip_add_isAlive": msg, "uuid": uuidv4(), ...device})
        fs.writeFileSync(path, JSON.stringify(sw))
        res.send(`"Added device ${device.name}, alive: ${msg}"`)
    })
})

app.delete("/del", (req, res) => {
    const devUuid = req.body.uuid
    let tempName

    try {
        for(let i in sw){
            if(sw[i].uuid == devUuid){
                tempName = sw[i].name
                delete sw[i]    
                sw = sw.filter(elements => {return elements !== null})                    
                fs.writeFileSync(path, JSON.stringify(sw))
            }
        }   
    } catch (error) {
        
    }    

    res.send("Removed device " + tempName)
})

app.listen(PORT, () => {
    console.log(`Users: http://localhost:${PORT}/users`)
})