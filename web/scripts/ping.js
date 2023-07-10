import ping from 'ping'
import {ip_arr} from './start.js'

let objp = document.getElementById("p")

export function pingTest(){

    for(let i in ip_arr){
        (async function () {
            const result = await ping.promise.probe(ip_arr[i], {
                timeout: 10,
                extra: ["-i", "2"],
            });
        
            console.log(result);
            })();
    }
}