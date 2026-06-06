import { useState, useCallback } from "react";
import { analyzeVehicleImage } from "../services/geminiService.js";

const STATUS = {
  IDLE: "idle",
  UPLOADING: "uploading",
  ANALYZING: "analyzing",
  GENERATING: "generating",
  SUCCESS: "success",
  ERROR: "error"
};

const getErrorMessage = (error) => {
  if (!error) return "Gemini API Failure";
  const message = String(error.message || error);
  if (message.includes("Invalid Image")) return "Invalid Image";
  if (message.includes("API key") || message.includes("Gemini API")) return "Gemini API Failure";
  if (message.includes("Empty Response") || message.includes("invalid JSON")) return "Empty Response";
  return "Gemini API Failure";
};

export const useVehicleAnalysis = () => {
  const [imageFile, setImageFile] = useState(null);
  const [report, setReport] = useState(null);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [error, setError] = useState("");

  const uploadImage = useCallback((file) => {
    if (!file || !file.type?.startsWith("image/")) {
      setError("Invalid Image");
      setStatus(STATUS.ERROR);
      return;
    }

    setImageFile(file);
    setError("");
    setStatus(STATUS.UPLOADING);
  }, []);

  const clearAnalysis = useCallback(() => {
    setImageFile(null);
    setReport(null);
    setStatus(STATUS.IDLE);
    setError("");
  }, []);

  const analyze = useCallback(
    async (options = {}) => {
      if (!imageFile) {
        setError("Invalid Image");
        setStatus(STATUS.ERROR);
        return;
      }

      setError("");
      setStatus(STATUS.ANALYZING);

      try {
        const rawReport = await analyzeVehicleImage(imageFile, options);
        setStatus(STATUS.GENERATING);
        const normalizedReport = {
          ...rawReport,
          overallCondition: rawReport.overallCondition || "Needs attention",
          temporarySolutions: Array.isArray(rawReport.temporarySolutions) ? rawReport.temporarySolutions : [],
          permanentSolutions: Array.isArray(rawReport.permanentSolutions) ? rawReport.permanentSolutions : [],
          recommendedServices: Array.isArray(rawReport.recommendedServices) ? rawReport.recommendedServices : []
        };
        setReport(normalizedReport);
        setStatus(STATUS.SUCCESS);
      } catch (err) {
        setError(getErrorMessage(err));
        setStatus(STATUS.ERROR);
      }
    },
    [imageFile]
  );

  return {
    imageFile,
    report,
    status,
    error,
    uploadImage,
    analyze,
    clearAnalysis,
    STATUS
  };
};
