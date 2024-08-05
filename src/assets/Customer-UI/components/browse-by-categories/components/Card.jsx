import React from 'react'

function Card({title,img,...props}) {
  return (
    <div class="max-w-sm rounded overflow-hidden shadow-lg">
  <img class="" style={{marginLeft: "35%"}} src={img} alt="Sunset in the mountains" />
  <div class="px-0">
    <div class="font-bold text-xl mb-2">{title}</div>
  
  </div>
  <div class="px-6 pt-4 pb-2">
   
  </div>
</div>
  )
}

export default Card