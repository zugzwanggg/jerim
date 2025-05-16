import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Award,
  Mail,
  Leaf,
  TreePine,
  CalendarDays,
  Trash,
  CircleAlert,
  Pencil,
} from "lucide-react";
import axios from "axios";
import { formatDistanceToNowStrict } from "date-fns";
import EditImage from "@/components/EditImage";
import { useAppSelector } from "@/hooks/hooks";

interface IUser {
  id: number | string;
  username: string;
  email: string;
  avatar: string;
  created_at: string;
  points: number;
  plants: number;
  ranking: number;
}

interface IActivity {
  id: number;
  user_id: number;
  comment: string;
  description: string;
  created_at: string;
  activity_type: string;
  reward: number;
}

const ProfilePage = () => {
  const { id } = useParams();
  const userId = id ? parseInt(id) : null;
  const { user } = useAppSelector((state) => state.user);

  const [userData, setUserData] = useState<null | IUser>(null);
  const [username, setUsername] = useState(userData?.username);
  const [avatar, setAvatar] = useState<File | null | string>(null);
  const [email, setEmail] = useState(userData?.email);
  const [createdAt, setCreatedAt] = useState<Date | undefined>(undefined);
  const [points, setPoints] = useState<number>(0);
  const [plants, setPlants] = useState<number>(0);
  const [position, setPosition] = useState<number>(0);

  const [activities, setActivities] = useState([]);

  const [isEdit, setIsEdit] = useState(false);
  const [isAvatarEdit, setIsAvatarEdit] = useState(false);
  const [isUsernameEdit, setIsUsernameEdit] = useState(false);

  const [usernameErr, setUsernameErr] = useState("");

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const fetchUserData = async () => {
    try {
      const response: IUser = (
        await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/user/${userId}`
        )
      ).data;

      setUserData(response);
      setUsername(response?.username);
      setAvatar(response.avatar);
      setEmail(response?.email);
      setCreatedAt(new Date(response.created_at));
      setPoints(response?.points);
      setPlants(response?.plants);
      setPosition(response?.ranking);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserActivities = async () => {
    try {
      const recentActivity = (
        await axios.get(
          `${
            import.meta.env.VITE_BACKEND_BASE_URL
          }/api/user/${userId}/recent_activity`
        )
      ).data;

      setActivities(recentActivity);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAvatarChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    if (!avatar) {
      return alert("Select an image");
    }

    formData.append("avatar", avatar);

    try {
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/user/${id}/edit_avatar`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setIsAvatarEdit(false);
    } catch (error) {
      console.log(error);
    } finally {
      window.location.reload();
    }
  };

  const handleUsernameChange = async () => {
    if (!username) {
      return alert("Type in a new username");
    }

    try {
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/user/${id}/edit_username`,
        {
          username: username,
        }
      );

      setIsUsernameEdit(false);
      window.location.reload();
    } catch (error: any) {
      console.log(error);
      setUsernameErr(error.response?.data?.message);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        fetchUserData();
        fetchUserActivities();
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, []);

  console.log(activities);

  if (!userId) {
    return (
      <div className="pt-32 md:pt-20 px-4 md:px-6">
        <h1 className="text-2xl font-bold text-white">User not found</h1>
      </div>
    );
  }

  return (
    <div className="pt-32 md:pt-20 px-4 md:px-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {isAvatarEdit && user?.id == id ? (
          <EditImage
            handleSave={handleAvatarChange}
            image={avatar}
            setIsEdit={setIsAvatarEdit}
            setImage={setAvatar}
          />
        ) : (
          ""
        )}

        {user?.id == id ? (
          <button
            onClick={() => setIsEdit((prev) => !prev)}
            className="p-2 px-4 mb-4 bg-black dark:bg-darkSecondary text-white text-sm md:text-base font-medium rounded-full"
          >
            {isEdit ? "Cancel" : "Edit Profile"}
          </button>
        ) : (
          ""
        )}
        <div className="bg-dark-secondary rounded-2xl p-6 md:p-8 shadow-lg">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Ava */}
            <div className="relative">
              <img
                src={userData?.avatar}
                alt={username}
                className="w-32 h-32 rounded-full object-cover border-4 border-primary-green/30"
              />
              {isEdit && user?.id == id ? (
                <div className="absolute top-0 right-0 hover:opacity-50 p-2 rounded-full bg-primary-green">
                  <Pencil
                    onClick={() => setIsAvatarEdit(true)}
                    size={20}
                    className=""
                  />
                </div>
              ) : (
                ""
              )}
              <div className="absolute -bottom-2 -right-2 bg-primary-green rounded-full p-2">
                <Award className="w-6 h-6 text-black" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              {isUsernameEdit ? (
                <label className="w-full">
                  <small className="uppercase text-zinc-500 font-semibold text-xs mt-3">
                    Username:
                  </small>
                  {usernameErr.length > 0 ? (
                    <p className="text-red-500">{usernameErr}</p>
                  ) : (
                    ""
                  )}
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    type="text"
                    className="w-full text-white text-sm md:text-xl font-bold mb-3 p-2 outline-none border-b rounded-md"
                  />
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        setIsUsernameEdit(false);
                      }}
                      className="py-2 px-4 rounded-2 rounded-3xl hover:bg-dark-color"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleUsernameChange()}
                      className="py-2 px-8 rounded-2 rounded-3xl bg-dark-color text-white hover:opacity-75"
                    >
                      Save Changes
                    </button>
                  </div>
                </label>
              ) : (
                <div className="flex gap-2">
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {userData?.username}
                  </h1>
                  {isEdit && user?.id == id ? (
                    <Pencil
                      onClick={() => setIsUsernameEdit(true)}
                      size={20}
                      className="hover-opacity-50"
                    />
                  ) : (
                    ""
                  )}
                </div>
              )}

              <div className="flex flex-wrap flex-col md:justify-start gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4" />
                  <span>
                    Member since:{" "}
                    {createdAt ? formatDate(createdAt) : "Unknown"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-dark-secondary rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <Leaf className="w-6 h-6 text-primary-green" />
              <h3 className="text-xl font-semibold text-white">Points</h3>
            </div>
            <p className="text-3xl font-bold text-white">
              {points !== null ? points : "N/A"}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Total Contribution Points
            </p>
          </div>

          <div className="bg-dark-secondary rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <TreePine className="w-6 h-6 text-primary-green" />
              <h3 className="text-xl font-semibold text-white">
                Trees Planted
              </h3>
            </div>
            <p className="text-3xl font-bold text-white">
              {plants !== null ? plants : "N/A"}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Trees Planted Through Contributions
            </p>
          </div>

          <div className="bg-dark-secondary rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-6 h-6 text-primary-green" />
              <h3 className="text-xl font-semibold text-white">Rank</h3>
            </div>
            <p className="text-3xl font-bold text-white">#{position}</p>
            <p className="text-sm text-gray-400 mt-1">
              Current Global Leaderboard Position
            </p>
          </div>
        </div>

        {/* Activity */}
        <div className="mt-6 bg-dark-secondary rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {activities.length > 0 ? (
              activities.map((item: IActivity) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-3 rounded-lg bg-dark-color/50"
                >
                  <div className="w-10 h-10 rounded-full bg-primary-green/20 flex items-center justify-center">
                    {item.activity_type == "tree_plant" ? (
                      <Leaf className="w-5 h-5 text-primary-green" />
                    ) : item.activity_type == "picked_litter" ? (
                      <Trash className="w-5 h-5 text-primary-green" />
                    ) : (
                      <CircleAlert className="w-5 h-5 text-primary-green" />
                    )}
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      {item.comment || item.description}
                    </p>
                    <p className="text-sm text-gray-400">
                      {item.reward !== 0
                        ? `Earned ${item.reward} points`
                        : "No points Earned"}
                    </p>
                  </div>
                  <div className="ml-auto text-sm text-gray-400">
                    {formatDistanceToNowStrict(new Date(item.created_at), {
                      addSuffix: true,
                    })}
                  </div>
                </div>
              ))
            ) : (
              <p>{username} has not made any contributions yet :(</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
