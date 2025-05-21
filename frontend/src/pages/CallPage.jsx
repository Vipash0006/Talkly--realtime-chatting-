import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";

import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import toast from "react-hot-toast";
import PageLoader from "../components/PageLoader";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

// Debug check if STREAM_API_KEY is defined
if (!STREAM_API_KEY) {
  console.error("STREAM_API_KEY is not defined in environment variables. Video calls will not work.");
} else {
  console.log("STREAM_API_KEY is defined (first few chars):", STREAM_API_KEY.substring(0, 4) + "...");
}

const CallPage = () => {
  const { callId } = useParams();
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);
  const [error, setError] = useState(null);
  const [debugState, setDebugState] = useState("Starting");

  // For debugging
  console.log("URL parameters:", useParams());
  console.log("callId from URL:", callId);

  const { authUser, isLoading } = useAuthUser();
  const navigate = useNavigate();

  // Use the regular chat token since it's the same for both chat and video
  const { data: tokenData, isLoading: tokenLoading, error: tokenError } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  // Add more debugging for token data
  useEffect(() => {
    console.log("Token data:", tokenData);
    console.log("Token error:", tokenError);
    console.log("Auth user:", authUser);
  }, [tokenData, tokenError, authUser]);

  useEffect(() => {
    const initCall = async () => {
      try {
        setDebugState("Checking prerequisites");
        if (!STREAM_API_KEY) {
          throw new Error("Stream API Key is not configured");
        }

        if (tokenLoading) {
          console.log("Token is still loading, waiting...");
          setDebugState("Waiting for token");
          return; // Don't proceed until token is loaded
        }

        if (tokenError) {
          console.error("Token fetch error:", tokenError);
          throw new Error(`Failed to fetch token: ${tokenError.message}`);
        }

        if (!tokenData?.token) {
          console.error("No token in response data:", tokenData);
          throw new Error("No Stream token available");
        }

        if (!authUser) {
          throw new Error("User not authenticated");
        }

        if (!callId) {
          throw new Error("No call ID provided");
        }

        setDebugState("Creating user object");
        const user = {
          id: authUser._id,
          name: authUser.fullName || "User",
          image: authUser.profilePic || "",
        };
        console.log("User object:", user);

        setDebugState("Creating video client");
        let videoClient;
        try {
          videoClient = new StreamVideoClient({
            apiKey: STREAM_API_KEY,
            user: user,
            token: tokenData.token,
          });
          console.log("Video client created successfully");
        } catch (e) {
          console.error("Failed to create video client:", e);
          throw new Error(`Failed to create video client: ${e.message}`);
        }

        setDebugState("Creating call object");
        let callInstance;
        try {
          callInstance = videoClient.call("default", callId);
          console.log("Call object created successfully");
        } catch (e) {
          console.error("Failed to create call object:", e);
          throw new Error(`Failed to create call: ${e.message}`);
        }

        setDebugState("Joining call");
        try {
          await callInstance.join({ create: true });
          console.log("Joined call successfully");
        } catch (e) {
          console.error("Failed to join call:", e);
          throw new Error(`Failed to join call: ${e.message}`);
        }

        setDebugState("Setting state");
        setClient(videoClient);
        setCall(callInstance);
      } catch (error) {
        console.error("Error in call initialization:", error);
        setError(error.message || "Could not join the call");
        toast.error(error.message || "Could not join the call");
      } finally {
        setIsConnecting(tokenLoading ? true : false);
      }
    };

    initCall();

    // Clean up on unmount
    return () => {
      if (client && call) {
        call.leave().catch(console.error);
      }
    };
  }, [tokenData, tokenLoading, tokenError, authUser, callId, navigate]);

  if (isLoading || isConnecting) return <PageLoader />;

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center p-6 max-w-lg">
          <h2 className="text-xl font-bold mb-4 text-error">Could not join call</h2>
          <p className="mb-4">{error}</p>
          <p className="text-sm opacity-70 mb-4">Debug state: {debugState}</p>
          <button className="btn btn-primary" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!client || !call) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center p-6 max-w-lg">
          <h2 className="text-xl font-bold mb-4">Call Initialization Failed</h2>
          <p className="mb-4">Could not initialize the video call components.</p>
          <p className="text-sm opacity-70 mb-4">Debug state: {debugState}</p>
          <div className="flex gap-4 justify-center">
            <button className="btn btn-primary" onClick={() => window.location.reload()}>
              Refresh
            </button>
            <button className="btn btn-outline" onClick={() => navigate(-1)}>
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-full h-full bg-black">
      <div className="absolute inset-0 w-full h-full bg-black">
        <StreamVideo client={client} className="w-full h-full">
          <StreamCall call={call} className="w-full h-full">
            <CallContent />
          </StreamCall>
        </StreamVideo>
      </div>
    </div>
  );
};

const CallContent = () => {
  const { useCallCallingState, useParticipants } = useCallStateHooks();
  const callingState = useCallCallingState();
  const participants = useParticipants();
  const navigate = useNavigate();

  // Log participants for debugging
  console.log("Call participants:", participants);

  useEffect(() => {
    if (callingState === CallingState.LEFT) {
      navigate("/");
    }
  }, [callingState, navigate]);

  return (
    <StreamTheme>
      <div className="absolute inset-0 flex flex-col bg-black">
        <div className="flex-grow relative bg-black w-full h-full">
          <SpeakerLayout 
            participantsBarPosition="bottom" 
            showSpeakerLabels 
            groupSameParticipant 
            className="w-full h-full"
          />
        </div>
        <div className="p-4 bg-black bg-opacity-90">
          <CallControls />
        </div>
      </div>
    </StreamTheme>
  );
};

export default CallPage;
