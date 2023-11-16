import React, { useEffect, useState } from 'react';

export default function NotificationsComponent({ userId }) {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const API_BASE_URL = 'http://127.0.0.1:8000';

  useEffect(() => {
    if (!userId) {
      setError('Please log in first.');
      return;
    }

    fetch(`${API_BASE_URL}/accounts/api/user/${userId}/notifications/`)
      .then(response => response.json())
      .then(data => {
        setNotifications(data.notifications);
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
        setError('Error fetching notifications. Please try again later.');
      });
  }, [userId]);

  const markNotificationAsRead = (notificationId) => {
    const updatedNotifications = notifications.map(notification => {
      if (notification.id === notificationId) {
        return {
          ...notification,
          is_read: true
        };
      }
      return notification;
    });

    setNotifications(updatedNotifications);
  };

  if (error) {
    return <h1 className='text-danger py-5'>{error}</h1>;
  }

  return (
    <>
      <div className='container'>
        <h1 className="text-start py-5" style={{ color: "var(--main-color)" }}>Unread Notifications</h1>
        {notifications.length > 0 ? (
          <ul>
            {notifications.map(notification => (
              !notification.is_read && (
                <li key={notification.id}>
                  {notification.description}
                  <button onClick={() => markNotificationAsRead(notification.id)} style={{backgroundColor: "var(--main-color)"}} className="btn text-light py-2 px-4">
                    Mark as Read
                  </button>
                </li>
              )
            ))}
          </ul>
        ) : (
          <h4>No unread notifications.</h4>
        )}

        <hr />

        <h1 className="text-start py-5" style={{ color: "var(--main-color)" }}>Read Notifications</h1>
        {notifications.length > 0 ? (
          <ul>
            {notifications.map(notification => (
              notification.is_read && (
                <li key={notification.id}>
                  {notification.description}
                </li>
              )
            ))}
          </ul>
        ) : (
          <h4>No read notifications.</h4>
        )}
      </div>
    </>
  );
}