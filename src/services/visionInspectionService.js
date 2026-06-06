const ANALYSIS_CRITERIA = [
  "Scratches",
  "Swirl Marks",
  "Paint Oxidation",
  "Water Spots",
  "Headlight Fading",
  "Dirt Accumulation"
];

const ISSUE_TEMPLATES = [
  {
    id: "scratches",
    issue: "Scratches",
    category: "Paint & Body",
    location: "Front bumper and doors",
    severity: "Medium",
    description: "Multiple paint scratches and surface marks detected.",
    temporarySolution: "Apply a scratch removal polish and protect the area with wax.",
    permanentSolution: "Schedule professional paint correction and clear coat restoration.",
    recommendedService: "Paint correction & polishing",
    estimatedPrice: 4200
  },
  {
    id: "swirl_marks",
    issue: "Swirl Marks",
    category: "Paint & Body",
    location: "Hood and roof",
    severity: "Low",
    description: "Fine swirl marks are visible in reflective lighting.",
    temporarySolution: "Use a microfiber cloth and swirl remover fluid for a quick buff.",
    permanentSolution: "Book a full machine polishing and protective sealing service.",
    recommendedService: "Paint polishing",
    estimatedPrice: 3500
  },
  {
    id: "paint_oxidation",
    issue: "Paint Oxidation",
    category: "Paint & Body",
    location: "Roof and rear quarter panels",
    severity: "Medium",
    description: "Faded and oxidized paint is reducing surface gloss.",
    temporarySolution: "Apply a cleaning clay and wax to restore shine temporarily.",
    permanentSolution: "Perform paint decontamination, compounding, and ceramic coating.",
    recommendedService: "Paint restoration",
    estimatedPrice: 5600
  },
  {
    id: "water_spots",
    issue: "Water Spots",
    category: "Exterior",
    location: "Windshield and side panels",
    severity: "Low",
    description: "Mineral deposits from water are visible on painted surfaces.",
    temporarySolution: "Use a water spot remover spray and soft microfiber towel.",
    permanentSolution: "Get professional surface decontamination and sealing.",
    recommendedService: "Surface detailing",
    estimatedPrice: 2300
  },
  {
    id: "headlight_fading",
    issue: "Headlight Fading",
    category: "Lighting",
    location: "Front headlights",
    severity: "Medium",
    description: "Headlight lenses are yellowing and reducing nighttime visibility.",
    temporarySolution: "Clean the lenses with a headlight polish kit.",
    permanentSolution: "Book a headlight restoration and UV sealing treatment.",
    recommendedService: "Headlight restoration",
    estimatedPrice: 2800
  },
  {
    id: "dirt_accumulation",
    issue: "Dirt Accumulation",
    category: "Detailing",
    location: "Exterior panels and wheel wells",
    severity: "Low",
    description: "Layered dirt and grime is building up on visible surfaces.",
    temporarySolution: "Wash the vehicle thoroughly and vacuum the interior.",
    permanentSolution: "Schedule a professional deep detailing session.",
    recommendedService: "Complete detailing",
    estimatedPrice: 2000
  }
];

const severityScoreMap = {
  Low: 8,
  Medium: 15,
  High: 25
};

const getSeverityLevel = (score) => {
  if (score >= 80) return "Low";
  if (score >= 60) return "Medium";
  return "High";
};

const hashString = (value = "") => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

const buildDetectedIssues = (seed) => {
  const selectedCount = 3 + (seed % 4);
  return ISSUE_TEMPLATES.slice(0, selectedCount).map((issue, index) => ({
    ...issue,
    severity: issue.severity,
    estimatedPrice: issue.estimatedPrice + index * 250
  }));
};

const calculateHealthScore = (issues) => {
  const deduction = issues.reduce((sum, issue) => sum + (severityScoreMap[issue.severity] || 10), 0);
  const rawScore = Math.max(0, 100 - deduction);
  return Math.round(rawScore);
};

const formatINR = (value) => {
  if (typeof value !== "number" || Number.isNaN(value)) return "₹0";
  return `₹${value.toLocaleString("en-IN")}`;
};

const simulateImageAnalysis = async ({ image, vehicleType }) => {
  const seed = hashString(`${image.name}-${image.size}-${vehicleType}`);
  const detectedIssues = buildDetectedIssues(seed);
  const healthScore = calculateHealthScore(detectedIssues);
  const severityLevel = getSeverityLevel(healthScore);
  const totalEstimatedPrice = detectedIssues.reduce((sum, issue) => sum + issue.estimatedPrice, 0);

  return {
    imageName: image.name,
    vehicleType,
    healthScore,
    severityLevel,
    analyzedAt: new Date().toISOString(),
    analyzedCriteria: ANALYSIS_CRITERIA,
    detectedIssues,
    summary: `Detected ${detectedIssues.length} issue${detectedIssues.length === 1 ? "" : "s"} in the uploaded vehicle image.`,
    temporarySolutions: detectedIssues.map((issue) => issue.temporarySolution),
    permanentSolutions: detectedIssues.map((issue) => issue.permanentSolution),
    recommendedServices: Array.from(new Set(detectedIssues.map((issue) => issue.recommendedService))),
    estimatedPricing: detectedIssues.map((issue) => ({
      issue: issue.issue,
      price: formatINR(issue.estimatedPrice)
    })),
    totalEstimatedPrice: formatINR(totalEstimatedPrice)
  };
};

const analyzeWithGeminiVision = async ({ image, vehicleType }) => {
  throw new Error("Gemini Vision adapter is not configured yet. Set the adapter in visionInspectionService.js.");
};

const adapters = {
  simulated: simulateImageAnalysis,
  gemini: analyzeWithGeminiVision
};

const DEFAULT_ADAPTER = "simulated";

const analyzeVehicleImage = async ({ image, vehicleType = "car" }) => {
  if (!image) {
    throw new Error("No vehicle image provided for inspection.");
  }
  return adapters[DEFAULT_ADAPTER]({ image, vehicleType });
};

export {
  analyzeVehicleImage,
  calculateHealthScore,
  getSeverityLevel
};
