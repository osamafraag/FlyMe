import React from 'react'
import NoMessage from './../../Assets/NoMessage.webp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faClock } from '@fortawesome/free-regular-svg-icons'
import { faPlaneDeparture,faReply } from '@fortawesome/free-solid-svg-icons'

export default function Sent({ sent }) {
  return (
    <div className='container'>
      {sent && sent.length > 0 ? (
        sent.map((notification, index) => (
          <>
            <div className="notification row align-items-start py-3" key={notification.id}>
              <div className='col-1 delete text-start'>
                <FontAwesomeIcon icon={faPaperPlane} className='fs-2' style={{ color: "var(--main-color)" }} />
              </div>

              <div className='col-9 message text-start'>
                <h5>
                  <span
                    className={`badge 
                    ${notification.status == "IN_PROGRESS" ? "bg-info" : notification.status == "OPEN" ? "bg-secondary" : notification.status == "REOPENED" ? "bg-primary" : notification.status == "RESOLVED" ? "bg-success" : "bg-danger"}`}>
                    {notification.status}
                  </span>
                </h5>
                <p className='py-2 mb-0 '>{notification.description}</p>
                {notification.answer != "" 
                ? 
                <p className='ps-5'>
                  <FontAwesomeIcon icon={faReply} className='me-4' style={{ color: "var(--main-color)", transform: "rotate(180deg)" }} />
                  <small className="text-muted mt-4"><FontAwesomeIcon icon={faPlaneDeparture} style={{ color: "var(--main-color)" }} /> Fly Me</small> : {notification.answer}
                </p>
                :
                <p className='text-secondary ps-5' style={{ fontSize: "15px" }}><FontAwesomeIcon icon={faClock} /> Wait For Response</p>
                }
              </div>

              <div className='col-2'>
                <p className='text-secondary' style={{ fontSize: "12px" }}><FontAwesomeIcon icon={faClock} /> {new Date(notification.created_at).toLocaleString()}</p>
              </div>

            </div>
            {index !== sent.length - 1 && <hr style={{ color: 'var(--main-color' }} />}
          </>
        ))
      ) : (
        <img src={NoMessage} width={300} height={300} />
      )}
    </div>
  )
}