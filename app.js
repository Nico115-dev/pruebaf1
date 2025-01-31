const apiUrl = "http://localhost:4000/pilotos";
const pilotsContainer = document.getElementById("pilots-container");
const modal = document.getElementById("modal");
const pilotName = document.getElementById("pilot-name");
const pilotTeam = document.getElementById("pilot-team");
const pilotRole = document.getElementById("pilot-role");
const pilotBirthdate = document.getElementById("pilot-birthdate");
const pilotNationality = document.getElementById("pilot-nationality");
const closeModal = document.getElementById("close-modal");
const teamLogo = document.getElementById("team-logo"); // Elemento para el logo del equipo

// Función para obtener los datos de los pilotos
async function getPilots() {
  try {
    const response = await fetch(apiUrl);
    const pilots = await response.json();
    renderPilots(pilots);
  } catch (error) {
    console.error("Error fetching pilots:", error);
  }
}

// Función para renderizar las tarjetas de pilotos
function renderPilots(pilots) {
  pilotsContainer.innerHTML = "";  // Limpiar el contenedor antes de añadir las tarjetas
  pilots.forEach((pilot) => {
    const card = document.createElement("div");
    card.className = "card";  // Asegúrate de tener clases de CSS para las tarjetas
    card.innerHTML = `
      <img src="${pilot.imagen}" alt="${pilot.nombre}" class="piloto-img">
      <h3>${pilot.nombre}</h3>
      <p>${pilot.equipo}</p>
    `;

    // Añadir el evento de click para mostrar el modal
    card.addEventListener("click", () => showModal(pilot));

    pilotsContainer.appendChild(card);  // Añadir la tarjeta al contenedor
  });
}

// Función para mostrar el modal con la información detallada del piloto
function showModal(pilot) {
  pilotName.textContent = pilot.nombre;
  pilotTeam.textContent = `${pilot.equipo}`;
  pilotRole.textContent = `${pilot.rol}`;
  pilotBirthdate.textContent = `${pilot["fecha de nacimiento"]}`;
  pilotNationality.textContent = `${pilot.Nacionalidad}`;
  
  // Aquí agregarías la imagen del logo del equipo (ajusta la ruta según la disponibilidad)
  teamLogo.src = `ruta-al-logo-del-equipo/${pilot.equipo.toLowerCase().replace(' ', '-')}.png`;  // Ajusta esta ruta según tu estructura de archivos
  
  modal.style.display = "flex";  // Mostrar el modal cuando se hace clic en la tarjeta
}

// Cerrar el modal cuando se hace clic en el botón de cerrar
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Llamar a la función para obtener los pilotos al cargar la página
getPilots();
