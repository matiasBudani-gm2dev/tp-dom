let trips = []
const tabla = document.getElementById('trips-table-data');

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
    celdaActions.innerHTML = `
    <button>Update</button>
    <button>Delete</button>  
    `
    nuevaFila.appendChild(celdaActions)

    tabla.prepend(nuevaFila)
    
    const checkboxNewTrip = document.getElementById("show-create-trip")
    checkboxNewTrip.checked = false
    document.getElementById("new-trip-name").value = ""    

    let trip = {
        "trip name": tripName,
        "client name" : null,
        "travel dates" : null,
        "total amount" : null,
        status: "Quoting"
    }

    trips.push(trip)

    localStorage.setItem("trips", JSON.stringify(trips))

}
