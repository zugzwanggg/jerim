import { db } from "../db.js";
import cloudinary from "../utils/cloudinary.js";

export const getUserByID = async (req, res) => {
  try {
    const { user_id } = req.params;

    if (!user_id) {
      return res.status(400).send({
        error_message: "user_id must be provided",
      });
    }

    const userData = await db.query(
      "SELECT id, username, email, avatar, created_at, points FROM users WHERE id=$1",
      [user_id]
    );

    const userPlants = await db.query(
      "SELECT COUNT(*) FROM plants WHERE user_id=$1",
      [user_id]
    );

    const userRank = await db.query(
      "SELECT rank_num FROM (SELECT id, RANK() OVER (ORDER BY points DESC) AS rank_num FROM users) AS ranked_users WHERE id=$1",
      [user_id]
    );

    userData.rows[0].plants = parseInt(userPlants.rows[0]?.count);
    userData.rows[0].ranking = parseInt(userRank.rows[0]?.rank_num);

    return res.status(200).send(userData.rows[0]);
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

export const editAvatar = async (req, res) => {
  try {
    const { user_id } = req.params;
    const file = req.file;
    const { avatar } = req.user;

    if (!file) {
      return res.status(400).send({
        message: "Image file must be provided",
      });
    }

    const publicId = `user_${user_id}_avatar`;

    if (avatar !== null) {
      await cloudinary.uploader.destroy(publicId);
    }

    await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: "avatars",
        public_id: publicId,
        overwrite: true,
      },
      async (err, res) => {
        if (err) {
          return res?.status(500).send({
            error_message: "Cloudinary upload failed",
          });
        }

        await db.query("UPDATE users SET avatar=$1 WHERE id=$2", [
          res?.secure_url,
          user_id,
        ]);
      }
    );

    return res.status(200).send({
      message: "Succesfully updated user avatar",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error,
    });
  }
};

export const getGlobalLeaderboard = async (req, res) => {
  try {
    const dbQuery = await db.query(
      "SELECT id, username, avatar, points, RANK() OVER (ORDER BY points DESC) as rank_num FROM users ORDER BY points DESC LIMIT 100;"
    );

    return res.status(200).send(dbQuery.rows);
  } catch (error) {
    console.log(`Error at getGlobalLeaderboard(): ${error}`);
    console.log(error);
    return res.status(500).send({
      error,
    });
  }
};

export const getRecentActivity = async (req, res) => {
  try {
    const { user_id } = req.params;

    if (!user_id) {
      return res.status(400).send({
        error_message: "Must provide user_id",
      });
    }

    const dbQuery = await db.query(
      `WITH combined_activities AS (
        SELECT id, user_id, comment, created_at, reward, 'report' AS activity_type FROM reports WHERE user_id = $1
        UNION ALL
        SELECT id, user_id, description, created_at, reward, 'picked_litter' AS activity_type FROM picked_litters WHERE user_id = $1
        UNION ALL
        SELECT id, user_id, comment, created_at, reward, 'tree_plant' AS activity_type FROM plants WHERE user_id = $1
      )
      SELECT id, user_id, comment, created_at, activity_type
      FROM combined_activities
      ORDER BY created_at DESC
      LIMIT 3;`,
      [user_id]
    );

    return res.status(200).send(dbQuery.rows);
  } catch (error) {
    console.log(`Error at getRecentActivity(): ${error}`);
    console.log(error);
    return res.status(500).send({
      error,
    });
  }
};

export const searchUsers = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      const response = await db.query(
        "SELECT id, username, avatar, points FROM users"
      );
      return res.status(200).send(response.rows);
    }

    const response = await db.query(
      "SELECT id, username, avatar, points FROM users WHERE LOWER(username) LIKE LOWER($1)",
      [`%${q.toLowerCase()}%`]
    );

    return res.status(200).send(response.rows);
  } catch (error) {
    console.log(`Error at searchUsers(): ${error}`);
    console.log(error);
    return res.status(500).send({
      error,
    });
  }
};
