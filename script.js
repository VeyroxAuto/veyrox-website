const steps = Array.from(document.querySelectorAll(".wizard-step"));
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");
const stepLabel = document.getElementById("stepLabel");
const stepTitle = document.getElementById("stepTitle");
const progressFill = document.getElementById("progressFill");
const wizard = document.getElementById("vehicleWizard");
const resultCard = document.getElementById("wizardResult");
const emailLeadBtn = document.getElementById("emailLeadBtn");

let currentStep = 0;

const titles = [
  "Vehicle Type",
  "Monthly Payment",
  "Desired Vehicle",
  "Trade-In",
  "Budget & Location",
  "Must-Have Features",
  "Contact Info"
];

function updateWizard() {
  steps.forEach((step, index) => step.classList.toggle("active", index === currentStep));
  stepLabel.textContent = `Step ${currentStep + 1} of ${steps.length}`;
  stepTitle.textContent = titles[currentStep];
  progressFill.style.width = `${((currentStep + 1) / steps.length) * 100}%`;
  prevBtn.style.visibility = currentStep === 0 ? "hidden" : "visible";
  nextBtn.classList.toggle("hidden", currentStep === steps.length - 1);
  submitBtn.classList.toggle("hidden", currentStep !== steps.length - 1);
}

function validateStep() {
  const activeStep = steps[currentStep];
  const requiredFields = Array.from(activeStep.querySelectorAll("[required]"));
  for (const field of requiredFields) {
    if (field.type === "radio") {
      const group = activeStep.querySelectorAll(`input[name="${field.name}"]`);
      if (![...group].some(radio => radio.checked)) {
        alert("Please select an option before continuing.");
        return false;
      }
    } else if (!field.value.trim()) {
      field.focus();
      alert("Please complete this field before continuing.");
      return false;
    }
  }
  return true;
}

nextBtn.addEventListener("click", () => {
  if (!validateStep()) return;
  if (currentStep < steps.length - 1) {
    currentStep++;
    updateWizard();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep--;
    updateWizard();
  }
});

wizard.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!validateStep()) return;

  const data = new FormData(wizard);
  const subject = encodeURIComponent("Find My Vehicle Request - VeyroxAuto.com");
  const body = encodeURIComponent(
`NEW VEYROX VEHICLE REQUEST

Vehicle Type: ${data.get("vehicleType")}
Monthly Budget: ${data.get("monthlyBudget")}
Desired Vehicle: ${data.get("desiredVehicle")}
New/Used Preference: ${data.get("newUsed")}
Preferred Year Range: ${data.get("preferredYear")}

Trade-In: ${data.get("hasTrade")}
Trade Details: ${data.get("tradeDetails")}

Down Payment: ${data.get("downPayment")}
ZIP Code: ${data.get("zipCode")}
Credit Range: ${data.get("creditRange")}
Timeline: ${data.get("timeline")}

Must-Have Features:
${data.get("features")}

Customer:
Name: ${data.get("name")}
Phone: ${data.get("phone")}
Email: ${data.get("email")}

Extra Notes:
${data.get("extraNotes")}
`
  );

  emailLeadBtn.href = `mailto:Veyroxauto@gmail.com?subject=${subject}&body=${body}`;
  wizard.classList.add("hidden");
  resultCard.classList.remove("hidden");
  resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
});

updateWizard();