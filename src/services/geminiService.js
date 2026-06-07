import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const DEFAULT_MODEL = import.meta.env.VITE_GEMINI_MODEL || "gemini-2.5-flash";

const REQUIRED_ROOT_KEYS = [
  "healthScore",
  "overallCondition",
  "issues",
  "temporarySolutions",
  "permanentSolutions",
  "recommendedServices",
  "estimatedPriceRange"
];

const SUPPORTED_SEVERITIES = ["Low", "Medium", "High"];

const getBase64FromFile = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== "string") {
        reject(new Error("Unable to convert image to Base64."));
        return;
      }
      const commaIndex = result.indexOf(",");
      resolve(commaIndex >= 0 ? result.slice(commaIndex + 1) : result);
    };
    reader.onerror = () => reject(new Error("Unable to read the image file."));
    reader.readAsDataURL(file);
  });

const extractJsonObject = (text) => {
  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");
  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    throw new Error("Gemini returned an invalid JSON response.");
  }
  const jsonText = text.slice(firstBrace, lastBrace + 1);
  try {
    return JSON.parse(jsonText);
  } catch (error) {
    throw new Error("Gemini returned malformed JSON.");
  }
};

const validateGeminiResponse = (payload) => {
  if (!payload || typeof payload !== "object") {
    throw new Error("Empty Response");
  }

  const missing = REQUIRED_ROOT_KEYS.filter((key) => !(key in payload));
  if (missing.length) {
    throw new Error("Gemini returned incomplete data.");
  }

  if (!Array.isArray(payload.issues)) {
    throw new Error("Gemini issues response must be an array.");
  }

  payload.issues.forEach((issue) => {
    if (!issue || typeof issue !== "object") {
      throw new Error("Gemini returned invalid issue data.");
    }
    if (typeof issue.issue !== "string" || !issue.issue.trim()) {
      throw new Error("Gemini issue missing required fields.");
    }
    if (!SUPPORTED_SEVERITIES.includes(issue.severity)) {
      throw new Error("Gemini returned unsupported severity.");
    }
    if (typeof issue.confidence !== "number") {
      throw new Error("Gemini issue confidence must be a number.");
    }
  });

  if (!Array.isArray(payload.temporarySolutions) || !Array.isArray(payload.permanentSolutions) || !Array.isArray(payload.recommendedServices)) {
    throw new Error("Gemini returned invalid array fields.");
  }

  return {
    ...payload,
    healthScore: Number(payload.healthScore),
    estimatedPriceRange: String(payload.estimatedPriceRange),
    issues: payload.issues.map((issue) => ({
      ...issue,
      issue: String(issue.issue),
      severity: String(issue.severity),
      confidence: Number(issue.confidence)
    }))
  };
};

const createGeminiClient = () => {
  if (!GEMINI_API_KEY) {
    throw new Error("Gemini API key is not configured. Add VITE_GEMINI_API_KEY to your environment.");
  }

  return new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
};

const buildGeminiPrompt = (base64Data, mimeType) => {
  return `You are a vehicle detailing expert. Analyze the attached vehicle image and return ONLY a valid JSON object using this schema:\n{\n  "healthScore": 0,\n  "overallCondition": "",\n  "issues": [\n    {\n      "issue": "",\n      "severity": "",\n      "confidence": 0\n    }\n  ],\n  "temporarySolutions": [],\n  "permanentSolutions": [],\n  "recommendedServices": [],\n  "estimatedPriceRange": ""\n}\nDo not include any explanation, markdown, or additional text.\nAnalyze the image for scratches, swirl marks, paint oxidation, water spots, headlight fading, paint fading, and dirt accumulation.\nImage data: data:${mimeType};base64,${base64Data}`;
};

export const analyzeVehicleImage = async (imageFile, options = {}) => {
  if (!imageFile || !imageFile.type?.startsWith("image/")) {
    throw new Error("Invalid Image");
  }

  const client = createGeminiClient();
  const base64Data = await getBase64FromFile(imageFile);
  const prompt = buildGeminiPrompt(base64Data, imageFile.type);
  const model = options.model || DEFAULT_MODEL;

  const response = await client.models.generateContent({
    model,
    contents: prompt
  });

  const rawOutput = response?.text;
  if (!rawOutput || typeof rawOutput !== "string") {
    throw new Error("Empty Response");
  }

  const parsed = extractJsonObject(rawOutput);
  return validateGeminiResponse(parsed);
};

export const GEMINI_MODELS = {
  flash: "gemini-2.5-flash",
  flash25: "gemini-2.5-flash",
  proVision: "gemini-pro-vision"
};
