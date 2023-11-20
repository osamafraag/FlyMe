import React from 'react'

export default function Read({readNotifications, deleteNotification}) {
  return (
    <div>
      <h1 className="text-start py-3" style={{ color: "var(--main-color)" }}>Old Notifications</h1>
        {readNotifications && readNotifications.length > 0 ? (
          <ul className="list-group">
            {readNotifications.map(notification => (
              <li key={notification.id} className="list-group-item border-0">
               <p className='text-bold text-start'  style={{ fontSize: "25px" }}>{notification.title}</p>
               <p className='mb-1 pb-2'style={{ textAlign:'justify'}}>{notification.description}</p>
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
  )
}