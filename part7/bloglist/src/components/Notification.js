import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const type = useSelector((state) => state.notification.type)
  const text = useSelector((state) => state.notification.text)
  const style = {
    color: type === 'error' ? 'red' : 'green',
    backgroundColor: 'lightgrey',
    border: type === 'error' ? '1px solid red' : '1px solid green',
    padding: '5px',
    margin: '0px 0px 10px 0px',
  }
  if (text === "") {
    return null
  }

  return <div style={style}>{text}</div>
}

export default Notification
