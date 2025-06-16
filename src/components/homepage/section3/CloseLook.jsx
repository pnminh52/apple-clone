import gsap from "gsap";
import ProductView from "./ProductView";
import { rightImg } from "../../../utils";
import { useEffect, useRef, useState } from "react";
import { yellowImg } from "../../../utils";
import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { models, sizes } from "../../../constants";
import { animateWithGsapTimeline } from "../../../utils/animations";

const Model = () => {
  const titleRef = useRef(null);
const descRef = useRef(null);
  const [size, setSize] = useState('small');
  const [model, setModel] = useState({
    title: 'iPhone 15 Pro in Natural Titanium',
    color: ['#8F8A81', '#FFE7B9', '#6F6C64'],
    img: yellowImg,
  })
  const cameraControlSmall = useRef();
  const cameraControlLarge = useRef();
  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);
  const tl = gsap.timeline();

  useEffect(() => {
    if(size === 'large') {
      animateWithGsapTimeline(tl, small, smallRotation, '#view1', '#view2', {
        transform: 'translateX(-100%)',
        duration: 2
      })
    }

    if(size ==='small') {
      animateWithGsapTimeline(tl, large, largeRotation, '#view2', '#view1', {
        transform: 'translateX(0)',
        duration: 2
      })
    }
  }, [size]);
  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    );
  
    gsap.fromTo(
      descRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.6 }
    );
  }, []);
  



  return (
    <section className="">
      <div className="screen-max-width px-6">
    
      <h1 ref={titleRef} className="title-mobile py-4">
  Get the highlights.
</h1>

<div ref={descRef} className="flex items-center gap-1.5">
  <p className="text-blue-600 underline">Watch a event</p>
  <img src={rightImg} alt="event" />
</div>

        


        <div className="flex flex-col items-center">
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
            <ProductView 
              index={1}
              groupRef={small}
              gsapType="view1"
              controlRef={cameraControlSmall}
              setRotationState={setSmallRotation}
              item={model}
              size={size}
            />  

            <ProductView 
              index={2}
              groupRef={large}
              gsapType="view2"
              controlRef={cameraControlLarge}
              setRotationState={setLargeRotation}
              item={model}
              size={size}
            />

            <Canvas
              className="w-full h-full"
              style={{
                position: 'fixed',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: 'hidden'
              }}
              eventSource={document.getElementById('root')}
            >
              <View.Port />
            </Canvas>
          </div>

          <div className="mx-auto w-full">
            
            <p className="text-sm font-light text-center mb-3">{model.title}</p>

            <div className="flex items-center justify-center">
             <div className="flex items-center gap-2">
             <ul className="flex  items-center bg-[#181818] px-4 h-14 rounded-full">
                {models.map((item, i) => (
                  <li key={i} className="w-6 h-6 rounded-full mx-2 cursor-pointer" style={{ backgroundColor: item.color[0] }} onClick={() => setModel(item)} />
                ))}
              </ul>

              <button className="bg-[#181818]  flex justify-center mx-auto text-center px-4 h-14 items-center rounded-full">
              {sizes.map(({ label, value }) => (
  <span
    key={label}
    className={`w-6 h-6 rounded-full flex justify-center items-center gap-2 cursor-pointer
      ${size === value ? 'bg-white text-black' : 'bg-transparent text-white'}`}
    onClick={() => setSize(value)}
  >
    {label}
  </span>
))}

              </button>
             </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Model