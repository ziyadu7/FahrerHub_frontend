import React, { useState } from 'react';
import 'react-image-crop/dist/ReactCrop.css';
import clubLogos from '../../assets/images/userHome/Home clubs logo.png'
import homeImage2 from '../../assets/images/userHome/HomeImage2.png'
import { useNavigate } from 'react-router-dom';

const HomeBody = () => {
  const navigate = useNavigate()
  return (
    <div className='bg-[url(https://w0.peakpx.com/wallpaper/522/560/HD-wallpaper-motorcycle-headlight-dark.jpg)] bg-cover text-white'>
      <div className='flex justify-center p-4'>
        <div className=''>
          <h1 className='font-bold text-center text-lg sm:text-[30px]'>FOR ALL MOTORHEADS</h1>
          <p>We're here for anyone who's passionate about moto culture and wants to be a part of something bigger.</p>
        </div>
      </div>

      <div className='flex justify-center'>
        <img className='overflow-hidden w-11/12' src="https://imedia.gulfnews.com/harley_davidson/images/banner.jpg" alt="" />
      </div>

      <div className='grid sm:grid-cols-2 mt-5 sm:mt-9 md:mt-16 bg-white  overflow-hidden grid-cols-1'>
        <div className='flex justify-center  hover:cursor-pointer pt-5'>
          <img onClick={() => navigate('/clubs')} className='w-3/4  h-3/4' src={homeImage2} alt="" />
        </div>
        <div className='flex justify-center'>
          <img className='w-3/4 h-full' src={clubLogos} alt="" />
        </div>
      </div>

    </div>
  )
}
export default HomeBody;
