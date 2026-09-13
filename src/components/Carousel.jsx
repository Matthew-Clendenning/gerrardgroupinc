import "../styles/Carousel.css";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs/index.js";

export const Carousel = ({ data }) => {
    const [slide, setSlide] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const nextSlide = () => setSlide((s) => (s === data.length - 1 ? 0 : s + 1));
    const prevSlide = () => setSlide((s) => (s === 0 ? data.length - 1 : s - 1));

    const openLightbox = () => setIsOpen(true);
    const closeLightbox = () => setIsOpen(false);

    // Lock body scroll while the lightbox is open
    useEffect(() => {
        if (isOpen) {
            const prev = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            return () => { document.body.style.overflow = prev; };
        }
    }, [isOpen]);

    // Keyboard controls while the lightbox is open
    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e) => {
            if (e.key === "Escape") closeLightbox();
            else if (e.key === "ArrowRight") nextSlide();
            else if (e.key === "ArrowLeft") prevSlide();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isOpen]);

    const indicators = (extraClass = "") => (
        <span className={`indicators ${extraClass}`}>
            {data.map((_, idx) => (
                <button
                    title="image indicator"
                    key={idx}
                    onClick={() => setSlide(idx)}
                    className={slide === idx ? "indicator" : "indicator indicator-inactive"}>
                </button>
            ))}
        </span>
    );

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
                        width={640}
                        height={480}
                        loading={idx === 0 ? "eager" : "lazy"}
                        decoding="async"
                        onClick={openLightbox}
                        role="button"
                        tabIndex={slide === idx ? 0 : -1}
                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(); } }}
                        title="Click to enlarge"
                        className={slide === idx ? "slide" : "slide slide-hidden"}
                    />
                );
            })}
            <BsArrowRightCircleFill
                title="Navigate right"
                className="arrow arrow-right"
                onClick={nextSlide}
            />
            {indicators()}

            {isOpen && createPortal(
                <div
                    className="lightbox"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Image gallery"
                    onClick={(e) => { if (e.target === e.currentTarget) closeLightbox(); }}>
                    <button
                        className="lightbox__close"
                        aria-label="Close image viewer"
                        onClick={closeLightbox}>
                        &times;
                    </button>
                    <BsArrowLeftCircleFill
                        title="Navigate left"
                        className="arrow arrow-left"
                        onClick={prevSlide}
                    />
                    <img
                        className="lightbox__img"
                        src={data[slide].src}
                        alt={data[slide].alt}
                    />
                    <BsArrowRightCircleFill
                        title="Navigate right"
                        className="arrow arrow-right"
                        onClick={nextSlide}
                    />
                    {indicators("lightbox__indicators")}
                </div>,
                document.body
            )}
        </div>
    );
};

export default Carousel;
