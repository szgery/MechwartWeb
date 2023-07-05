let mscreen = document.getElementById("mainScreen")
let test = document.getElementById("test")

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
                        <button style="float: right">Terminal</button>
                    </div>
                </div>
                `
            }
        })
        .catch(error => console.log('error', error));
}