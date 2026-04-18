import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const slides = [
    {
        id: 1,
        title: "Nueva Colección de Figuras",
        subtitle: "Ediciones limitadas importadas de Japón",
        image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&q=80&w=1600",
    },
    {
        id: 2,
        title: "Héroes y Villanos",
        subtitle: "Encuentra tus personajes favoritos de Marvel y DC",
        image: "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?auto=format&fit=crop&q=80&w=1600",
    },
    {
        id: 3,
        title: "Preventas Exclusivas",
        subtitle: "Asegura tu pieza antes que nadie",
        image: "https://images.unsplash.com/photo-1559535332-db9971090158?auto=format&fit=crop&q=80&w=1600",
    }
];

export const HeroCarousel = () => {
    return (
        /* Reducimos las alturas aquí */
        <div className="w-full h-100 lg:h-90 overflow-hidden flex flex-col">
            <div className="h-12 flex items-center justify-center bg-orange-600 text-white text-center py-2 text-sm font-bold uppercase tracking-widest z-20">
                <p>Titular Pendiente</p>
            </div>
            <Swiper
                spaceBetween={0}
                centeredSlides={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="h-full w-full"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative w-full h-full">
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="absolute inset-0 w-full h-full object-cover"
                            />

                            <div className="absolute inset-0 bg-black/40 bg-linear-to-t from-black/70 via-transparent to-transparent" />

                            <div className="relative h-full flex flex-col items-center justify-center text-center px-4 text-white">
                                <h2 className="text-3xl md:text-5xl font-bold mb-2 drop-shadow-lg">
                                    {slide.title}
                                </h2>
                                <p className="text-base md:text-lg mb-6 max-w-2xl opacity-90">
                                    {slide.subtitle}
                                </p>
                                <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2.5 rounded-full font-bold transition-all transform active:scale-95 shadow-xl cursor-pointer">
                                    Ver Catálogo
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HeroCarousel;