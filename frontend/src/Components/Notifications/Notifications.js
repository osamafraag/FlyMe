// import React, { useEffect, useState } from 'react';

// export default function NotificationsComponent({ userId }) {
//   const [notifications, setNotifications] = useState([]);
//   const [error, setError] = useState(null);
//   const API_BASE_URL = 'http://127.0.0.1:8000';

//   useEffect(() => {
//     if (!userId) {
//       setError('Please log in first.');
//       return;
//     }

//     fetch(`${API_BASE_URL}/accounts/api/user/${userId}/notifications/`)
//       .then(response => response.json())
//       .then(data => {
//         setNotifications(data.notifications);
//       })
//       .catch(error => {
//         console.error('Error fetching notifications:', error);
//         setError('Error fetching notifications. Please try again later.');
//       });
//   }, [userId]);

//   const markNotificationAsRead = (notificationId) => {
//     const updatedNotifications = notifications.map(notification => {
//       if (notification.id === notificationId) {
//         return {
//           ...notification,
//           is_read: true
//         };
//       }
//       return notification;
//     });

//     setNotifications(updatedNotifications);
//   };

//   if (error) {
//     return <h1 className='text-danger py-5'>{error}</h1>;
//   }

//   return (
//     <>
//       <div className='container'>
//         <h1 className="text-start py-5" style={{ color: "var(--main-color)" }}>Unread Notifications</h1>
//         {notifications.length > 0 ? (
//           <ul>
//             {notifications.map(notification => (
//               !notification.is_read && (
//                 <li key={notification.id}>
//                   <p className='text-bold text-start'>{notification.title}</p>
//                   <p className='pt-3 px-3'>{notification.description}</p>
//                   <p className='py-2 px-3'>{notification.date}</p>
//                   <button onClick={() => markNotificationAsRead(notification.id)} style={{backgroundColor: "var(--main-color)"}} className="btn text-light py-2 px-4 text-end">
//                     Mark as Read
//                   </button>
//                 </li>
//               )
//             ))}
//           </ul>
//         ) : (
//           <h4>No unread notifications.</h4>
//         )}

//         <hr />

//         <h1 className="text-start py-5" style={{ color: "var(--main-color)" }}>Read Notifications</h1>
//         {notifications.length > 0 ? (
//           <ul>
//             {notifications.map(notification => (
//               notification.is_read && (
//                 <li key={notification.id}>
//                   <p className='text-bold text-start'>{notification.title}</p>
//                   <p className='pt-3 px-3'>{notification.description}</p>
//                   <p className='py-2 px-3'>{notification.date} , <span className='bg-body-secondary'>Seen On :</span> {notification.readDate}</p>
//                 </li>
//               )
//             ))}
//           </ul>
//         ) : (
//           <h4>No read notifications.</h4>
//         )}
//       </div>
//     </>
//   );
// }

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import { useSelector } from 'react-redux';

// export default function NotificationsComponent() {
//   const [notifications, setNotifications] = useState([]);
//   const [error, setError] = useState(null);
//   const API_BASE_URL = 'http://127.0.0.1:8000';

//   let userData = useSelector(state => state.loggedInUserSlice.data);
//   let userId = userData.id
//   console.log(userData)
//   const navigate = useNavigate()
//   // If !user navigate to login page 
//   useEffect(() => {
//     if (!userData || Object.keys(userData).length === 0) {
//       navigate('/Login');
//     }
//   }, [userData, navigate]);

//   // // Return null if user data is not available
//   // if (!userData || Object.keys(userData).length === 0) {
//   //   return null;
//   // }

//   useEffect(() => {
//     // if (!userId) {
//     //   setError('Please log in first.');
//     //   return;
//     // }

//     fetch(`${API_BASE_URL}/accounts/api/user/${userId}/notifications`)
//       .then(response => response.json())
//       .then(data => {
//         setNotifications(data.notifications);
//       })
//       .catch(error => {
//         console.error('Error fetching notifications:', error);
//         setError('Error fetching notifications. Please try again later.');
//       });
//   },[]);

//   if (error) {
//     return <h1 className='text-danger py-5'>{error}</h1>;
//   }

//   const unreadNotifications = notifications.filter(notification => notification.states === 'unread');
//   const readNotifications = notifications.filter(notification => notification.states === 'read');

//   return (
//     <>
//       <div className='container'>
//         <h1 className="text-start py-5" style={{ color: "var(--main-color)" }}>Unread Notifications</h1>
//         {unreadNotifications.length > 0 ? (
//           <ul>
//             {unreadNotifications.map(notification => (
//               <li key={notification.id}>
//                 <p className='text-bold text-start'>{notification.title}</p>
//                 <p className='pt-3 px-3'>{notification.description}</p>
//                 <p className='py-2 px-3'>{notification.date}</p>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <h4>No unread notifications.</h4>
//         )}

