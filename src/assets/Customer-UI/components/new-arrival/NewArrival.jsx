import React from 'react'
import "./NewArrival.css"
import Banter from '../TitleBanter'
function NewArrival() {
  return (
    <div className='new-arrival'>
        <Banter title={"Featured"}  />
      <h1 className='text-left'>New Arrival</h1>
      <div className='flex'>
        <div className=''>
            <img src="./icons/ps5.png"/>
        </div>
        <div className=''>
            <div>
                 <img src="./icons/women-collection.png"/>
            </div>
            <div className='flex'>
                <img src="./icons/speakers.png"/>
                <img src="./icons/perfume.png"/>
            </div>

        </div>
      </div>
      
      <div className='fast-delivery'>
            <img src="./icons/fast-delivery.png"/>
        </div>
    </div>
  )
}

export default NewArrival
