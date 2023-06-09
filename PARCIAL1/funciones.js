document.getElementById("input").addEventListener('click', consultar); //Lo mismo que Onclick(), pero sin ponerlo en el html
const codigo = document.getElementById("codigo"); //traigo el código, usa .value para compararlo
const contenedor = document.getElementById("container"); //traigo el div donde voy a encajar todo
var accederFacil = '';
var ack = '';

function consultar() {
  if (codigo.value == null || codigo.value < 0) {
     contenedor.innerHTML = `
          <h3> Ingresá un numero válido. no nulo ni negativo. </h3>
          `;
  }else{
    fetch("datosCensales.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data); //traigo los datos del JSON
        console.log(codigo.value); //Traigo el valor del INPUT
        accederFacil = data["localidades-censales"]; //guardo acá para no tener que hacer en el for: "data["localidades-censales"].length", sería lo mismo. pero necesitás escribir mas si queres asignar mas variables.
        for (let i = 0; i < accederFacil.length; i++) {
          if (codigo.value == accederFacil[i].id) {
            let municipioEncontrado = accederFacil[i]; //guardo el municipio que encuentro
            console.log(municipioEncontrado);
            let pos = i; //Por amor al arte
            console.log(pos); //por amor al arte
            let nombreMunicipio = municipioEncontrado.municipio.nombre;
            let nombreDepartamento = municipioEncontrado.departamento.nombre;
            console.log(nombreMunicipio, nombreDepartamento); //CÓDIGO INPUT usado: 30049030 (Municipalidad da NULL, departamento da GUALEGUAY.)
            contenedor.innerHTML = `
           <h3>Nombre del Municipio: ${nombreMunicipio} (Actividad)</h3>
           <h3>Nombre del Departamento: ${nombreDepartamento} (Actividad)</h3>
           <h3>Cantidad de Registros: ${accederFacil.length} (Actividad)</h3>
           `; //En cantidad de registros, tambien puede usarse: data.cantidad, es lo mismo.
            ack = true; //Sirve para comparar después:
            break; //rompo para que no siga recorriendo.
          } else {
            ack = false; //Sirve para comparar después:
          }
        }
        if (ack == false) {
          contenedor.innerHTML = `
          <h3> Valor no encontrado en el JSON. </h3>
          `;
        }
      });
  }
}