import React from 'react'

function Loader() {
  return (
    <div className="flex justify-center items-center overflow-hidden w-full h-full p-2 ">
      <div
        className="inline-block h-28 w-28 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-neutral-100 motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status">
        <span
          className="!absolute !-m-px !h-px !w-px overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
      </div>
    </div>
  )
}

export default Loader