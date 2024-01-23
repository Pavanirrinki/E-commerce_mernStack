import React, { useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import aeroplane from "../Images/aeroplane.jpg"
import downloaded from "../Images/download.jpeg"
import travel from "../Images/images.jpeg"
import "./Carousel.css";

 const Carousel = () => {
  const [slide, setSlide] = useState(0);
const data =[aeroplane,downloaded,travel]
useEffect(()=>{
   const interval = setInterval(()=>{
    setSlide(slide === data.length - 1 ? 0 : slide + 1);
},2000)
return () => clearInterval(interval);
},[slide])
  const nextSlide = () => {
    setSlide(slide === data.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? data.length - 1 : slide - 1);
  };

  return (
    <div className="carousel">
      <BsArrowLeftCircleFill onClick={prevSlide} className="arrow arrow-left" />
      {data.map((item, idx) => {
        return (
          <img
            src={item}
            alt='image'
            key={idx}
            className={slide === idx ? "slide" : "slide slide-hidden"}
          />
        );
      })}
      <BsArrowRightCircleFill
        onClick={nextSlide}
        className="arrow arrow-right"
      />
      <span className="indicators">
        {data.map((_, idx) => {
          return (
            <button
              key={idx}
              className={
                slide === idx ? "indicator" : "indicator indicator-inactive"
              }
              onClick={() => setSlide(idx)}
            ></button>
          );
        })}
      </span>
    </div>
  );
};
export default Carousel;