import React from 'react'
import { BiErrorAlt } from 'react-icons/bi'
function PayFail() {

  return (
    <div className="bg-gray-100 h-full">
      <div className="bg-white p-6 md:mx-auto">
        <svg viewBox="0 0 24 22" className="text-red-600 w-16 h-16 mx-auto my-6">
          <BiErrorAlt />
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Payment Failed
          </h3>
          <p className="text-gray-600 my-2">
            We're sorry, but there was an issue with your payment.
          </p>
          <p>Please try again or contact customer support for assistance.</p>
          <div className="py-10 text-center">
            <a
              href="/showBikes" // Update the href value to the desired redirect page
              className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
            >
              GO BACK
            </a>
          </div>
        </div>
      </div>
    </div>

  )
}

export default PayFail