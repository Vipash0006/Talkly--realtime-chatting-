import { generateStreamToken } from "../lib/stream.js";

export async function getStreamToken(req, res) {
  try {
    if (!req.user?._id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const token = generateStreamToken(req.user._id);
    
    if (!token) {
      return res.status(500).json({ message: "Failed to generate chat token" });
    }

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error in getStreamToken controller:", error);
    res.status(500).json({ 
      message: "Failed to generate chat token",
      error: error.message 
    });
  }
}
