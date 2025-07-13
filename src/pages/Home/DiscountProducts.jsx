import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Autoplay } from 'swiper/modules';
import Container from '../../components/Container/Container';


const discountProducts = [
    { id: 1, name: 'Vitamin C Tablets', price: 15.99, discount: 30, img: 'https://www.lifevisionhealthcare.com/wp-content/uploads/2022/01/possible-benefits-of-vitamin-c-supplements-1440x810-1.jpg' },
    { id: 2, name: 'Pain Relief Spray', price: 9.99, discount: 20, img: 'https://tinyurl.com/bdzaz5bs' },
    { id: 3, name: 'Cold & Flu Syrup', price: 12.99, discount: 25, img: 'https://broncochem.com/cdn/shop/products/BroncochemKids_ColdFlu.jpg?v=1540160959' },
    { id: 5, name: 'Omega-3 Capsules', price: 19.99, discount: 15, img: 'https://medex.com.bd/storage/images/packaging/omg-3-1000-mg-capsule-74481713976-i1-fGcw23TD9IUAaUPQZ9Hn.jpg' },
    { id: 6, name: 'Zinc Supplement', price: 8.49, discount: 18, img: 'https://cdn2.hubspot.net/hubfs/419889/Zinc_Bottle.png' },
    { id: 7, name: 'Allergy Relief Tablets', price: 11.49, discount: 22, img: 'https://www.kroger.com/product/images/large/front/0074615578302' },
    { id: 8, name: 'Digestive Enzymes', price: 13.29, discount: 12, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoNGYQaPWB-Fkztb8vJ9i9r2L3iRknM0wB7w&s' },
];

export default function DiscountProductsSlider() {
    return (
        <section className="px-4 py-12 bg-white">
            <Container>
                <h2 className="text-3xl font-bold text-center mb-10 text-[#25A8D6]">Discount Products</h2>

                <Swiper
                    slidesPerView={3}
                    spaceBetween={24}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    modules={[Pagination, Autoplay]}
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                >
                    {discountProducts.map(product => (
                        <SwiperSlide key={product.id}>
                            <div className="border rounded-xl p-4 bg-white shadow-md text-center">
                                <span className="inline-block bg-[#25A8D6] text-white text-xs font-semibold px-2 py-1 rounded-md mb-2">
                                    -{product.discount}%
                                </span>

                                <div className="w-full h-40 bg-gray-50 rounded-md mb-4 flex items-center justify-center overflow-hidden">
                                    {product.img ? (
                                        <img src={product.img} alt={product.name} className="object-fill h-full w-full" />
                                    ) : (
                                        <span className="text-gray-400">No image</span>
                                    )}
                                </div>

                                <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>

                                <p className="text-sm text-gray-500 line-through">
                                    ${(product.price / (1 - product.discount / 100)).toFixed(2)}
                                </p>
                                <p className="text-lg font-bold text-[#25A8D6]">${product.price.toFixed(2)}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Container>
        </section>
    );
}
