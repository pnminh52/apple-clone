import React from "react";
import { appleImg, bagImg, searchImg } from "../../utils";

const Navbar = () => {
    const device = ["iPhone", "Macbooks", "Tablet", "Support"];

  return (
    <header className="w-full px-6 py-4 bg-[#0C0C0C]  sm:px-20 flex justify-between items-center">
      <nav className="flex ">
        <img className="w-6 h-6" src={appleImg} alt="Apple"  />
      </nav>
      <div className="hidden sm:block">
 <div className="flex gap-4 ">
        {device.map((item)=>{
            return(
                <div className="transition duration-200 ease-in-out cursor-pointer hover:text-white text-gray-400" key={item}>{item}</div>
            )
        })}
      </div>
      </div>
     
      <div className="flex gap-4">
        <img className="w-4.5 h-4.5" src={searchImg} alt="" />
         <img className="w-4.5 h-4.5" src={bagImg} alt="" />
      </div>
    </header>
  );
};

export default Navbar;
