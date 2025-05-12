import { db } from "../db.js";

export const getUserByID = async (req, res) => {
  try {
    const { user_id } = req.params;

    if (!user_id) {
      return res.status(400).send({
        error_message: "user_id must be provided",
      });
    }

    const dbQuery = await db.query("SELECT * FROM users WHERE id=$1", [
      user_id,
    ]);

    return res.status(200).send({
      content: dbQuery.rows[0],
    });
  } catch (error) {
    console.log(`Error at getUserByID(): ${error}`);
    return res.status(500).send({
      error,
    });
  }
};
