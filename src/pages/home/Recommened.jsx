import React, { useEffect, useState } from 'react';
// Import Swiper components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';


// Import required modules
import { Pagination, Autoplay } from 'swiper/modules';
import BookCard from '../books/BookCard';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';

export default function App() {

  //const [books, setbooks] = useState([]);
    
   const { data: books = []} = useFetchAllBooksQuery();
    
   /* useEffect(() => {
          fetch("books.json")
          .then(res => res.json())
          .then((data)=> setbooks(data))
    }, []) */


  return (
    <div className=''>
      <h2 className='text-xl md:text-2xl font-semibold mb-4 ml-3'>Recommended</h2>

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
       {books.length > 0 && books.map((book, index) => (
            <SwiperSlide key={book._id || index}>
                <BookCard book={book} />
            </SwiperSlide>
        ))}
    </Swiper>
    </div>
  );
  
}
