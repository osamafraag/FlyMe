import { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0);

  const updateUnreadCount = (count) => {
    setUnreadCount(count);
  };

  const initializeUnreadCount = async () => {
    try {
      const response = await fetch('YOUR_API_ENDPOINT_FOR_UNREAD_COUNT');
      const data = await response.json();
      updateUnreadCount(data.unreadCount); // Adjust this according to your API response structure
    } catch (error) {
      console.error('Error initializing unread count:', error);
    }
  };

  useEffect(() => {
    initializeUnreadCount();
  }, []); // Run this effect only once when the component mounts

  return (
    <NotificationContext.Provider value={{ unreadCount, updateUnreadCount }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  return useContext(NotificationContext);
};

