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