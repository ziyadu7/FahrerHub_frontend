import { useState } from 'react';
import { GrNext, GrPrevious } from 'react-icons/gr';



const ImageSlider = ({images,height,width,currentIndex,manageIndex}) => {
    
    const nextImage = () => {
        console.log(currentIndex);
        manageIndex((prevIndex) => Math.floor((prevIndex + 1) % images.length));
    };
    
    const prevImage = () => {
        manageIndex((prevIndex) =>
            prevIndex === 0 ? Math.floor(images.length - 1) : Math.floor(prevIndex - 1)
        );
    };
  return (
    <>
        {images.length > 0 ? 
            <div className="relative w-full max-w-screen-lg mx-auto">
                <div className={`relative ${height ? height : 'h-auto'} ${width ? width : 'w-auto'} overflow-hidden `}>
                {Array.from(images).map((image, index) => (
                    <img
                    key={index}
                    src={image instanceof File ? URL.createObjectURL(image) :  image}
                    alt="Slider Image"
                    className={`w-full h-auto  top-0 left-0 transition-opacity duration-500 ease-in-out ${
                        index === currentIndex ? 'opacity-100' : 'opacity-0 absolute'
                    }`}
                    />
                ))}
                { images.length > 1 &&
                    <>
                        <button
                        className="absolute left-1 top-1/2 transform -translate-y-1/2 p-2 bg-gray-200 opacity-70 rounded-full cursor-pointer"
                        onClick={prevImage}
                        ><GrPrevious /></button>
                        <button
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 p-2 bg-gray-200 opacity-70 rounded-full cursor-pointer"
                        onClick={nextImage}
                        ><GrNext/></button>
                    </>
                }

                </div>
            </div>
        :''}
    </>
  )
}



export default ImageSlider