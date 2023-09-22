import React from "react";
import { useState } from "react";

const Pagination = ({ totalPage, skip, setSkip}) => {

    const divArray = Array.from({ length: totalPage });
    const [active,setActive] = useState(0)

    const handlePrevPage = (page) => {
        if(page==0){
            setSkip(skip * page)
        }else if(page==1){
            setSkip(10)
        }else{
            setSkip(skip*page)
        }
    };
    console.log(skip);

    return (
        <div
            className={`flex justify-center mt-2`}
        >
            {divArray.map((i, j) => (
                <button
                    className={`px-4 py-1 mr-2 ${active==j?'bg-blue-500':'bg-blue-300'} text-sm hover:bg-blue-500 text-white rounded-lg`}
                    onClick={()=>{
                        setActive(j)
                        handlePrevPage(j)}}
                >
                    {j+1}
                </button>
            ))}
        </div>
    );
};

export default Pagination;