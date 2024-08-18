import React from 'react'
import "./ViewAllButton.css"
import { Link } from 'react-router-dom'
function ViewAllButton({onClickViewAllProducts,title, ...props}) {

  return (
    <div onClick={()=> {onClickViewAllProducts()}} className='view-all-button' style={{cursor: 'pointer'}}>
      <Link to={"/productlist"}> {title}</Link>
    </div>
  )
}

export default ViewAllButton
