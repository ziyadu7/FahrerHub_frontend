import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userLogout } from '../../store/slice/user'
import { PowerIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { SiClubhouse } from 'react-icons/si'
import { RiMotorbikeFill } from 'react-icons/ri'
import { AiFillHome, AiOutlineLogin, AiOutlineComment } from 'react-icons/ai'
import logo from '../../assets/images/userHome/1690830616461.png'


function NavBar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.User)

  const [navbar, setNavbar] = useState(false);

  return (
    <nav className={`w-full z-50  ${navbar ? "bg-slate-300" : "bg-slate-200"} md:bg-opacity-100 md:bg-slate-200 shadow sticky top-0`}>
      <div className={`justify-between px-4 mx-auto  lg:max-w-7xl md:items-center md:flex md:px-8`}>
        <div className=''>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
            <p>
              <img src={logo} className='w-24 h-12' alt="" />
            </p>
          </div>
        </div>
        <div className={`${navbar ? 'w-full h-full fixed md:h-auto md:flex' : 'md:flex'}`}>
          <div className={`${navbar ? "w-full block fixed md:bg-transparent md:bg-opacity-0 md:backdrop-blur-none bg-opacity-70 bg-slate-500 backdrop-blur-[2px] left-0 md:left-auto" : "hidden md:flex"
            }`}>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 `}
            >
              <ul className="ms-2 hover:cursor-pointer items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                <li className="md:text-black text-white hover:text-slate-700">
                  <div className='flex' onClick={() => { navigate('/')}}>
                    <AiFillHome className="h-5 w-5 me-2" />
                    <p>Home</p>

                  </div>
                </li>
                <li className="md:text-black text-white hover:text-slate-700">
                  <div onClick={() => navigate('/showBikes')} className='flex'>
                    <RiMotorbikeFill className="h-5 w-5 me-2" />
                    <p>Rent Bikes</p>
                  </div>
                </li>
                <li className="md:text-black text-white  hover:text-slate-700">
                  <div onClick={() => { navigate('/clubs') }} className='flex'>
                    <SiClubhouse className="h-5 w-5 me-2" />
                    <p>Clubs</p>

                  </div>
                </li>
                <li className="md:text-black text-white  hover:text-slate-700">
                  <div onClick={() => { navigate('/yourClubs') }} className='flex'>
                    <SiClubhouse className="h-5 w-5 me-2" />
                    <p>Your Clubs</p>

                  </div>
                </li>
                <li className="md:text-black text-white  hover:text-slate-700">
                  <div onClick={() => navigate('/questions')} className='flex'>
                    <AiOutlineComment className="h-5 w-5 me-2" />
                    <p>Q/A</p>

                  </div>
                </li>
                <li className="md:text-black hover:cursor-pointer text-white md:hidden  hover:text-slate-700">
                  {token ? <div onClick={() => navigate('/profile')} className='flex'>
                    <UserCircleIcon className="h-5 w-5 me-2" />
                    <p>Profile</p>
                  </div> : ''}


                </li>
                <li className="md:text-black text-white md:hidden  hover:text-slate-700">
                  {token ? <div onClick={() => {
                    dispatch(userLogout())
                    navigate('/login')
                  }} className='flex'>
                    <PowerIcon className="h-5 w-5 me-2" />
                    <p>Logout</p>

                  </div> : <div onClick={() => {
                    navigate('/login')
                  }} className='flex'>
                    <AiOutlineLogin className="h-5 w-5 me-2" />
                    <p>Login</p>

                  </div>}

                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='hidden md:flex'>
          {token !== null ? <ul className="items-center  hover:cursor-pointer justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
            <li className="md:text-black text-white  md:flex  hover:text-slate-700">
              <div onClick={() => navigate('/profile')} className='flex'>
                <UserCircleIcon className="h-5 w-5 me-2" />
                <p className='md:hidden' >Profile</p>
              </div>

            </li>
            <li className="md:text-black text-white  md:flex  hover:text-slate-700">
              <div onClick={() => {
                dispatch(userLogout())
                navigate('/login')
              }} className='flex'>
                <PowerIcon className="h-5 w-5 me-2 md:hidden" />
                <p>Logout</p>

              </div>
            </li>
          </ul> : <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
            <li className="md:text-black text-white md:flex  hover:text-slate-700">
              <div onClick={() => {
                navigate('/login')
              }} className='flex'>
                <AiOutlineLogin className="h-5 w-5 me-2 md:hidden" />
                <p>Login</p>

              </div>
            </li>
          </ul>}

        </div>
      </div>
    </nav>
  );

}

export default NavBar