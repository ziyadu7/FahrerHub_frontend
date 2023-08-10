import React from 'react'

function Forbiden() {
  return (
    <div className="flex h-[calc(100vh-80px)] items-center justify-center p-5 w-full bg-white">
    <div className="text-center">
      <div className="relative scene">
        <div className="overlay left-0 top-0"></div>
        <div className="overlay right-0 top-0"></div>
        <div className="overlay bottom-0 right-0"></div>
        <div className="overlay bottom-0 left-0"></div>
        <span className="bg-403 text-[440px] font-display absolute z-0 bg-clip-text text-transparent transform translate-x-[-25%] -translate-z-100 skew-y-[-3deg]">
          403
        </span>
        <div className="text relative z-7 pointer-events-none transform transition-transform duration-600 ease-bezier-acc-back scale-91">
          <span className="block font-sans-serif text-center text-shadow text-transparent animate-popIn animate-duration-600 animate-delay-base-2-3-1-2 opacity-100">
            <span className="hero-text"></span>
            <span className="msg">
              can't let <span>you</span> in.
            </span>
          </span>
          <span className="support block font-sans-serif text-center animate-popIn animate-duration-600 animate-delay-base-4-3 relative mt-8">
            <span>unexpected?</span>
            <p
              href="#"
              className="text-[#b2b3b4] no-underline relative after:bg-white after:w-110% after:ml-[-5%] after:h-5 after:block after:opacity-[.55] after:mt-13px after:outline-transparent hover:after-opacity-100 focus:after-opacity-100 active:after-opacity-100"
            >
              contact support
            </p>
          </span>
        </div>
        <div className="lock absolute box-shadow-pattern"></div>
      </div>
    </div>
  </div>
  )
}

export default Forbiden