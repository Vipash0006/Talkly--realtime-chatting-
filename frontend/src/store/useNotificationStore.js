import { create } from "zustand";
import { persist } from "zustand/middleware";

// Create store with debugging
export const useNotificationStore = create(
  persist(
    (set) => ({
      unreadCount: 0,
      setUnreadCount: (count) => {
        console.log("Setting unread count to:", count);
        set({ unreadCount: count });
      },
      incrementUnreadCount: () => {
        set((state) => {
          console.log("Incrementing unread count:", state.unreadCount + 1);
          return { unreadCount: state.unreadCount + 1 };
        });
      },
      resetUnreadCount: () => {
        console.log("Resetting unread count to 0");
        set({ unreadCount: 0 });
      },
    }),
    {
      name: "notification-store",
    }
  )
); 