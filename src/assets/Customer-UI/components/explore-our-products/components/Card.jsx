import React from 'react'

function Card({title,img, orgPrice, price,...props}) {
  return (
    <div>
            <div class="max-w-sm rounded overflow-hidden shadow-lg">
  <img class="" style={{marginLeft: "20%"}} src={img} alt="Sunset in the mountains" />
  <div class="px-0">
    
  </div>
  <div class="px-6 pt-4 pb-2">
 
  </div>
</div>
         <div class="font-bold text-xl mb-2">{title}</div>
    <div className='flex'>
        <div>${price}</div>

        <div className='ml-6 line-through'>${orgPrice}</div>
    </div>
    </div>

  )
}

export default Card