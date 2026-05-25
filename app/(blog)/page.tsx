import Image from "next/image";
import {
  Leaf,
  MapPin,
  VolumeX,
  Droplets,
  Zap,
  Signal,
  Lock,
  Mountain,
  Users,
} from "lucide-react";
import { sanityFetch } from "@/sanity/lib/fetch";
import { cabinsQuery } from "@/sanity/lib/queries";
import ContactForm from "./contact-form";
import { amenityIcons } from "@/app/lib/amenities";
import Link from "next/link";
import type { Cabin } from "@/app/lib/types";
import { optimizeImage } from "@/app/lib/image";
import LazyMap from "./lazy-map";

const highlights = [
  { icon: <Leaf size={28} />, label: "Naturaleza pura" },
  { icon: <MapPin size={28} />, label: "A 30 min de Medellín" },
  { icon: <VolumeX size={28} />, label: "Paz y tranquilidad" },
  { icon: <Droplets size={28} />, label: "Servicios incluidos" },
];

const includes = [
  { icon: <Zap size={32} />, label: "Energía eléctrica" },
  { icon: <Droplets size={32} />, label: "Acueducto" },
  { icon: <Signal size={32} />, label: "Internet fibra óptica" },
  { icon: <Leaf size={32} />, label: "Mantenimiento zona verde" },
  { icon: <Lock size={32} />, label: "Portón eléctrico" },
  { icon: <Mountain size={32} />, label: "Entorno natural único" },
];

export default async function Page() {
  const cabins = await sanityFetch({ query: cabinsQuery });

  return (
    <main className="font-[var(--font-poppins)]">
      <section className="relative h-screen min-h-[600px] flex items-center justify-center text-white">
        <Image
          src="/hero.jpg"
          alt="Atardecer en Santa Elena - Hanako Cabañas"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          quality={85}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(91,67,31,0.55), rgba(91,67,31,0.75))",
          }}
        />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin size={14} style={{ color: "#FBBE00" }} />
            <p
              className="text-sm uppercase tracking-widest"
              style={{ color: "#FBBE00" }}
            >
              Santa Elena · Medellín
            </p>
          </div>
          <h1
            className="text-6xl md:text-8xl font-bold mb-4 tracking-tight"
            style={{
              fontFamily: "'Azonix', 'Arial Black', sans-serif",
              color: "#FBBE00",
            }}
          >
            HANAKO
          </h1>
          <p className="text-xl md:text-2xl mb-2 font-light italic">
            Lo bello de la vida
          </p>
          <p className="text-base md:text-lg mt-4 mb-8 text-white/80 max-w-xl mx-auto">
            Dos cabañas únicas rodeadas de naturaleza, paz y bosque en las
            montañas de Santa Elena.
          </p>
          <a
            href="#cabanas"
            className="inline-block px-8 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105"
            style={{ background: "#F96F00", color: "#fff" }}
          >
            Ver cabañas
          </a>
        </div>
      </section>

      <section style={{ background: "#5B431F" }} className="py-10 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {highlights.map((h) => (
            <div key={h.label} className="flex flex-col items-center gap-2">
              <div style={{ color: "#FBBE00" }}>{h.icon}</div>
              <p className="text-sm font-medium">{h.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="cabanas"
        className="py-20 px-6"
        style={{ background: "#fffdf7" }}
      >
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-4xl font-bold text-center mb-2"
            style={{ color: "#5B431F" }}
          >
            Nuestras Cabañas
          </h2>
          <p className="text-center text-gray-500 mb-12">
            Cada cabaña es un mundo. Elige la tuya.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {cabins.map((cabin: Cabin) => (
              <Link
                key={cabin._id}
                href={`/cabanas/${cabin.slug}`}
                className="block rounded-3xl overflow-hidden shadow-lg bg-white transition-transform hover:scale-[1.02]"
              >
                <article>
                  {cabin.photos?.[0]?.url && (
                    <div className="relative h-64 w-full">
                      <Image
                        src={optimizeImage(cabin.photos[0].url!, 800)}
                        alt={cabin.photos[0].alt ?? cabin.name ?? "Cabaña"}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3
                      className="text-xl font-bold mb-1"
                      style={{ color: "#5B431F" }}
                    >
                      {cabin.name}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4">
                      {cabin.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="text-2xl font-bold"
                        style={{ color: "#F96F00" }}
                      >
                        {new Intl.NumberFormat("es-CO", {
                          style: "currency",
                          currency: "COP",
                          maximumFractionDigits: 0,
                        }).format(cabin.pricePerNight ?? 0)}
                        <span className="text-sm font-normal text-gray-400">
                          {" "}
                          /noche
                        </span>
                      </span>
                      <span className="text-sm text-gray-400 flex items-center gap-1">
                        <Users size={14} />
                        Máx. {cabin.maxGuests}
                      </span>
                    </div>

                    {cabin.amenities && cabin.amenities.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-5">
                        {cabin.amenities.map((amenity) => {
                          const a = amenityIcons[amenity];
                          return (
                            <span
                              key={amenity}
                              className="flex items-center gap-1 text-xs px-3 py-1 rounded-full font-medium"
                              style={{
                                background: "#FFF3DC",
                                color: "#5B431F",
                              }}
                            >
                              <span style={{ color: "#F96F00" }}>
                                {a?.icon}
                              </span>
                              {a?.label ?? amenity}
                            </span>
                          );
                        })}
                      </div>
                    )}

                    <div
                      className="flex items-center justify-center gap-2 py-3 rounded-full text-white text-sm font-semibold"
                      style={{ background: "#F96F00" }}
                    >
                      Ver cabaña
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6" style={{ background: "#5B431F" }}>
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-2" style={{ color: "#FBBE00" }}>
            Todo incluido
          </h2>
          <p className="text-white/70 mb-12">
            Para que solo te preocupes por descansar
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {includes.map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-3"
              >
                <div style={{ color: "#FBBE00" }}>{item.icon}</div>
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6" style={{ background: "#fffdf7" }}>
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-4xl font-bold text-center mb-2"
            style={{ color: "#5B431F" }}
          >
            ¿Dónde estamos?
          </h2>
          <p className="text-center text-gray-500 mb-10">
            Santa Elena, Medellín · A 30 minutos del centro
          </p>
          <LazyMap />
          <div className="flex items-center justify-center gap-2 mt-6">
            <a
              href="https://maps.google.com/?q=Santa+Elena+Medellín"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-semibold transition-all hover:scale-105"
              style={{ background: "#F96F00" }}
            >
              <MapPin size={16} />
              Abrir en Google Maps
            </a>
          </div>
        </div>
      </section>

      <div className="border-t-2 border-[#5B431F] mx-[6%]"></div>

      <section
        id="contacto"
        className="py-20 px-6"
        style={{ background: "#fffdf7" }}
      >
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-2" style={{ color: "#5B431F" }}>
            ¿Tienes preguntas?
          </h2>
          <p className="text-gray-500 mb-10">
            Escríbenos por WhatsApp y te respondemos enseguida.
          </p>
          <ContactForm whatsapp="573104966572" />
        </div>
      </section>

      <footer
        className="py-8 text-center text-sm"
        style={{ background: "#5B431F", color: "#FBBE00" }}
      >
        <p className="font-bold tracking-widest text-lg mb-1">HANAKO</p>
        <p className="text-white/60 italic text-xs">Lo bello de la vida</p>
        <p className="text-white/40 text-xs mt-3">
          Santa Elena · Medellín · Colombia
        </p>
      </footer>
    </main>
  );
}
