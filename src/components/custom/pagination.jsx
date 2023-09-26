import React from "react";
import { useState } from "react";

const Pagination = ({ totalPage, skip, setSkip,btLoading,setBtLoading}) => {

    const divArray = Array.from({ length: totalPage });
    const [active,setActive] = useState(0)

    const handlePage = (page) => {
        if(page==0){
            setSkip(skip * page)
        }else if(page==1){
            setSkip(10)
        }else{
            setSkip(10*page)
        }
    }

    return (
        <div
            className={`flex justify-center mt-2`}
        >
            {divArray.map((i, j) => (
          <>
                <button
                    className={`px-4 py-1 mr-2 ${active==j?'bg-blue-500':'bg-blue-300'} text-sm hover:bg-blue-500 text-white rounded-lg`}
                    onClick={()=>{
                        setActive(j)
                        handlePage(j)
                        setBtLoading(true)
                    }}
                >
                    {btLoading&&active==j ? <div className='flex'><div className="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-white border-4"></div><p className="ml-2"></p></div> : j+1} 
                </button>
           </> ))}
        </div>
    );
};

export default Pagination;