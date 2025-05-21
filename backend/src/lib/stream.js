import { StreamChat } from "stream-chat";
import "dotenv/config";

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error("Stream API key or Secret is missing");
  console.error("API Key:", apiKey);
  console.error("API Secret:", apiSecret ? "Present" : "Missing");
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUsers([userData]);
    return userData;
  } catch (error) {
    console.error("Error upserting Stream user:", error);
    throw error; // Re-throw to handle in the controller
  }
};

export const generateStreamToken = (userId) => {
  try {
    if (!apiKey || !apiSecret) {
      throw new Error("Stream API credentials are missing");
    }
    
    // ensure userId is a string
    const userIdStr = userId.toString();
    const token = streamClient.createToken(userIdStr);
    
    if (!token) {
      throw new Error("Failed to generate token");
    }
    
    return token;
  } catch (error) {
    console.error("Error generating Stream token:", error);
    throw error; // Re-throw to handle in the controller
  }
};
