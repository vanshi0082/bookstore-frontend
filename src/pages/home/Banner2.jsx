import React from 'react';
import banner from "../../assets/fav.jpg";

const Banner2 = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center text-center md:text-left md:mt-12 md:mb-16 md:ml-3 px-4">
      {/* Image Section */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-start">
        <img 
          src={banner} 
          alt="banner2" 
          className="w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[420px] md:h-[420px] object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Text Section */}
      <div className="w-full md:w-1/2 mt-6 md:mt-0 md:ml-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Find Your Favorite</h2>
        <h2 className="text-blue-700 text-2xl sm:text-3xl md:text-4xl font-bold">Book Here!</h2>
        <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed mt-4">
          Books have the power to transport you to another world, to spark creativity, and to inspire new ideas. Whether you're an avid reader or just starting your literary journey, our carefully curated collection has something for everyone. Dive into captivating stories, expand your knowledge, and rediscover the magic of reading. Your next favorite book is just a page away!
        </p>
      </div>
    </div>
  );
}

export default Banner2;
