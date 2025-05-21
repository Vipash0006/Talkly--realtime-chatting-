import { StreamChat } from "stream-chat";
import "dotenv/config";
import jwt from "jsonwebtoken";

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

// Generate Stream Video token - this uses a different format than chat tokens
export const generateStreamVideoToken = (userId) => {
  try {
    if (!apiKey || !apiSecret) {
      throw new Error("Stream API credentials are missing");
    }
    
    // Video tokens use a different format and require different permissions
    const userIdStr = userId.toString();
    
    // Create the token payload with correct permissions for video
    const payload = {
      user_id: userIdStr,
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour expiration
    };
    
    // Sign with the API secret
    const token = jwt.sign(payload, apiSecret, { algorithm: 'HS256' });
    
    if (!token) {
      throw new Error("Failed to generate video token");
    }
    
    return token;
  } catch (error) {
    console.error("Error generating Stream Video token:", error);
    throw error;
  }
};
