import React from 'react'

function Forbiden() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Forbidden!</h1>
        <h2 className="text-2xl md:text-3xl mb-8">Code 403</h2>
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1000 1000"
            className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-4"
          >
            <defs>
              <path
                id="textPath"
                d="M 250 500 A 250,250 0 1 1 250 500.0001"
              />
            </defs>
            <text
              x="0"
              y="0"
              textAnchor="middle"
              style={{ fontSize: '16pt' }}
            >
              <textPath xlinkHref="#textPath" startOffset="0%">
                MOUSE JAIL
              </textPath>
              <textPath xlinkHref="#textPath" startOffset="50%">
                MOUSE JAIL
              </textPath>
            </text>
          </svg>
          <div className="absolute w-2 h-2 md:w-4 md:h-4 bg-white rounded-full" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>
        </div>
      </div>
    </div>
  )
}

export default Forbiden