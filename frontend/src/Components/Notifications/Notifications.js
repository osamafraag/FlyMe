import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useNotificationContext } from './NotificationContext';
import { axiosInstance } from "./../../APIs/Config";
import Unread from "./Unread"
import Read from "./Read"
import Sent from "./Sent"
import "./style.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash, faPaperPlane } from "@fortawesome/free-solid-svg-icons"

export default function NotificationsComponent() {
  const token = useSelector(state => state.Token.token);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const [notificationType, setNotificationType] = useState('Unread');
  const API_BASE_URL = 'http://127.0.0.1:8000';
  const { updateUnreadCount } = useNotificationContext();

  let userData = useSelector(state => state.loggedInUserSlice.data);
  let userId = userData ? userData.id : null
  console.log(userData)
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData || Object.keys(userData).length === 0) {
      navigate('/Login');
    }

  }, [userData, navigate, updateUnreadCount]);

  useEffect(() => {
    if (!userId) {
      setError('Please log in first.');
      return;
    }
    fetchData()

  }, [userId, updateUnreadCount]);

  useEffect(() => {

    // Update the unread count using the context
    const unreadCount = notifications.filter(
      (notification) => notification.status === 'UNREAD'
    ).length;
    updateUnreadCount(unreadCount);
  }, [notifications, updateUnreadCount]);

  if (error) {
    return <h1 className='text-danger py-5'>{error}</h1>;
  }
  console.log(notifications)


  const fetchData = () => {
    fetch(`${API_BASE_URL}/accounts/api/user/${userId}/notifications`, {
      headers: { Authorization: `Token ${token}` }
    })
      .then(response => response.json())
      .then(result => {
        setNotifications(result);
        console.log(result)
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
        setError('Error fetching notifications. Please try again later.');
      });
  }
  const markNotificationAsRead = (notificationId) => {
    axiosInstance
      .get(`accounts/api/notifications/${notificationId}`, {
        headers: { Authorization: `Token ${token}` }
      })
      .then((result) => {
        console.log(result)
        result.data.data.status = 'READ'
        axiosInstance
          .put(`accounts/api/notifications/${notificationId}`, result.data.data, {
            headers: { Authorization: `Token ${token}` }
          })
          .then((response) => {
            fetchData()
          })
          .catch((error) => {
            console.error(error.response);
          })
      })
      .catch((error) => console.log(error));
  };

  const deleteNotification = (notificationId) => {
    fetch(`${API_BASE_URL}/accounts/api/notifications/${notificationId}`, {
      method: 'DELETE',
      headers: { Authorization: `Token ${token}` }
    })
      .then((response) => {
        if (response.ok) {
          // If the deletion is successful, update the notifications state to remove the deleted notification
          const updatedNotifications = notifications.filter(
            (notification) => notification.id !== notificationId
          );
          setNotifications(updatedNotifications);
        } else {
          throw new Error('Failed to delete notification');
        }
      })
      .catch((error) => {
        console.error('Error deleting notification:', error);
        // Handle any error that occurs during the API request
      });
  };

  const unreadNotifications = notifications?.filter(notification => notification.status === 'UNREAD');
  const readNotifications = notifications?.filter(
    (notification) => notification.status === 'READ' && !notification.deleted
  );

  const handleNotificationTypeChange = (type) => {
    setNotificationType(type);
  };

  return (
    <>
      <div className='bg-light py-5'>
        <div className='container p-5 bg-white rounded-3 shadow-sm'>
          <div className='mb-2 text-start'>
            <button className={notificationType === 'Unread' ? 'btn me-3 clicked type' : 'btn me-3 type'} onClick={() => handleNotificationTypeChange('Unread')}><FontAwesomeIcon icon={faEye} /> Unread</button>
            <button className={notificationType === 'Read' ? 'btn me-3 clicked type' : 'btn me-3 type'}  onClick={() => handleNotificationTypeChange('Read')}><FontAwesomeIcon icon={faEyeSlash} /> Read</button>
            <button className={notificationType === 'Sent' ? 'btn me-3 clicked type' : 'btn me-3 type'} onClick={() => handleNotificationTypeChange('Sent')}><FontAwesomeIcon icon={faPaperPlane} /> Sent</button>
          </div>
          <hr style={{color: "var(--main-color)"}}/>
          {notificationType === 'Unread' && <Unread unreadNotifications={unreadNotifications} markNotificationAsRead={markNotificationAsRead}/>}
          {notificationType === 'Read' && <Read readNotifications={readNotifications} deleteNotification={deleteNotification}/>}
          {notificationType === 'Sent' && <Sent />}
        </div>
      </div>
    </>
  );
}