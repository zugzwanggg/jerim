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

export const editUsername = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { username } = req.body;

    if (!user_id || !username) {
      return res.status(400).send({
        error_message: "user_id and username must be provided",
      });
    }

    const checkIfUserExists = await db.query(
      "SELECT * FROM users WHERE id=$1",
      [user_id]
    );

    if (checkIfUserExists.rows.length <= 0) {
      return res.status(404).send({
        error_message: "User not found",
      });
    }

    const changeUsername = await db.query(
      "UPDATE users SET username=$1 WHERE id=$2",
      [username, user_id]
    );

    return res.status(200).send({
      message: "Username changed succesfully",
    });
  } catch (error) {
    console.log(`Error at editUsername(): ${error}`);
    return res.status(500).send({
      error,
    });
  }
};
