import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const notificationStyle = {
    color: message.isError ? 'red' : 'green',
    background: 'lightgrey',
    fontsize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  
  return (
    <div style={notificationStyle}>
      {message.text}
    </div>
  )
}

export default Notification