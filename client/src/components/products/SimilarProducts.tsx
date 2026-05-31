import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import { Suspense } from 'react';
import CollectionCard from './CollectionCard';

export default function SimilarProducts() {

    const products = [
        {
            id: 1,
            title: 'Mini Suitcase',
            imageUrl:
                'https://picsum.photos/600/500',
            to: '/products/mini-suitcase',
        },
        {
            id: 2,
            title: 'Wedding Badge',
            imageUrl:
                'https://picsum.photos/600/600',
            to: '/products/wedding-badge',
        },
        {
            id: 3,
            title: 'Wedding Card',
            imageUrl:
                'https://picsum.photos/700/500',
            to: '/products/wedding-card',
        },
        {
            id: 4,
            title: 'Decors',
            imageUrl:
                'https://picsum.photos/500/700',
            to: '/products/decors',
        },
        {
            id: 5,
            title: 'Greeting Card',
            imageUrl:
                'https://picsum.photos/800/500',
            to: '/products/greeting-card',
        },
        {
            id: 6,
            title: 'Name Patch',
            imageUrl:
                'https://picsum.photos/500/800',
            to: '/products/name-patch',
        },
        {
            id: 7,
            title: 'Mini Suitcase',
            imageUrl:
                'https://picsum.photos/900/500',
            to: '/products/all',
        },
        {
            id: 8,
            title: 'Mini Suitcase',
            imageUrl:
                'https://picsum.photos/500/900',
            to: '/products/all',
        }
    ]

    return (
        <>
            <Swiper
                slidesPerView={1}
                spaceBetween={16}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
                breakpoints={{
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    },
                }}
            >
                {products.map((c) => (
                    <SwiperSlide key={c.id}>
                        <Suspense>
                            <CollectionCard {...c} />
                        </Suspense>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}
