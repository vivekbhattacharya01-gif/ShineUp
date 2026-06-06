import cars from "../data/cars_ds_combined.json";

const normalizeString = (value) => (typeof value === "string" ? value.trim().toLowerCase() : "");

const getAllCars = () => cars;

const getCarById = (id) => cars.find((car) => car.id === id) || null;

const searchCars = ({ make, model, variant, fuelType, bodyType, minPrice, maxPrice, drivetrain } = {}) => {
  const makeFilter = normalizeString(make);
  const modelFilter = normalizeString(model);
  const variantFilter = normalizeString(variant);
  const fuelFilter = normalizeString(fuelType);
  const bodyFilter = normalizeString(bodyType);
  const drivetrainFilter = normalizeString(drivetrain);

  return cars.filter((car) => {
    if (makeFilter && !normalizeString(car.make).includes(makeFilter)) return false;
    if (modelFilter && !normalizeString(car.model).includes(modelFilter)) return false;
    if (variantFilter && !normalizeString(car.variant).includes(variantFilter)) return false;
    if (fuelFilter && !normalizeString(car.fuelType).includes(fuelFilter)) return false;
    if (bodyFilter && !normalizeString(car.bodyType).includes(bodyFilter)) return false;
    if (drivetrainFilter && !normalizeString(car.drivetrain).includes(drivetrainFilter)) return false;
    if (typeof minPrice === "number" && (car.exShowroomPrice === null || car.exShowroomPrice < minPrice)) return false;
    if (typeof maxPrice === "number" && (car.exShowroomPrice === null || car.exShowroomPrice > maxPrice)) return false;
    return true;
  });
};

const getCarSources = () => Array.from(new Set(cars.map((car) => car.source)));

export { getAllCars, getCarById, searchCars, getCarSources };
