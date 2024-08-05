import React from 'react'
import "./ViewAllButton.css"
function ViewAllButton({onClickViewAllProducts,title, ...props}) {

  return (
    <div onClick={()=> {onClickViewAllProducts()}} className='view-all-button' style={{cursor: 'pointer'}}>
      {title}
    </div>
  )
}

export default ViewAllButton
