import { db } from "../db.js";

export const getReports = async (req,res) => {
  try {
    const reports = await db.query("SELECT * FROM reports");
    
    res.json(reports.rows)
  } catch (error) {
    console.log('Error at getReports', error);
    res.status(500).send(error)
  }
}

export const getPickedLitter = async (req,res) => {
  try {

    const litters = await db.query("SELECT * FROM picked_litters");
    res.json(litters.rows)
    
  } catch (error) {
    console.log('Error at getPickedLitter', error);
    res.status(500).send(error)
  }
}

export const getTreePlantLocation = async (req,res) => {
  try {

    const data = await db.query("SELECT * FROM allowed_tree_locations");
    res.json(data.rows)
    
  } catch (error) {
    console.log('Error at getTreePlantLocation', error);
    res.status(500).send(error)
  }
}