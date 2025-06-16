import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
import { useEffect, useRef, useState } from "react";

import { hightlightsSlides } from "../../../constants";

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);
  
  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const [loadedData, setLoadedData] = useState([]);
  const { isEnd, startPlay, videoId, isPlaying } = video;

  useGSAP(() => {
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut",
    });

    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((pre) => ({
          ...pre,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);

 

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  const handleProcess = (type, i) => {
    switch (type) {
        case "video-end":
            setVideo((pre) => ({
              ...pre,
              isEnd: true,
              videoId: (i + 1) % hightlightsSlides.length,
            }));
            break;
          
    //   case "video-last":
    //     setVideo((pre) => ({ ...pre, isLastVideo: true }));
    //     break;
      case "video-reset":
        setVideo((pre) => ({ ...pre, videoId: 0, isLastVideo: false }));
        break;
      case "pause":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;
      case "play":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;
      default:
        return video;
    }
  };

  const handleLoadedMetaData = (i, e) =>
    setLoadedData((pre) => [...pre, e]);
  

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} id="slider" className="sm:pr-5 pr-5">
            <div className="relative w-[88vw] sm:w-[70vw] h-[35vh] sm:h-[50vh] md:h-[70vh]">
              <div className="w-full h-full flex items-center justify-center rounded-3xl overflow-hidden bg-black">
                <video
                  id="video"
                  playsInline
                  className={`${
                    list.id === 2 ? "translate-x-44" : ""
                  } pointer-events-none`}
                  preload="auto"
                  muted
                  ref={(el) => (videoRef.current[i] = el)}
                  onEnded={() => handleProcess("video-end", i)}
                  onPlay={() =>
                    setVideo((pre) => ({ ...pre, isPlaying: true }))
                  }
                  onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>

              <div className="absolute top-4 left-4 sm:top-12 sm:left-12 z-10">
                {list.textLists.map((text, i) => (
                  <p key={i} className="md:text-xl text-sm sm:text-xl ">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex items-center justify-center mx-auto gap-4 overflow-auto hide-scrollbar ">
        <div className="flex items-center justify-center h-9 px-4 bg-[#181818] backdrop-blur rounded-full">
        {videoRef.current.map((_, i) => (
  <span
    key={i}
    className={`mx-1 w-2 h-2 rounded-full relative cursor-pointer transition-all duration-300 ${
      videoId === i ? "bg-white " : "bg-[#6B6B6B]"
    }`}
    ref={(el) => (videoDivRef.current[i] = el)}
  >
    <span
      className="absolute h-full w-full rounded-full"
      ref={(el) => (videoSpanRef.current[i] = el)}
    />
  </span>
))}

        </div>

        {/* <button
          className="  cursor-pointer  bg-[#171717] p-4 rounded-full shadow-md z-20"
        >
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            onClick={
              isLastVideo
                ? () => handleProcess("video-reset")
                : !isPlaying
                ? () => handleProcess("play")
                : () => handleProcess("pause")
            }
          />
        </button> */}
      </div>
    </>
  );
};

export default VideoCarousel;
