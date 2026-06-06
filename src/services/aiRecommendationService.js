const PAINT_SCORE = {
  Excellent: 1,
  Good: 0.9,
  "Moderate Wear": 0.75,
  Poor: 0.55
};

const PARKING_SCORE = {
  Covered: 1,
  "Open Parking": 0.85,
  "Street Parking": 0.7
};

const FREQUENCY_SCORE = {
  Low: 1,
  Moderate: 0.9,
  High: 0.75
};

const AGE_SCORE = (vehicle) => {
  const age = new Date().getFullYear() - vehicle.year;
  if (age <= 2) return 1;
  if (age <= 5) return 0.9;
  if (age <= 10) return 0.78;
  return 0.62;
};

const getVehicleAgeCategory = (year) => {
  const age = new Date().getFullYear() - year;
  if (age <= 2) return "0-2 years";
  if (age <= 5) return "3-5 years";
  if (age <= 10) return "6-10 years";
  return "10+ years";
};

const formatINR = (amount) => `₹${amount.toLocaleString("en-IN")}`;

const buildRecommendation = ({ title, reason, priority, estimatedPrice, temporarySolution, permanentSolution }) => ({
  title,
  reason,
  priority,
  estimatedPrice: formatINR(estimatedPrice),
  temporarySolution,
  permanentSolution
});

const VEHICLE_RECOMMENDATION_MAP = [
  {
    title: "Ceramic Coating",
    match: (vehicle) => vehicle.paintCondition === "Excellent" || vehicle.paintCondition === "Good",
    reason: "Protects paint from environmental damage and enhances gloss.",
    priority: "Medium",
    estimatedPrice: 11999,
    temporarySolution: "Wash and dry the vehicle carefully, then apply a spray sealant for short-term protection.",
    permanentSolution: "Apply professional ceramic coating to lock in shine and guard against weathering."
  },
  {
    title: "Paint Correction",
    match: (vehicle) => vehicle.paintCondition === "Moderate Wear" || vehicle.paintCondition === "Poor",
    reason: "Removes swirl marks, minor scratches, and restores paint clarity.",
    priority: "High",
    estimatedPrice: 7999,
    temporarySolution: "Use a fine polish and microfiber cloth to minimize swirls temporarily.",
    permanentSolution: "Complete professional paint correction followed by protective coating."
  },
  {
    title: "Interior Detailing",
    match: (vehicle) => vehicle.drivingFrequency === "High" || vehicle.parkingCondition === "Street Parking",
    reason: "Keeps cabin surfaces clean and reduces wear from frequent use.",
    priority: "Medium",
    estimatedPrice: 4999,
    temporarySolution: "Use a quick interior wipe-down spray and vacuum the seats.",
    permanentSolution: "Book a full interior detail with fabric or leather conditioning and odor elimination."
  },
  {
    title: "Paint Protection Film (PPF)",
    match: (vehicle) => vehicle.paintCondition !== "Poor" && (vehicle.parkingCondition === "Open Parking" || vehicle.parkingCondition === "Street Parking"),
    reason: "Shields high-impact areas from stone chips and scratches.",
    priority: "High",
    estimatedPrice: 18999,
    temporarySolution: "Use a clear bra spray or protective film patches on vulnerable areas.",
    permanentSolution: "Install professional PPF on the bumper, hood, and side mirrors."
  },
  {
    title: "Headlight Restoration",
    match: (vehicle) => vehicle.paintCondition !== "Excellent" || vehicle.year <= new Date().getFullYear() - 3,
    reason: "Improves nighttime visibility and restores faded headlight clarity.",
    priority: "Medium",
    estimatedPrice: 2499,
    temporarySolution: "Clean headlight lenses with a mild polish and UV protectant spray.",
    permanentSolution: "Get professional headlight restoration and sealing to prevent future yellowing."
  },
  {
    title: "Engine Bay Detailing",
    match: (vehicle) => vehicle.mileage >= 30000 || vehicle.drivingFrequency === "High",
    reason: "Helps identify leaks early and keeps engine components clean.",
    priority: "Low",
    estimatedPrice: 3499,
    temporarySolution: "Use a safe degreaser and soft brush to clean visible engine surfaces.",
    permanentSolution: "Schedule a full engine bay detailing with a professional service center."
  }
];

const getVehicleHealthScore = (vehicle) => {
  const paintWeight = PAINT_SCORE[vehicle.paintCondition] || 0.7;
  const parkingWeight = PARKING_SCORE[vehicle.parkingCondition] || 0.74;
  const frequencyWeight = FREQUENCY_SCORE[vehicle.drivingFrequency] || 0.8;
  const ageWeight = AGE_SCORE(vehicle);

  const mileageFactor = Math.max(0.55, 1 - vehicle.mileage / 150000);
  const rawScore = 100 * paintWeight * parkingWeight * frequencyWeight * ageWeight * mileageFactor;

  return Math.min(100, Math.round(rawScore));
};

const getVehicleRecommendations = (vehicle) => {
  const ageCategory = getVehicleAgeCategory(vehicle.year);
  const baseRecommendations = VEHICLE_RECOMMENDATION_MAP.filter((item) => item.match(vehicle));

  return baseRecommendations.map((item) => {
    const priority = item.priority === "High" || ageCategory === "10+ years" ? "High" : item.priority;
    const estimatedPrice = item.estimatedPrice + (ageCategory === "10+ years" ? 2000 : 0);

    return buildRecommendation({
      title: item.title,
      reason: `${item.reason} This vehicle is ${ageCategory} old with paint condition marked as ${vehicle.paintCondition}.`,
      priority,
      estimatedPrice,
      temporarySolution: item.temporarySolution,
      permanentSolution: item.permanentSolution
    });
  });
};

const getMaintenanceAlerts = (vehicle) => {
  const alerts = [];
  const currentYear = new Date().getFullYear();
  const ageYears = currentYear - vehicle.year;

  if (vehicle.healthScore <= 70) {
    alerts.push({
      issue: "Vehicle health is below recommended levels.",
      advice: "Schedule a full service check and address recommended repairs immediately.",
      severity: "High"
    });
  }

  if (vehicle.paintCondition === "Poor") {
    alerts.push({
      issue: "Paint condition is poor.",
      advice: "Book paint correction and protection services to prevent rust and fading.",
      severity: "High"
    });
  }

  if (vehicle.parkingCondition === "Street Parking") {
    alerts.push({
      issue: "Exposure from street parking.",
      advice: "Add ceramic coating or PPF to protect against chips and pollutants.",
      severity: "Medium"
    });
  }

  if (vehicle.drivingFrequency === "High") {
    alerts.push({
      issue: "High usage detected.",
      advice: "Increase service cadence and keep a close eye on brakes and fluids.",
      severity: "Medium"
    });
  }

  if (ageYears >= 6) {
    alerts.push({
      issue: `Vehicle is ${ageYears} years old.`,
      advice: "Older vehicles benefit from more frequent preventive maintenance and component inspections.",
      severity: "Medium"
    });
  }

  return alerts;
};

export {
  getVehicleHealthScore,
  getVehicleRecommendations,
  getMaintenanceAlerts
};
