import React from 'react'
import "./ViewAllButton.css"
import { Link } from 'react-router-dom'
function ViewAllButton({onClickViewAllProducts,title, ...props}) {

  return (
      <Link to={"/productlist"} className='view-all-button' style={{cursor: 'pointer'}}> {title}</Link>
  )
}

export default ViewAllButton
