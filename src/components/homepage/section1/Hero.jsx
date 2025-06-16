import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { heroVideo, smallHeroVideo } from '../../../utils';

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(
    window.innerWidth < 760 ? smallHeroVideo : heroVideo
  );

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 760;
      setVideoSrc(isMobile ? smallHeroVideo : heroVideo);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useGSAP(() => {
    gsap.to('#titleBox', { opacity: 1, y: 0, delay: 2.5 });
    gsap.to('#contentBanner', { opacity: 1, y: 0, delay: 2.5 });
  }, []);

  return (
    <div className='w-full relative'>
      <div className='h-5/6 w-full flex justify-center flex-col items-center'>
        {/* BOX chứa cả title và mô tả */}
        <div id='titleBox' className='opacity-0 mb-6 mt-6 flex flex-col items-center space-y-1'>
          <p className='text-white text-3xl font-semibold'>iPhone 15 Pro</p>
          <p className='text-white text-sm'>Titanium. So strong. So light. So Pro.</p>
        </div>

        <div>
          <video key={videoSrc} autoPlay muted playsInline className='w-full h-auto'>
            <source src={videoSrc} type='video/mp4' />
          </video>
        </div>
      </div>

      <div
        className='opacity-0 mb-10  space-y-2 flex flex-col items-center translate-y-20'
        id='contentBanner'
      >
        <a
          href=''
          className='text-white bg-blue-600 px-6 py-2 border border-blue-600 hover:bg-black transition duration-300 ease-in-out rounded-full cursor-pointer hover:text-blue-600'
        >
          Explore now!
        </a>
        <p className=''>From 199$/month or 999$</p>
      </div>
    </div>
  );
};

export default Hero;
