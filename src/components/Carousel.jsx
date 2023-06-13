import "../styles/Carousel.css";
import React, { useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs/index.js";

export const Carousel = ({ data }) => {
    const [slide, setSlide] = useState(0);

    const nextSlide = () => {
        setSlide(slide === data.length - 1 ? 0 : slide + 1);
    };

    const prevSlide = () => {
        setSlide(slide === 0 ? data.length - 1 : slide - 1);
    };

    return (
        <div className="carousel">
            <BsArrowLeftCircleFill 
                title="Navigate left"
                className="arrow arrow-left" 
                onClick={prevSlide}
            />
            {data.map((item, idx) => {
                return (
                    <img
                        src={item.src} 
                        alt={item.alt} 
                        key={idx} 
                        className={slide === idx ? "slide" : "slide slide-hidden"}
                    />
                );
        })}
        <BsArrowRightCircleFill 
            title="Navigate right"
            className="arrow arrow-right" 
            onClick={nextSlide}
        />
        <span className="indicators">
            {data.map((_, idx) => {
                return (
                    <button 
                        title="image indicator"
                        key={idx} 
                        onClick={() => setSlide(idx)} 
                        className={slide === idx ? "indicator" : "indicator indicator-inactive"}>
                    </button>
                );
            })}
        </span>
        </div>
    );
};

export default Carousel;