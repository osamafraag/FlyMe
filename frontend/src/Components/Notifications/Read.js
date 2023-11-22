import React from 'react'
import NoMessage from './../../Assets/NoMessage.webp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRectangleXmark, faClock } from '@fortawesome/free-regular-svg-icons'
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons'

export default function Read({read, deleteRead}) {
  return (
    <div className='container'>
      {read && read.length > 0 ? (
        read.map((notification, index) => (
          <>
          <div className="notification row align-items-start py-3" key={notification.id}>
            <div className='col-1 delete text-start'>
              <button className="btn border-0" onClick={() => deleteRead(notification.id)}><FontAwesomeIcon icon={faRectangleXmark} className='fs-2 text-danger' style={{color: "var(--main-color)"}} />
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
              <p className='text-secondary' style={{fontSize: "12px"}}><FontAwesomeIcon icon={faClock} /> {new Date(notification.readDate).toLocaleString()}</p>
            </div>

          </div>
          {index !== read.length - 1 && <hr style={{ color: 'var(--main-color' }} />}
          </>
        ))
        ) : (
          <img src={NoMessage} width={300} height={300} />
        )}
    </div>
  )
}