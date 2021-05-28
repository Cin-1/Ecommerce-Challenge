import react from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'

import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper'

SwiperCore.use([Autoplay, Navigation, Pagination])

const Carousel = () => {
  return (
    <Swiper
      slidesPerView={1}
      autoplay
      navigation
      pagination
      loop
      style={{ maxHeight: 'calc(70vh - 5rem)' }}
      className="object-fill"
    >
      <SwiperSlide>
        <img src="images/carousel/1.png" alt="carousel" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="images/carousel/2.png" alt="carousel" />
      </SwiperSlide>
    </Swiper>
  )
}

export default Carousel
