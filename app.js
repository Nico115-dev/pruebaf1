const apiUrl = "http://localhost:4000/pilotos";
const pilotsContainer = document.getElementById("pilots-container");
const modal = document.getElementById("modal");
const pilotName = document.getElementById("pilot-name");
const pilotTeam = document.getElementById("pilot-team");
const pilotRole = document.getElementById("pilot-role");
const closeModal = document.getElementById("close-modal");

async function getPilots() {
  try {
    const response = await fetch(apiUrl);
    const pilots = await response.json();
    renderPilots(pilots);
  } catch (error) {
    console.error("Error fetching pilots:", error);
  }
}

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

function showModal(pilot) {
  pilotName.textContent = pilot.nombre;
  pilotTeam.textContent = pilot.equipo;
  pilotRole.textContent = pilot.rol;
  modal.style.display = "flex";  // Mostrar el modal cuando se haga clic en la tarjeta
}

closeModal.addEventListener("click", () => {
  modal.style.display = "none";  // Cerrar el modal cuando se haga clic en el botón de cerrar
});

getPilots();
