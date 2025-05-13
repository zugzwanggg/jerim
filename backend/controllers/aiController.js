import { db } from "../db.js";
import { detectLitter } from "../services/googlegenai.js";

export const objectRecognition = async (req, res) => {
  try {
    res.status(200).send();
  } catch (error) {
    console.log(`Error at objectRecognition(): ${error}`);
    res.status(500).send({
      error,
    });
  }
};
