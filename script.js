const vehicles = [
  { title: "2024 Ram 1500 Limited", category: "truck", price: "$58,900", payment: "Est. $899/mo", tag: "Truck" },
  { title: "2023 Jeep Wrangler Rubicon", category: "performance", price: "$47,500", payment: "Est. $729/mo", tag: "Adventure" },
  { title: "2024 BMW X5 xDrive", category: "luxury", price: "$64,800", payment: "Est. $989/mo", tag: "Luxury" },
  { title: "2023 Dodge Charger Scat Pack", category: "performance", price: "$49,900", payment: "Est. $769/mo", tag: "Performance" },
  { title: "2024 Tesla Model Y Long Range", category: "ev", price: "$41,900", payment: "Est. $649/mo", tag: "EV" },
  { title: "2024 GMC Sierra 2500 Denali", category: "truck", price: "$78,500", payment: "Est. $1,199/mo", tag: "Diesel" }
];

const vehicleGrid = document.getElementById("vehicleGrid");
const filterButtons = document.querySelectorAll(".filter");

function renderVehicles(category = "all") {
  const filteredVehicles = category === "all"
    ? vehicles
    : vehicles.filter(vehicle => vehicle.category === category);

  vehicleGrid.innerHTML = filteredVehicles.map(vehicle => `
    <article class="vehicle-card">
      <div class="vehicle-top">${vehicle.tag}</div>
      <h3>${vehicle.title}</h3>
      <div class="vehicle-meta">
        <span>${vehicle.payment}</span>
        <span>Nationwide</span>
      </div>
      <p class="price">${vehicle.price}</p>
      <a href="#contact" class="button secondary full">Request Details</a>
    </article>
  `).join("");
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    renderVehicles(button.dataset.filter);
  });
});

renderVehicles();

document.getElementById("leadForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const data = new FormData(this);
  const subject = encodeURIComponent("New Vehicle Request from VeyroxAuto.com");
  const body = encodeURIComponent(
    `Name: ${data.get("name")}\n` +
    `Phone: ${data.get("phone")}\n` +
    `Email: ${data.get("email")}\n` +
    `Monthly Budget: ${data.get("budget")}\n` +
    `Vehicle Wanted: ${data.get("vehicle")}\n\n` +
    `Message:\n${data.get("message")}`
  );

  window.location.href = `mailto:Veyroxauto@gmail.com?subject=${subject}&body=${body}`;
});
