let content = document.getElementById("ping")

let pingTest = () => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("http://127.0.0.1:9999/ping", requestOptions)
        .then(response => response.json())
        .then(result => {
            try {
                if(result.alive !== false && result.host !== null){
                    content.innerHTML = `<span style="color: green">Elérhető</span>`
                }else if(response.alive !== true && result.host !== null){
                    alert("Nem elérhető "+ result.inputHost)
                }   
            } catch (error) {
                alert(error)
            }            
        })
        .catch(error => console.log('error', error));
}