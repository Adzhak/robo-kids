import { useState, useEffect, useCallback } from "react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const slides = [
  { src: hero1, alt: "Дети собирают роботов" },
  { src: hero2, alt: "Дети программируют роботов" },
  { src: hero3, alt: "Робототехника в действии" },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, []);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden">
      {slides.map((slide, i) => (
        <img
          key={i}
          src={slide.src}
          alt={slide.alt}
          width={1920}
          height={1080}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
          {...(i !== 0 ? { loading: "lazy" as const } : {})}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 to-foreground/70" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h2 className="font-display text-3xl md:text-5xl font-extrabold text-card drop-shadow-lg mb-4">
          Робототехника для детей
        </h2>
        <p className="font-body text-card/90 text-base md:text-lg max-w-xl drop-shadow">
          Увлекательные онлайн-курсы по робототехнике для учеников 1–4 классов
        </p>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === current ? "bg-card w-7" : "bg-card/50"
            }`}
            aria-label={`Слайд ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
