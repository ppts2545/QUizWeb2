import React, { useState } from 'react';
import "./Slide.css";

import iu1 from '../../assets/images/iu1.jpeg';
import iu2 from '../../assets/images/iu2.jpeg';
import iu3 from '../../assets/images/iu3.jpeg';

type SliderProps = {
  slides?: Array<{
    id: number;
    image: string;
    caption: string;
  }>;
};

const Slider: React.FC<SliderProps> = ({ slides }) => {
  const defaultSlides = [
    { id: 1, image: iu1, caption: "Caption Text" },
    { id: 2, image: iu2, caption: "Caption Two" },
    { id: 3, image: iu3, caption: "Caption Three" }
  ];
  const slideList = slides && slides.length > 0 ? slides : defaultSlides;
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slideList.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slideList.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="slideshow-container">
      {slideList.map((slide, index) => (
        <div 
          key={slide.id}
          className={`mySlides fade ${index === currentSlide ? 'active' : ''}`}
          style={{ display: index === currentSlide ? 'block' : 'none' }}
        >
          <div className="numbertext">{slide.id} / {slideList.length}</div>
          <img src={slide.image}  alt={`Slide ${slide.id}`} />
          <div className="text">{slide.caption}</div>
        </div>
      ))}

      {/* Navigation buttons */}
      <button className="prev" onClick={prevSlide}>&#10094;</button>
      <button className="next" onClick={nextSlide}>&#10095;</button>

      {/* Dots indicator */}
      <div style={{ textAlign: 'center' }}>
        {slideList.map((_, index) => (
          <span 
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;