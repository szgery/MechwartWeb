let mscreen = document.getElementById("mainScreen")
let test = document.getElementById("test")
let inpfield = document.getElementById("inputfield")

let res = []

let load = () => {
    mscreen.innerHTML = `
    
    `
}

let testfunc = () => {
    let requestOptions = {
        method: 'GET',
        redirect: 'follow',
      };
      
      fetch("http://127.0.0.1:9999/sw", requestOptions)
        .then(response => response.json())
        .then(result => {
            test.innerHTML = ""
            for(let i in result){
                test.innerHTML += `
                <div class="card" style="width: 50%">
                    <div class="card-body">
                        ${result[i].name}, ip: ${result[i].ip_add}                        
                        <button style="float: right" onclick="removeItem()">X</button>
                        <button style="float: right">Terminal</button>
                    </div>
                </div>
                `
            }
        })
        .catch(error => console.log('error', error));
}

let add = () => {
    inpfield.innerHTML = `
        
    `

}

let addDevice = () => {
    let name
    let ip

    if (document.getElementById("inName").value == "" || document.getElementById("inIp").value == "") {
        alert("Üres mező nem vehető fel!")
    }else{
        inpfield.innerHTML = ""
        name = document.getElementById("inName").value
        ip = document.getElementById("inIp").value
    }
    
    var requestOptions = {
        method: 'POST',
        redirect: 'follow'
      };
      
      fetch("http://127.0.0.1:9999/sw?name=" + name + "&ip=" + ip, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}

let removeItem = () => {
    var requestOptions = {
        method: 'POST',
        redirect: 'follow'
      };
      
      fetch("http://127.0.0.1:9999/:remove", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}