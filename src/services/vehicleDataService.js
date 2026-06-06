import { vehicles } from "../data/vehicles";
import {
  getVehicleHealthScore,
  getVehicleRecommendations,
  getMaintenanceAlerts
} from "./aiRecommendationService";

const getAllVehicles = () => vehicles.map((vehicle) => ({
  ...vehicle,
  healthScore: getVehicleHealthScore(vehicle)
}));

const getVehicleById = (id) => {
  const vehicle = vehicles.find((item) => item.id === id);
  return vehicle ? { ...vehicle, healthScore: getVehicleHealthScore(vehicle) } : null;
};

const searchVehicles = ({ brand, model, vehicleType, minHealthScore, maxMileage } = {}) => {
  return getAllVehicles().filter((vehicle) => {
    if (brand && vehicle.brand.toLowerCase() !== brand.toLowerCase()) return false;
    if (model && vehicle.model.toLowerCase() !== model.toLowerCase()) return false;
    if (vehicleType && vehicle.vehicleType.toLowerCase() !== vehicleType.toLowerCase()) return false;
    if (typeof minHealthScore === "number" && vehicle.healthScore < minHealthScore) return false;
    if (typeof maxMileage === "number" && vehicle.mileage > maxMileage) return false;
    return true;
  });
};

const getVehicleInsights = (vehicle) => {
  const healthScore = getVehicleHealthScore(vehicle);
  return {
    ...vehicle,
    healthScore,
    recommendations: getVehicleRecommendations(vehicle),
    maintenanceAlerts: getMaintenanceAlerts({
      ...vehicle,
      healthScore
    })
  };
};

const addVehicle = (newVehicle) => {
  const normalizedVehicle = {
    ...newVehicle,
    id: newVehicle.id || `veh-${String(vehicles.length + 1).padStart(3, "0")}`,
    healthScore: getVehicleHealthScore(newVehicle)
  };
  vehicles.push(normalizedVehicle);
  return normalizedVehicle;
};

const updateVehicle = (id, updates) => {
  const index = vehicles.findIndex((item) => item.id === id);
  if (index === -1) return null;
  const updatedVehicle = {
    ...vehicles[index],
    ...updates,
    healthScore: getVehicleHealthScore({ ...vehicles[index], ...updates })
  };
  vehicles[index] = updatedVehicle;
  return updatedVehicle;
};

export {
  getAllVehicles,
  getVehicleById,
  searchVehicles,
  getVehicleInsights,
  addVehicle,
  updateVehicle
};
