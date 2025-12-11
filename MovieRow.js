import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar } from 'swiper/modules';
import MovieCard from './MovieCard';

// Swiper CSS
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

const MovieRow = ({ title, movies }) => {
  const swiperRef = useRef(null);

  if (!movies || movies.length === 0) return null;

  return (
    <div className="px-4 md:px-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
      
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Scrollbar]}
        spaceBetween={10}
        slidesPerView={2}
        navigation
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
          1280: { slidesPerView: 6 },
        }}
        className="!pb-8"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie._id}>
            <MovieCard movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieRow;
