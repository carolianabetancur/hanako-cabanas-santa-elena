import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Flame, Wifi, ArrowLeft, Users, MessageCircle } from "lucide-react";
import { sanityFetch } from "@/sanity/lib/fetch";
import { cabinBySlugQuery, cabinSlugsQuery } from "@/sanity/lib/queries";
import { amenityIcons } from "@/app/lib/amenities";
import type { Cabin, CabinPhoto } from "@/app/lib/types";
import type { ClientPerspective } from "next-sanity";
import PhotoGallery from "./photo-gallery";

export async function generateStaticParams() {
  const cabins = await sanityFetch({
    query: cabinSlugsQuery,
    perspective: "published" as ClientPerspective,
    stega: false,
  });
  return cabins.map((cabin: { slug: string | null }) => ({
    slug: cabin.slug ?? "",
  }));
}

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export default async function CabinPage({ params }: Props) {
  const { slug } = await params;
  const cabin = await sanityFetch({
    query: cabinBySlugQuery,
    params: { slug },
  });

  if (!cabin) notFound();

  const priceFormatted = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(cabin.pricePerNight ?? 0);

  const whatsappUrl = `https://wa.me/573104966572?text=${encodeURIComponent(
    `Hola! Me interesa reservar la ${cabin.name}`,
  )}`;

  return (
    <main
      style={{ fontFamily: "'Poppins', sans-serif", background: "#fffdf7" }}
    >
      <nav
        className="px-6 py-4 flex items-center justify-between"
        style={{ background: "#5B431F" }}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
          style={{ color: "#FBBE00" }}
        >
          <ArrowLeft size={16} />
          Volver
        </Link>
        <span
          className="font-bold tracking-widest text-sm"
          style={{ color: "#FBBE00" }}
        >
          HANAKO
        </span>
      </nav>

      {cabin.photos && cabin.photos.length > 0 && (
        <PhotoGallery photos={cabin.photos} />
      )}

      <section className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2 flex flex-col gap-8">
          <div>
            <h1
              className="text-4xl font-bold mb-3"
              style={{ color: "#5B431F" }}
            >
              {cabin.name}
            </h1>
            <div
              className="flex items-center gap-2 text-sm"
              style={{ color: "#F96F00" }}
            >
              <Users size={15} />
              <span>Máx. {cabin.maxGuests} huéspedes</span>
            </div>
          </div>

          <hr style={{ borderColor: "#F96F00", opacity: 0.2 }} />

          <div>
            <h2
              className="text-lg font-semibold mb-3"
              style={{ color: "#5B431F" }}
            >
              Sobre esta cabaña
            </h2>
            <p className="text-gray-600 leading-relaxed">{cabin.description}</p>
          </div>

          <hr style={{ borderColor: "#F96F00", opacity: 0.2 }} />

          {cabin.amenities && cabin.amenities.length > 0 && (
            <div>
              <h2
                className="text-lg font-semibold mb-4"
                style={{ color: "#5B431F" }}
              >
                Lo que incluye
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {cabin.amenities.map((amenity: string) => {
                  const a = amenityIcons[amenity];
                  return (
                    <div
                      key={amenity}
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium"
                      style={{ background: "#FFF3DC", color: "#5B431F" }}
                    >
                      <span style={{ color: "#F96F00" }}>{a?.icon}</span>
                      {a?.label ?? amenity}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="md:col-span-1">
          <div
            className="rounded-3xl p-6 shadow-xl sticky top-6 flex flex-col gap-4"
            style={{ background: "#5B431F" }}
          >
            <div>
              <p className="text-4xl font-bold" style={{ color: "#FBBE00" }}>
                {priceFormatted}
              </p>
              <p
                className="text-sm mt-1"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                por noche · servicios incluidos
              </p>
            </div>

            <hr style={{ borderColor: "rgba(255,255,255,0.15)" }} />

            <ul
              className="flex flex-col gap-2 text-sm"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              <li className="flex items-center gap-2">
                <Users size={14} style={{ color: "#FBBE00" }} />
                Máx. {cabin.maxGuests} huéspedes
              </li>
              <li className="flex items-center gap-2">
                <Wifi size={14} style={{ color: "#FBBE00" }} />
                Internet fibra óptica incluido
              </li>
              <li className="flex items-center gap-2">
                <Flame size={14} style={{ color: "#FBBE00" }} />
                Energía y acueducto incluidos
              </li>
            </ul>

            <hr style={{ borderColor: "rgba(255,255,255,0.15)" }} />

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-white text-sm font-semibold transition-all hover:scale-105"
              style={{ background: "#25D366" }}
            >
              <MessageCircle size={18} />
              Reservar por WhatsApp
            </a>

            <p
              className="text-center text-xs"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Sin cargos adicionales · Respuesta inmediata
            </p>
          </div>
        </div>
      </section>

      <footer
        className="py-8 text-center text-sm"
        style={{ background: "#5B431F", color: "#FBBE00" }}
      >
        <p className="font-bold tracking-widest text-lg mb-1">HANAKO</p>
        <p
          className="text-xs italic"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          Lo bello de la vida
        </p>
        <p className="text-xs mt-3" style={{ color: "rgba(255,255,255,0.3)" }}>
          Santa Elena · Medellín · Colombia
        </p>
      </footer>
    </main>
  );
}
