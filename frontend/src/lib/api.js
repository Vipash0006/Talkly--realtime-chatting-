import { axiosInstance } from "./axios";

export const signup = async (signupData) => {
  const response = await axiosInstance.post("/api/auth/signup", signupData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const login = async (loginData) => {
  const response = await axiosInstance.post("/api/auth/login", loginData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const logout = async () => {
  localStorage.removeItem('token');
  const response = await axiosInstance.post("/api/auth/logout");
  return response.data;
};

export const getAuthUser = async () => {
  console.log("Making request to get authenticated user...");
  try {
    const res = await axiosInstance.get("/api/auth/me");
    console.log("Auth user response:", res.status, res.data ? "Has user data" : "No user data");
    return res.data;
  } catch (error) {
    if (error?.response?.status !== 401) {
      console.log("Error in getAuthUser:", error);
    } else {
      console.log("User not authenticated (401)");
    }
    return null;
  }
};

export const completeOnboarding = async (userData) => {
  const response = await axiosInstance.post("/api/auth/onboarding", userData);
  return response.data;
};

export async function getUserFriends() {
  const response = await axiosInstance.get("/api/users/friends");
  return response.data;
}

export async function getRecommendedUsers() {
  const response = await axiosInstance.get("/api/users");
  return response.data;
}

export async function getOutgoingFriendReqs() {
  const response = await axiosInstance.get("/api/users/outgoing-friend-requests");
  return response.data;
}

export async function sendFriendRequest(userId) {
  const response = await axiosInstance.post(`/api/users/friend-request/${userId}`);
  return response.data;
}

export async function getFriendRequests() {
  const response = await axiosInstance.get("/api/users/friend-requests");
  return response.data;
}

export async function acceptFriendRequest(requestId) {
  const response = await axiosInstance.put(`/api/users/friend-request/${requestId}/accept`);
  return response.data;
}

export async function getStreamToken() {
  console.log("Making request to get Stream token...");
  try {
    const response = await axiosInstance.get("/api/chat/token");
    console.log("Stream token response:", response.status, response.data ? "Has token" : "No token data");
    return response.data;
  } catch (error) {
    console.error("Error getting Stream token:", error);
    throw error;
  }
}

export async function getStreamVideoToken() {
  console.log("Making request to get Stream video token...");
  try {
    const response = await axiosInstance.get("/api/chat/video-token");
    console.log("Stream video token response:", response.status, response.data ? "Has token" : "No token data");
    return response.data;
  } catch (error) {
    console.error("Error getting Stream video token:", error);
    throw error;
  }
}
