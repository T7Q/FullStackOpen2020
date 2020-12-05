import React, { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Toggle = forwardRef(({ buttonLabel, children }, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          onClick={toggleVisibility}
          type="submit"
          style={{
            marginTop: '10px',
            width: '100%',
            border: 'none',
            color: '#132743',
            backgroundColor: '#ffcbcb',
          }}>
          {buttonLabel}
        </Button>
        {/* <button onClick={toggleVisibility}>{buttonLabel}</button> */}
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button
          onClick={toggleVisibility}
          type="submit"
          style={{
            marginTop: '10px',
            width: '100%',
            border: 'none',
            color: '#132743',
            backgroundColor: '#70adb5',
          }}>
          cancel
        </Button>
        {/* <button onClick={toggleVisibility}>cancel</button> */}
      </div>
    </div>
  )
})

Toggle.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

Toggle.displayName = 'Toggle'

export default Toggle
