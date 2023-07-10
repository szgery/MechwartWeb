let mscreen = document.getElementById("mainScreen")
let test = document.getElementById("test")
let inpfield = document.getElementById("inputfield")
let stat = document.getElementById("statusReveal")

let res = []
let ip_arr = []

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
                        <button style="float: right; background-color: red" onclick="removeItem('${result[i].uuid}')">X</button>
                        <button style="float: right">Terminal</button>
                        <button style="float: right">Log</button>
                    </div>
                </div>
                `
                ip_arr.push(result[i].ip_add)
            }
        })
        .catch(error => console.log('error', error));
}

let addDevice = () => {
    let name = document.getElementById("inName").value
    let ip = document.getElementById("inIp").value

    if (document.getElementById("inName").value == "" || document.getElementById("inIp").value == "") {
        alert("Üres mező nem vehető fel!")
    }else{
        var urlencoded = new URLSearchParams();
        urlencoded.append("name", name);
        urlencoded.append("ip_add", ip);
        
        var requestOptions = {
          method: 'POST',
          body: urlencoded,
          redirect: 'follow'
        };
        
        fetch("http://127.0.0.1:9999/add", requestOptions)
          .then(response => response.json())
          .then(result => console.log(result), alert(requestOptions.body))
          .catch(error => console.log('error', error));
    }
}

let removeItem = (uuid) => {
    var urlencoded = new URLSearchParams();
    urlencoded.append("uuid", uuid);

    var requestOptions = {
    method: 'DELETE',
    body: urlencoded,
    redirect: 'follow'
    };

    fetch("http://127.0.0.1:9999/del", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}