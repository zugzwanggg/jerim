import axios from "axios";
import { db } from "../db.js";
import cloudinary from "../utils/cloudinary.js";

export const getNearestCityData = async (req, res) => {
  try {
    const key = process.env.AIRVISUAL_API_KEY;
    const result = await axios.get(
      "https://api.airvisual.com/v2/nearest_city?lat=47.1167&lon=51.8833&key=" +
        key
    );

    res.status(200).json(result.data);
  } catch (error) {
    console.log("Error at getNearestCityData", error);
    res.status(500).send(error);
  }
};

export const getReports = async (req, res) => {
  try {
    const reports = await db.query("SELECT * FROM reports");

    res.json(reports.rows);
  } catch (error) {
    console.log("Error at getReports", error);
    res.status(500).send(error);
  }
};

export const getPickedLitter = async (req, res) => {
  try {
    const litters = await db.query("SELECT * FROM picked_litters");
    res.json(litters.rows);
  } catch (error) {
    console.log("Error at getPickedLitter", error);
    res.status(500).send(error);
  }
};

export const getTreePlantLocation = async (req, res) => {
  try {
    const data = await db.query("SELECT * FROM allowed_tree_locations");
    res.json(data.rows);
  } catch (error) {
    console.log("Error at getTreePlantLocation", error);
    res.status(500).send(error);
  }
};

export const sendReport = async (req, res) => {
  try {
    const { id } = req.user;
    const { lat, lng, comment } = req.body;

    if (!lat || !lng) {
      return res.status(400).json({
        message: "Lat and lng cannot be empty",
      });
    }

    await db.query(
      "INSERT INTO reports (user_id, lat, lng, comment) VALUES ($1, $2, $3, $4)",
      [id, lat, lng, comment]
    );

    res.status(200).json({
      message: "Report submited succesfully",
    });
  } catch (error) {
    console.log("Error at sendReport", error);
    res.status(500).send(error);
  }
};

export const pickLitter = async (req, res) => {
  try {
    const { id } = req.user;
    const { lat, lng, brand, description } = req.body;
    const image = req.file;
    if (!lat || !lng || !brand) {
      return res.status(400).json({
        message: "Fill all the fields",
      });
    }

    if (!image) {
      return res.status(400).json({
        message: "Image must be added",
      });
    }

    const publicId = `user_${id}_litter_${lat}_${lng}`;

    let imageUrl;
    await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: "litters",
        publicId,
        overwrite: true,
      },
      async (err, res) => {
        if (err)
          return res?.status(500).json({ error: "Cloudinary upload failed" });

        imageUrl = res?.secure_url;
      }
    );

    await db.query(
      `INSERT INTO picked_litters (user_id, lat, lng, image, brand, description, reward)
       VALUES ($1, $2, $3, $4, $5, $6, 35)
      `,
      [id, lat, lng, imageUrl, brand, description]
    );

    await db.query("UPDATE users SET points=points+35 WHERE id=$1", [id]);

    res.status(200).json({
      message: "Succesfully submited",
    });
  } catch (error) {
    console.log("Error at pickLitter", error);
    res.status(500).send(error);
  }
};

export const plantATree = async (req, res) => {
  try {
    const { id } = req.user;
    let { lat, lng } = req.body;
    const { comment } = req.body;
    const image = req.file;

    if (!lat || !lng) {
      return res.status(400).json({
        message: "Fill all the fields",
      });
    }

    if (typeof lat == "string") {
      lat = parseFloat(lat);
    }

    if (typeof lng == "string") {
      lng = parseFloat(lng);
    }

    if (!image) {
      return res.status(400).json({
        message: "Image must be added",
      });
    }
    const publicId = `user_${id}_tree_${lat}_${lng}`;

    let imageUrl;
    await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: "trees",
        publicId,
        overwrite: true,
      },
      async (err, res) => {
        if (err)
          return res?.status(500).json({ error: "Cloudinary upload failed" });

        imageUrl = res?.secure_url;
      }
    );

    await db.query(
      `INSERT INTO plants (user_id, lat, lng, image, comment, reward) VALUES ($1, $2, $3, $4, $5, 60)`,
      [id, lat, lng, imageUrl, comment]
    );

    await db.query("UPDATE users SET points=points+60 WHERE id=$1", [id]);

    res.status(200).json({
      message: "Succesfully planted",
    });
  } catch (error) {
    console.log("Error at plantATree", error);
    res.status(500).send(error);
  }
};
