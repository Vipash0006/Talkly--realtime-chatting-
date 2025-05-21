import { useEffect, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getFriendRequests } from "../lib/api";
import { useNotificationStore } from "../store/useNotificationStore";
import { useLocation } from "react-router";

// Set to true to always show a notification (for testing)
const TEST_MODE = true;

export default function useNotificationPoller() {
  const queryClient = useQueryClient();
  const location = useLocation();
  const isNotificationsPage = location.pathname === "/notifications";
  const { setUnreadCount } = useNotificationStore();
  
  // Use useCallback to ensure this function's reference is stable
  const updateNotificationCount = useCallback((count) => {
    setUnreadCount(count);
  }, [setUnreadCount]);
  
  // Query for notifications at regular intervals
  const { data: friendRequests } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
    refetchInterval: 10000, // Refetch every 10 seconds for testing (changed from 30s)
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    enabled: true, // Always poll for notifications
    staleTime: 5000,
  });

  useEffect(() => {
    // If in test mode, always show a notification
    if (TEST_MODE && !isNotificationsPage) {
      console.log("TEST MODE: Setting notification count to 1");
      updateNotificationCount(1);
      return;
    }
    
    if (!friendRequests) return;
    
    const incomingRequestsCount = friendRequests.incomingReqs?.length || 0;
    const acceptedRequestsCount = friendRequests.acceptedReqs?.length || 0;
    
    // Set the unread count to the total number of current notifications
    const totalCount = incomingRequestsCount + acceptedRequestsCount;
    
    // Only update if we're not on the notifications page
    if (!isNotificationsPage) {
      console.log("Setting unread count to:", totalCount, "notifications");
      updateNotificationCount(totalCount);
    }
  }, [friendRequests, isNotificationsPage, updateNotificationCount]);

  return null; // This hook doesn't return anything
} 