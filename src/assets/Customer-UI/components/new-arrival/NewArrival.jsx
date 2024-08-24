import React from 'react';
import "./NewArrival.css";
import Banter from '../TitleBanter';

function NewArrival() {
  return (
    <div className='new-arrival container mx-auto px-4 sm:px-8 lg:px-28 my-12'>
      <Banter title={"Featured"} />
      <h1 className='text-left text-xl sm:text-2xl font-bold'>New Arrival</h1>
      <div className='flex flex-col sm:flex-row gap-4'>
        <div className='flex-1'>
          <img src="/icons/ps5.png" className="w-full h-auto" alt="PS5" />
        </div>
        <div className='flex-1'>
          <div>
            <img src="./icons/women-collection.png" className="w-full h-auto" alt="Women Collection" />
          </div>
          <div className='flex flex-col sm:flex-row gap-2 mt-4'>
            <img src="/icons/speakers.png" className="w-2/2 sm:w-5/6 h-auto" alt="Speakers" />
            <img src="/icons/perfume.png" className="w-2/2 sm:w-5/6 h-auto" alt="Perfume" />
          </div>
        </div>
      </div>
      
      <div className='fast-delivery mt-8'>
        <img src="./icons/fast-delivery.png" className="w-full h-auto" alt="Fast Delivery" />
      </div>
    </div>
  );
}

export default NewArrival;

// import React from 'react';
// import "./NewArrival.css";
// import Banter from '../TitleBanter';

// function NewArrival() {
//   return (
//     <div className='new-arrival container mx-auto px-4 sm:px-8 lg:px-28 my-12'>
//       <Banter title={"Featured"} />
//       <h1 className='text-left text-xl sm:text-2xl font-bold'>New Arrival</h1>
//       <div className='flex flex-col sm:flex-row gap-4'>
//         {/* Left Section */}
//         <div className='flex-1 flex justify-center items-center'>
//           <img
//             src="./icons/ps5.png"
//             className="w-full sm:w-96 h-auto object-cover"
//             alt="PS5"
//           />
//         </div>

//         {/* Right Section */}
//         <div className='flex-1 flex flex-col gap-4'>
//           <div className='flex-1 flex justify-center items-center'>
//             <img
//               src="./icons/women-collection.png"
//               className="w-full sm:w-96 h-auto object-cover"
//               alt="Women Collection"
//             />
//           </div>
//           <div className='flex flex-col sm:flex-row gap-4'>
//             <img
//               src="./icons/speakers.png"
//               className="w-full sm:w-96 h-auto object-cover"
//               alt="Speakers"
//             />
//             <img
//               src="./icons/perfume.png"
//               className="w-full sm:w-96 h-auto object-cover"
//               alt="Perfume"
//             />
//           </div>
//         </div>
//       </div>
      
//       <div className='fast-delivery mt-8'>
//         <img
//           src="./icons/fast-delivery.png"
//           className="w-full h-auto object-cover"
//           alt="Fast Delivery"
//         />
//       </div>
//     </div>
//   );
// }

// export default NewArrival;
