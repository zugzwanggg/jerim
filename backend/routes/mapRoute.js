import { Router } from "express";
import { getPickedLitter, getReports, getTreePlantLocation, pickLitter, plantATree, sendReport } from "../controllers/mapController.js";
import { checkAuth } from "../middleware/checkAuth.js";
import { uploadImage } from "../middleware/uploadImage.js";


export const mapRoute = Router();


mapRoute.post('/reports', checkAuth, sendReport);
mapRoute.post('/litters', checkAuth, uploadImage.single('image'), pickLitter);
mapRoute.post('/trees', checkAuth, uploadImage.single('image'), plantATree)
mapRoute.get('/reports', getReports);
mapRoute.get('/litters', getPickedLitter);
mapRoute.get('/allowed', getTreePlantLocation);