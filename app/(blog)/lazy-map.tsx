"use client";
import { useEffect, useRef, useState } from "react";

export default function LazyMap() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { rootMargin: "200px" },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="rounded-3xl overflow-hidden shadow-lg"
      style={{ height: 400 }}
    >
      {visible ? (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15885.123456789!2d-75.5012!3d6.2159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4429b2e8b1c3d5%3A0x1234567890abcdef!2sSanta%20Elena%2C%20Medell%C3%ADn!5e0!3m2!1ses!2sco!4v1234567890"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación Hanako - Santa Elena, Medellín"
        />
      ) : (
        <div className="w-full h-full bg-[#e8e0d5] flex items-center justify-center">
          <span className="text-[#5B431F] text-sm">Cargando mapa...</span>
        </div>
      )}
    </div>
  );
}
