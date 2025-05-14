import { db } from "../db.js";
import { detectLitter } from "../services/googlegenai.js";

export const objectRecognition = async (req, res) => {
  try {
<<<<<<< HEAD
    res.status(200).send();
=======
    const { report_id } = req.params;

    if (!report_id) {
      return res.status(400).send({
        error_message: "Must provide report_id.",
      });
    }

    const dbResponse = await db.query(
      "SELECT * FROM picked_litters WHERE id=$1",
      [report_id]
    );

    if (dbResponse.rows.length <= 0) {
      return res.status(404).send({
        error_message: "Report not found.",
      });
    }

    const response = await detectLitter(dbResponse.rows[0].image);

    return res.status(200).send({
      response,
    });
>>>>>>> yermekov
  } catch (error) {
    console.log(`Error at objectRecognition(): ${error}`);
    res.status(500).send({
      error,
    });
  }
};
