import { Router } from "express";
import { getPickedLitter, getReports, getTreePlantLocation } from "../controllers/mapController.js";


export const mapRoute = Router();

mapRoute.get('/reports', getReports);
mapRoute.get('/litters', getPickedLitter);
mapRoute.get('/allowed', getTreePlantLocation);