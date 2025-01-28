import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SmoothCarousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // // Sample items - replace with your content
  // const items = [
  //   { id: 1, content: "Slide 1" },
  //   { id: 2, content: "Slide 2" },
  //   { id: 3, content: "Slide 3" },
  //   { id: 4, content: "Slide 4" }
  // ];

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500); // Match this with the transition duration

    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <>
      <style jsx>
        {`
* {
  scrollbar-width: thin;
  /* scrollbar-color: #035551 #f3f4f6; */
  scrollbar-color: #035551 #f3f4f6;
}

/* Webkit browsers (Chrome, Safari, Edge) */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f3f4f6;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background:#4ade80;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #18635f;
}

/* For horizontal scrollbars */
::-webkit-scrollbar-horizontal {
  height: 8px;
}

::-webkit-scrollbar-thumb:horizontal {
  background: #4ade80;
  border-radius: 4px;
}
`}
      </style>
      <div className={`w-full max-w-3xl mx-auto relative mt-8 ${currentIndex === 0 ? "overflow-hidden" : "border-2 border-emerald-600"} ${currentIndex && currentIndex !== 2 && currentIndex !== 4 && "overflow-y-scroll"} rounded-lg h-screen`}>
        {/* Main carousel container */}
        <div className="overflow-x-hidden relative rounded-lg">
          <div
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {items.map((item) => (
              <div
                key={item.id}
                className="w-full flex-shrink-0 flex items-center justify-center"
              >
                {/* Placeholder content */}
                <div className="w-full h-full flex justify-center">
                  {/* {item.content} */}
                  <item.content />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls container */}
        <div className="fixed top-1/2 left-0 right-0 flex justify-between items-center px-24">
          <button
            onClick={prevSlide}
            disabled={isAnimating}
            className={`${!currentIndex && "invisible"} p-2 rounded-full bg-primary hover:bg-white shadow-lg transition-colors duration-200 disabled:opacity-50`}
          >
            <ChevronLeft className="w-6 h-6 text-white hover:text-black" />
          </button>

          {/* Dots indicator */}
          {/* <div className="flex gap-2"> */}
          {/*   {items.map((_, index) => ( */}
          {/*     <button */}
          {/*       key={index} */}
          {/*       onClick={() => !isAnimating && setCurrentIndex(index)} */}
          {/*       className={`w-2 h-2 rounded-full transition-all duration-200 ${currentIndex === index ? 'bg-white w-4' : 'bg-white/60' */}
          {/*         }`} */}
          {/*     /> */}
          {/*   ))} */}
          {/* </div> */}

          <button
            onClick={nextSlide}
            disabled={isAnimating}
            className="p-2 rounded-full bg-primary hover:bg-white shadow-lg transition-colors duration-200 disabled:opacity-50"
          >
            <ChevronRight className="w-6 h-6 text-white hover:text-black" />
          </button>
        </div>
      </div>
    </>
  );
};

export default SmoothCarousel;
