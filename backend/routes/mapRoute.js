import { Router } from "express";
import { getPickedLitter, getReports, getTreePlantLocation, pickLitter, plantATree, sendReport } from "../controllers/mapController.js";
import { checkAuth } from "../middleware/checkAuth.js";


export const mapRoute = Router();


mapRoute.post('/reports', checkAuth, sendReport);
mapRoute.post('/litters', checkAuth, pickLitter);
mapRoute.post('/trees', checkAuth, plantATree)
mapRoute.get('/reports', getReports);
mapRoute.get('/litters', getPickedLitter);
mapRoute.get('/allowed', getTreePlantLocation);