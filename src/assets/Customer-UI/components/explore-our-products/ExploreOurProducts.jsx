import React from 'react'
import ViewAllButton from '../ViewAllButton'
import Card from '../Card'
import Banter from '../TitleBanter'

function ExploreOurProducts() {
    const items =[{
        title: "Breed Dry Dog Food",
        price: 100,
        rating: 3,
    },
    {
        title: "CANON EOS DSLR CAMERA",
        price: 360,
        rating: 4,
    },
    {
        title: "ASUS FHD GAMING LAPTOP",
        price: 700,
        rating: 5,
    },
    {
        title: "Curology Product Set",
        price: 500,
        rating: 4,
    },
    {
        title: "Kids Electric Car",
        price: 960,
        rating: 5,
    },
    {
        title: "Jr. Zoom Soccer Cheats",
        price: 1160,
        rating: 5,
    },
    {
        title: "GP11 Shooter USB Gamepad",
        price: 660,
        rating: 4,
    },
    {
        title: "Qilted Satin Jacket",
        price: 660,
        rating: 4,
    },
]
  return (
    <div>
        <Banter title={"Our Products"}/>
    <div>
    <h1 className='text-left'>Explore Our Products</h1>
    </div>
    <div className='grid grid-cols-4 gap-8'>

    {items.map((item,key) => {
        return  <Card title={item.title} img={item.image}  price={item.price}/>
    })} 
    </div>
    <ViewAllButton title={"View All Products"}/>

    <img className='mt-28 mb-20' src="./public/icons/line.png"/>
    </div>
  )
}

export default ExploreOurProducts
