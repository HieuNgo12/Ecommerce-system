import React from 'react'
import "./ViewAllButton.css"
function ViewAllButton({title, ...props}) {
  return (
    <div className='view-all-button' style={{cursor: 'pointer'}}>
      {title}
    </div>
  )
}

export default ViewAllButton
