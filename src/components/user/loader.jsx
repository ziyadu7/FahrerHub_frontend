import React from 'react'

function Loader(props) {
  const bg = props?.bg
  const colour = props?.colour
  return (
    <div className={`flex h-screen w-full justify-center items-center overflow-hidden bg-${bg||''} p-2 `}>
      <div
        className={`inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-${colour||'white'} motion-reduce:animate-[spin_1.5s_linear_infinite]`}
        role="status">
        <span
          className="!absolute text-black !-m-px !h-px !w-px overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
      </div>
    </div>
  )
}

export default Loader