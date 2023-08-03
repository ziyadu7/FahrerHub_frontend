import React from 'react'

function BikeCard(props) {
  const bike = props.bike
  const setSingleBike = props.setSingleBike
  return (
    <div onClick={() => setSingleBike(bike._id)}
      className="w-full m-2 hover:scale-105 transition-transform duration-200 relative"
    >
      <div className="bg-slate-800 bg-opacity-70 rounded-lg">
        <div className="relative">
          <img
            src={bike.images[0]}
            className="w-full h-64 sm:h-64 object-cover rounded-t-lg"
            alt="Product"
          />
          <div className="absolute hover:opacity-0 bg-gray-800 bg-opacity-70 inset-0 flex items-center justify-center">
            <a
              href="#"
              className="text-white text-center opacity-100 transition-opacity"
            >
              <h5 className="text-xl font-bold mb-3">{bike.make + ' ' + bike.model}</h5>
              <p className="mb-2">{bike.category}</p>
              <h6 className="text-xl font-semibold">₹ {bike.rentAmount}</h6>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BikeCard