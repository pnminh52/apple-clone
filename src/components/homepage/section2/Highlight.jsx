import React from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { watchImg,rightImg } from '../../../utils';
import VideoSlider from "./VideoSlider"
const Highlight = () => {
      useGSAP(() => {
        gsap.to('#title', { opacity: 1, delay: 2.5 });
        gsap.to('#contentBanner', { opacity: 1, y:0, delay: 2.5 });
        gsap.to('.link', { opacity: 1, y:0, duration:1, stagger:0.25, delay:2.5 });
      }, []);
  return (
    <div  className='w-screen block sm:hidden  px-6 sm:px-20 overflow-hidden h-full bg-[#0C0C0C] '>
      <div className=''>
            <h1 className=' title-mobile  py-6' id='title'>Get the highlights.</h1>
      </div>
      <div className='flex flex-wrap gap-5 items-center pb-4'>
        
      <div className='flex items-center gap-1.5'>
  <p className='link opacity-0 translate-y-5 text-blue-600 underline'>Watch a film</p>
  <img className='link opacity-0 translate-y-5' src={watchImg} alt="watch" />
</div>
<div className='flex items-center gap-1.5'>
  <p className='link opacity-0 translate-y-5 text-blue-600 underline'>Watch a event</p>
  <img className='link opacity-0 translate-y-5' src={rightImg} alt="event" />
</div>
<VideoSlider />
        


      </div>
    </div>
  )
}

export default Highlight
