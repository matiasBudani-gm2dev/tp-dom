let trips;
if (!localStorage.getItem("trips")) {
  // No existe, así que la guardamos
  trips = []
  console.log("Lista creada y almacenada en localStorage.");
} else {
  // Ya existe, no hacemos nada
  console.log("La lista ya existe en localStorage. No se vuelve a crear.");
  trips = localStorage.getItem("trips")
  trips = JSON.parse(trips)
}

function mostrarNullComoRaya(valor){
    if(valor == ''){
        return "-"
    }
}

const table = document.getElementById("trips-table-data")
for(let i = trips.length-1; i >= 0; i--){
    console.log(trips[i])
    const fila = document.createElement("tr")

    const celdaName = document.createElement("td")
    celdaName.textContent = trips[i]["trip name"]
    fila.appendChild(celdaName)

    let celdaClientName = document.createElement("td")
    celdaClientName.textContent = trips[i]["client name"]
    celdaClientName.textContent = mostrarNullComoRaya(celdaClientName.textContent)
    fila.appendChild(celdaClientName)

    let celdaTravelDates = document.createElement("td")
    celdaTravelDates.textContent = trips[i]["travel dates"]
    celdaTravelDates.textContent = mostrarNullComoRaya(celdaTravelDates.textContent)
    fila.appendChild(celdaTravelDates)

    let celdaTotalAmount = document.createElement("td")
    celdaTotalAmount.textContent = trips[i]["total amount"]
    celdaTotalAmount.textContent = mostrarNullComoRaya(celdaTotalAmount.textContent)
    fila.appendChild(celdaTotalAmount)
    

    const celdaStatus = document.createElement("td")
    celdaStatus.textContent = trips[i]["status"]
    fila.appendChild(celdaStatus)

    const celdaActions = document.createElement("td")
    celdaActions.innerHTML = `
    <button>Update</button>
    <button>Delete</button>  
    `
    fila.appendChild(celdaActions)
    
    table.appendChild(fila)
    console.log(table)
};



function addTrip(){
    const errorExiste = document.getElementById("mensaje-error")
    if(errorExiste){
        errorExiste.remove()
    }
    const tripName = document.getElementById("new-trip-name").value
    const createTripContent = document.getElementById("content-modal")
    if (/\d/.test(tripName) ){
        return createTripContent.innerHTML += "<p id='mensaje-error'>\nEl nombre de viaje no puede contener numeros</p>"
    }
    if(tripName.trim() ==  ""){
        return createTripContent.innerHTML += "<p id='mensaje-error'>\nEl nombre del viaje no puede ser vacio</p>"
    }

    const nuevaFila = document.createElement('tr');
    const celda = document.createElement('td');
    celda.textContent = tripName
    nuevaFila.appendChild(celda)
    for(let i=0; i <3; i++){   
        const celdasVacias = document.createElement('td')
        celdasVacias.textContent = "-"
        nuevaFila.appendChild(celdasVacias)
    }
    const celdaStatus = document.createElement('td')
    celdaStatus.textContent = "Quoting"
    nuevaFila.appendChild(celdaStatus)
    const celdaActions = document.createElement('td')
    const nextId = trips.length > 0 ? trips[trips.length - 1].id + 1 : 0;

    celdaActions.innerHTML = `
    <button data-id="${nextId}">Update</button>
    <button>Delete</button>  
    `
    nuevaFila.appendChild(celdaActions)

    table.prepend(nuevaFila)
    
    const checkboxNewTrip = document.getElementById("show-create-trip")
    checkboxNewTrip.checked = false
    document.getElementById("new-trip-name").value = ""    


    console.log(trips[trips.length])
    if(trips.length === 0){
        id = 0
    }else{
        console.log(id = trips[trips.length - 1]["id"] + 1)
    }
    let trip = {
        id : id,
        "trip name": tripName,
        "client name" : null,
        "travel dates" : null,
        "total amount" : null,
        status: "Quoting"
    }
    console.log(trips)
    trips.push(trip)

    localStorage.setItem("trips", JSON.stringify(trips))

    console.log(table.innerHTML)
}
