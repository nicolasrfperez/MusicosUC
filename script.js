
//selecciona el tag form
var form = document.getElementById('form');
//agrega el evento al form
form.addEventListener('submit', function(event){

    event.preventDefault();
    //toma los values contenido en el html
    var usuario =  document.getElementById('usuario').value;
    console.log(usuario);
    var password =  document.getElementById("password").value;
    console.log(password);
    //fetch hace la conexion con el server express
    fetch('http://localhost:8080', {
      method: 'POST',
      body : JSON.stringify({
          usuario : usuario,
          password : password
      }),
      headers : {
          "Content-type": "application/json"
      }
  })
.then(response => response.json())
.then(json => console.log(json))
})
