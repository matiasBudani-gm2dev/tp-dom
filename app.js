let trips;

let currentTripId = null;

const table = document.getElementById("trips-table-data")

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

refreshTable()

function refreshTable(){
    for(let i = trips.length-1; i >= 0; i--){
        const fila = document.createElement("tr")

        const celdaName = document.createElement("td")
        celdaName.textContent = trips[i]["trip name"]
        fila.appendChild(celdaName)

        let celdaClientName = document.createElement("td")
        celdaClientName.textContent = trips[i]["client name"]
        fila.appendChild(celdaClientName)

        let celdaTravelDates = document.createElement("td")
        celdaTravelDates.textContent = trips[i]["travel dates"]
        fila.appendChild(celdaTravelDates)

        let celdaTotalAmount = document.createElement("td")
        celdaTotalAmount.textContent = trips[i]["total amount"]
        fila.appendChild(celdaTotalAmount)
        

        const celdaStatus = document.createElement("td")
        celdaStatus.textContent = trips[i]["status"]
        fila.appendChild(celdaStatus)

        const celdaActions = document.createElement("td")
        const nextId = trips.length > 0 ? trips[trips.length - 1].id + 1 : 0;
        celdaActions.innerHTML = `
        <button onclick="showEditTrip(${i})" "data-id="${i}">Update</button>
        <button>Delete</button>   
        `
        fila.appendChild(celdaActions)
        
        table.appendChild(fila)
    }
}

function showEditTrip(id){
    const checkbox = document.getElementById("show-edit-trip");
    checkbox.checked = !checkbox.checked
    currentTripId = id
}

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

    // aniadir "-" a campos name cliente, travel dates y total amount
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
    <button onclick="showEditTrip(${nextId})" "data-id="${nextId}">Update</button>

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

function editTrip(indice = currentTripId){
    console.log("indice:", indice);
    console.log("typeof indice:", typeof indice); // debe ser 'number' o string convertible a número
    console.log("trips[indice]:", trips[indice]);

    const newTripName = document.getElementById("edit-trip-name").value
    const newClientName = document.getElementById("edit-first-name").value.trim() + " " + document.getElementById("edit-last-name").value.trim()
    const newTravelDates = document.getElementById("edit-start-date").value.trim() + " " + document.getElementById("edit-end-date").value.trim()
       
    console.log(newTripName)
    console.log(newClientName)
    console.log(newTravelDates)

    console.log(trips)
    console.log(trips[indice])

    trips[indice] = {
        "trip name" : newTripName,
        "client name" : newClientName,
        "travel dates" : newTravelDates,
        status : "Quoting"
    }


    localStorage.setItem("trips", JSON.stringify(trips))

}