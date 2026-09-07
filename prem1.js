import axios from "axios";

const getPlayerIdByUsername = async (username) => {
  try {
    const response = await axios.post(
      "https://users.roblox.com/v1/usernames/users",
      {
        usernames: [username],
        excludeBannedUsers: false, // Set to true to exclude banned users
      }
    );

    if (response.data && response.data.data.length > 0) {
      const player = response.data.data[0]; // First matching user
      console.log(`Player ID for ${username}:`, player.id);
      return player.id;
    } else {
      console.log("User not found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching player ID:", error);
  }
  s;
};

// Example usage
getPlayerIdByUsername("54_xyz");

// https://api.rolimons.com/players/v1/playerinfo/178203375
// https://api.rolimons.com/players/v1/playerassets/5479453558
// https://api.rolimons.com/items/v1/itemdetails