//         <hr />

//         <h1 className="text-start py-5" style={{ color: "var(--main-color)" }}>Read Notifications</h1>
//         {readNotifications.length > 0 ? (
//           <ul>
//             {readNotifications.map(notification => (
//               <li key={notification.id}>
//                 <p className='text-bold text-start'>{notification.title}</p>
//                 <p className='pt-3 px-3'>{notification.description}</p>
//                 <p className='py-2 px-3'>{notification.date} , <span className='bg-body-secondary'>Seen On :</span> {notification.readDate}</p>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <h4>No read notifications.</h4>
//         )}
//       </div>
//     </>
//   );
// }

import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useNotificationContext } from './NotificationContext';


export default function NotificationsComponent() {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const API_BASE_URL = 'http://127.0.0.1:8000';
  const { updateUnreadCount } = useNotificationContext();

  let userData = useSelector(state => state.loggedInUserSlice.data);
  let userId = userData.id
  console.log(userData)
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData || Object.keys(userData).length === 0) {
      navigate('/Login');
    }
    
  }, [userData, navigate , updateUnreadCount]);

  useEffect(() => {
    if (!userId) {
      setError('Please log in first.');
      return;
    }

    fetch(`${API_BASE_URL}/accounts/api/user/${userId}/notifications`)
      .then(response => response.json())
      .then(result => {
        setNotifications(result);
        console.log(result)
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
        setError('Error fetching notifications. Please try again later.');
      });

  }, [userId , updateUnreadCount]);

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

  const markNotificationAsRead = (notificationId) => {
    // Send a PUT or PATCH request to mark the notification as read
    fetch(`${API_BASE_URL}/accounts/api/notifications/${notificationId}`, {
      method: 'PUT', // or 'PATCH'
      headers: {
        'Content-Type': 'application/json',
      },
      // Include any necessary request body or headers
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the notifications state to reflect the updated status
        const updatedNotifications = notifications.map((notification) => {
          if (notification.id === notificationId) {
            return {
              ...notification,
              status: 'READ',
            };
          }
          return notification;
        });
        setNotifications(updatedNotifications);
      })
      .catch((error) => {
        console.error('Error marking notification as read:', error);
        // Handle any error that occurs during the API request
      });
  };

  const deleteNotification = (notificationId) => {
    fetch(`${API_BASE_URL}/accounts/api/notifications/${notificationId}`, {
      method: 'DELETE',
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

  return (
    <>

      <div className='container'>
       <div className="mb-5">
       <h1 className="text-start py-3" style={{ color: "var(--main-color)" }}>New Notifications</h1>
        {unreadNotifications && unreadNotifications.length > 0 ? (
          <ul className="list-group">
            {unreadNotifications.map(notification => (
              <li key={notification.id} className="list-group-item pb-2 border-0">
                <p className='text-bold text-start'  style={{ fontSize: "25px" }}>{notification.title}</p>
                <p className='mb-1 pb-2 ps-3'style={{ textAlign:'justify'}}>{notification.description}</p>
                <div className='pt-4' style={{ display: 'flex' , justifyContent: 'space-between'  }}>
                  <small className='text-muted text-start'>{notification.date}</small>
                  <button
                    className="btn btn-sm btn-primary ms-2  p-2 " style={{ backgroundColor: "var(--main-color)" ,width:'150px' , fontSize:'15px' , borderRadius:'10px'}}
                    onClick={() => markNotificationAsRead(notification.id)}
                  >
                    Mark as Read
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <h4 className="mt-3 text-secondary">No unread notifications.</h4>
        )}

        <hr />

        <h1 className="text-start py-3" style={{ color: "var(--main-color)" }}>Old Notifications</h1>
        {readNotifications && readNotifications.length > 0 ? (
          <ul className="list-group">
            {readNotifications.map(notification => (
              <li key={notification.id} className="list-group-item border-0">
               <p className='text-bold text-start'  style={{ fontSize: "25px" }}>{notification.title}</p>
               <p className='mb-1 pb-2'>{notification.description}</p>
               <div  className='pt-2' style={{ display: 'flex' , justifyContent: 'space-between'  }}>
                <small className='text-muted text-start'>
                    {notification.date}  <span className='text-white px-2 rounded-3' style={{ backgroundColor: "var(--main-color)" }}>Seen On :</span> {notification.readDate}
                </small>
                <button style={{width:'150px',fontSize:'15px',  borderRadius:'10px' }}
                  className="btn btn-sm btn-danger ms-2 p-2 " 
                  onClick={() => deleteNotification(notification.id)}
                >
                  Delete
                </button>
               </div>
              </li>
            ))}
          </ul>
        ) : (
          <h4 className="mt-3 text-secondary">No read notifications.</h4>
        )}
       </div>
      </div>
    </>
  );
}