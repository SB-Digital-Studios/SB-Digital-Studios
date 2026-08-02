import Swiper from 'swiper';
import { Autoplay, A11y } from 'swiper/modules';
import 'swiper/css';

export function initTestimonialsSlider() {
  const slider = document.querySelector('.testimonials__slider');
  if (!slider) return null;

  return new Swiper(slider, {
    modules: [Autoplay, A11y],
    slidesPerView: 1,
    spaceBetween: 18,
    loop: true,
    speed: 720,
    autoplay: {
      delay: 4300,
      disableOnInteraction: false
    },
    breakpoints: {
      768: { slidesPerView: 2 },
      1280: { slidesPerView: 3 }
    },
    a11y: {
      enabled: true
    }
  });
}
