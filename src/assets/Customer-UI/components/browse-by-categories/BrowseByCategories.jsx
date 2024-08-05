import React from 'react'
import Card from './components/Card'
import Banter from '../TitleBanter'
import "./BrowseByCategories.css"
function BrowseByCategories() {
    const itemsList = [
        {
            title: "Phones",
            img: "./icons/phone.png",
            price: 120,
            orgPrice: 160,
            rating: 5
        },
        {
            title: "Computers",
            img: "./icons/computer.png",
            price: 120,
            orgPrice: 160,
            rating: 4

        },
        {
            title: "Smartwatch",
            img: "./icons/smartwatch.png",
            price: 370,
            orgPrice: 400,
            rating: 5

        },
        {
            title: "Camera",
            img: "./icons/camera.png",
            price: 375,
            orgPrice: 400,
            rating: 4.5

        },
        
        {
            title: "Headphones",
            img: "./icons/headphone.png",
            price: 375,
            orgPrice: 400,
            rating: 4.5

        },
        
        {
            title: "Gaming",
            img: "./icons/gamepad.png",
            price: 375,
            orgPrice: 400,
            rating: 4.5

        },
    ]
  return (
    <div>
        <Banter title={"Categories"}/>
        <div>

        </div>
        <div className='grid grid-cols-6 gap-8 ' style={{cursor: "pointer"}} 
        >
        {
            itemsList.map((item, index) => {
                return <div className='hover-red' >
                    <Card orgPrice={item.orgPrice} img={item.img} rating={item.rating} price={item.price} title={item.title} />
                 </div>
                
            })
        }
        </div>
    </div>
  )
}

export default BrowseByCategories
