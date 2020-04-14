import React from 'react'

const Notification = ({msg}) => {
    if (msg === null) {
        return null
    }

    return (
        <div className='notification' style={{color: msg.color}}>
            {msg.text}
        </div>
    )
}

export default Notification;