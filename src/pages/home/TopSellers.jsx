import React, { useEffect, useState } from 'react'
import BookCard from '../books/BookCard';
import 'swiper/css/pagination';
// Import Swiper React components

import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules

// Import Swiper styles



// Import Swiper styles
import 'swiper/css';


import { Autoplay, Pagination } from 'swiper/modules';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';

const categories = ["Choose a genre", "Business", "Fiction", "Horror", "Adventure"]

const TopSellers = () => {
    
    const [selectedCategory, setSelectedCategory] = useState("Choose a genre");

   const {data: books = []} = useFetchAllBooksQuery();
  
    const filteredBooks = selectedCategory === "Choose a genre" ? books : books.filter(book => book.category === selectedCategory.toLowerCase())

    return (
        <div className='py-10'>
            <h2 className='text-3xl font-semibold mb-6'>Top Sellers</h2>
            {/* category filtering */}
            <div className='mb-8 flex items-center'>
                <select
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    name="category" id="category" className='border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none'>
                    {
                        categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))
                    }
                </select>
            </div>

            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 3000, // Change slide every 3 seconds
                disableOnInteraction: false, // Allows user interaction without stopping autoplay
              }}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 30 },
                1024: { slidesPerView: 3, spaceBetween: 30 },
              }}
              modules={[Pagination, Autoplay]} // Include Autoplay module
              className="mySwiper"
            >
      
        {
         filteredBooks.length > 0 && filteredBooks.map((book,index)=>(
            <SwiperSlide key={index}><BookCard key={index} book={book} /></SwiperSlide>
            
          ))
        }
      </Swiper>
      


        </div>
    )
}

export default TopSellers