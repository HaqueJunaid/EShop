import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Link } from 'react-router-dom';

export default function HeroSwipper() {

  const swiperImageLinks = [
    {
      imageUrl: "https://srishbish.com/cdn/shop/files/8_31425465-11e8-48f4-91b2-d80114555c12_1905x.progressive.jpg?v=1741613934",
      linkUrl: "/products/all"
    },
    {
      imageUrl: "https://srishbish.com/cdn/shop/files/5_07a7b7d8-c794-47ea-be24-b7432d93d798_1905x.progressive.jpg?v=1741613933",
      linkUrl: "/products/all"
    },
    {
      imageUrl: "https://srishbish.com/cdn/shop/files/7_0ef3b11f-2e58-4923-8fcb-210b212482c6_1905x.progressive.jpg?v=1741613934",
      linkUrl: "/products/all"
    }
  ]

  return (
    <>
      <Swiper
        spaceBetween={0}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="h-screen mySwiper"
      >
        {swiperImageLinks.map((items, index) => (
        <SwiperSlide key={index} className='bg-blue-200 w-full h-full'>
          <Link to={items.linkUrl} className='w-full h-full'>
            <img src={items.imageUrl} alt="" className='w-full h-full object-cover' />
          </Link>
        </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
