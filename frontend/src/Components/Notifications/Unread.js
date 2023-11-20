import React from 'react'
import NoMessage from './../../Assets/NoMessage.webp'

export default function Unread({unreadNotifications, markNotificationAsRead}) {
  return (
    <div>
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
          <img src={NoMessage} width={300} height={300} />
        )}
    </div>
  )
}