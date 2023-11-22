import React from 'react'
import NoMessage from './../../Assets/NoMessage.webp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCheck, faClock } from '@fortawesome/free-regular-svg-icons'
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons'

export default function Unread({unread, markAsRead}) {
  return (
    <div className='container'>
      {unread && unread.length > 0 ? (
        unread.map((notification, index) => (
          <>
          <div className="notification row align-items-start py-3" key={notification.id}>
            <div className='col-1 delete text-start'>
              <button className="btn border-0" onClick={() => markAsRead(notification.id)}><FontAwesomeIcon icon={faSquareCheck} className='fs-2' style={{color: "var(--main-color)"}} />
              </button>
            </div>

            <div className='col-9 message text-start'>
              <h5>
                <span 
                  className={`badge 
                  ${notification.title == "Your Complaint Answer!" ? "bg-info" : notification.title == "Flight Cancelled" ? "bg-danger" : "bg-warning" }`}>
                  {notification.title}
                </span>
              </h5>
              <p className='py-2'>{notification.description}</p>
              <small className="text-muted mt-4"><FontAwesomeIcon icon={faPlaneDeparture} style={{color: "var(--main-color)"}}/> Fly Me</small>
            </div>

            <div className='col-2'>
              <p className='text-secondary' style={{fontSize: "12px"}}><FontAwesomeIcon icon={faClock} /> {new Date(notification.date).toLocaleString()}</p>
            </div>
          </div>
          {index !== unread.length - 1 && <hr style={{ color: 'var(--main-color' }} />}
          </>
        ))
        ) : (
          <img src={NoMessage} width={300} height={300} />
        )}
    </div>
  )
}