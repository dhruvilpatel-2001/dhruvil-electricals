"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient.js";
export default function TestimonialsSlider() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .order("id", { ascending: true });

    setTestimonials(data || []);
  };

  return (
    <section id="testimonials" className="testimonials-section py-5">
      <div className="container">

        {/* Heading */}
        <div className="text-center mb-5">
          <span className="section-tag text-primary fw-bold">TESTIMONIALS</span>
          <h2 className="section-title fw-bold mt-2">What Our Clients Say</h2>
        </div>

        {/* Slider */}
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false, // IMPORTANT FIX
          }}
          pagination={{ clickable: true }}
          spaceBetween={30}
          loop={true}
          speed={900} // smooth transition
          effect="slide"
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
          }}
          className="testimonial-swiper"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="testimonial-card premium-card p-4">

                {/* Avatar */}
                <div className="text-center mb-3">
                  <img
                    src={t.avatar_url}
                    className="testimonial-avatar"
                    alt={t.name}
                  />
                </div>

                {/* Message */}
                <p className="testimonial-message text-center">
                  "{t.message}"
                </p>

                {/* Name */}
                <h5 className="text-center fw-bold mt-3">{t.name}</h5>

                {/* Rating */}
                <div className="text-center text-warning mt-2 star-rating">
                  {"★".repeat(t.rating)}
                  {"☆".repeat(5 - t.rating)}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}
