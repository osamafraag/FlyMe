import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Unread from "./Unread"
import Read from "./Read"
import Sent from "./Sent"
import "./style.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash, faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { setNotifications, setUnread, setRead, setCounter } from "../../Store/Slice/Notifications";
import { GetMessages, GetSpecificMessage, GetSendMessages, PutMessage, DeleteMessage } from '../../APIs/Notification';
import { useDispatch  } from 'react-redux';

export default function NotificationsComponent() {
  const token = useSelector(state => state.Token.token);
  const notifications = useSelector(state => state.Notifications.notifications);
  const unread = useSelector(state => state.Notifications.unread);
  const read = useSelector(state => state.Notifications.read);
  const counter = useSelector(state => state.Notifications.counter);
  const [error, setError] = useState(null);
  const [notificationType, setNotificationType] = useState('Unread');
  const [changes, setChanges] = useState('')
  const [sentMessages, setSentMessages] = useState([])

  let userData = useSelector(state => state.loggedInUserSlice.data);
  let userId = userData ? userData.id : null
  console.log(userData)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userData || Object.keys(userData).length === 0) {
      navigate('/Login');
    }

  }, [userData, navigate, counter]);

  useEffect(() => {
    if (!userId) {
      setError('Please Login First.');
      return;
    }
    
    GetMessages(userData.id, { Authorization: `Token ${token}`})
    .then((result) => {
      console.log("Notifiction", result.data)
      dispatch(setNotifications(result.data))
      dispatch(setUnread(result.data?.filter(notification => notification.status === 'UNREAD')))
      dispatch(setRead(result.data?.filter(notification => notification.status === 'READ')))
    })
    .catch((error) => console.log(error))

    GetSendMessages(userData.id, { Authorization: `Token ${token}`})
    .then((result) => {
      console.log(result.data)
      setSentMessages(result.data)
    })
    .catch((error) => {
      console.log(error)
    })

  }, [userId, counter, changes]);
 

  if (error) {
    return <h1 className='text-danger py-5'>{error}</h1>;
  }

  const markAsRead = (notificationId) => {
    GetSpecificMessage(notificationId, { Authorization: `Token ${token}` })
    .then((result) => {
      console.log(result)
      result.data.data.status = 'READ'
      PutMessage(notificationId, result.data.data, { Authorization: `Token ${token}` })
      .then((response) => {
        setChanges(`Put Change: ${response}`)
      })
      .catch((error) => {
        console.error(error);
      })
    })
    .catch((error) => console.log(error));  
  };

  const deleteRead = (notificationId) => {
    DeleteMessage(notificationId, { Authorization: `Token ${token}` })
    .then((response) => {
      console.log("Response" , response)
      setChanges(`Delete Change ${notificationId}: ${response}`)
    })
    .catch((error) => {
      console.log("Catch" , error)
    });
  }

  const handleNotificationTypeChange = (type) => {
    setNotificationType(type);
  };

  return (
    <>
      <div className='bg-light py-5'>
        <div className='container p-5 bg-white rounded-3 shadow-sm'>
          <div className='mb-2 text-start'>
            <button className={notificationType === 'Unread' ? 'btn me-3 active type' : 'btn me-3 type'} onClick={() => handleNotificationTypeChange('Unread')}><FontAwesomeIcon icon={faEye} /> Unread</button>
            <button className={notificationType === 'Read' ? 'btn me-3 active type' : 'btn me-3 type'}  onClick={() => handleNotificationTypeChange('Read')}><FontAwesomeIcon icon={faEyeSlash} /> Read</button>
            <button className={notificationType === 'Sent' ? 'btn me-3 active type' : 'btn me-3 type'} onClick={() => handleNotificationTypeChange('Sent')}><FontAwesomeIcon icon={faPaperPlane} /> Sent</button>
          </div>
          <hr style={{color: "var(--main-color)"}}/>
          {notificationType === 'Unread' && <Unread unread={unread} markAsRead={markAsRead}/>}
          {notificationType === 'Read' && <Read read={read} deleteRead={deleteRead}/>}
          {notificationType === 'Sent' && <Sent sent={sentMessages}/>}
        </div>
      </div>
    </>
  );
}