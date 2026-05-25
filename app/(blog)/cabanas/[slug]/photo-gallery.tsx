"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { optimizeImage } from "@/app/lib/image";

type Photo = {
  url: string | null;
  alt: string | null;
};

export default function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState(-1);

  const slides = photos
    .filter((p) => p.url)
    .map((p) => ({ src: p.url!, alt: p.alt ?? "" }));

  return (
    <>
      <div
        className="relative w-full h-[55vh] cursor-pointer"
        onClick={() => setIndex(0)}
      >
        <Image
          src={optimizeImage(photos[0].url!, 800)}
          alt={photos[0].alt ?? "Cabaña"}
          fill
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0 flex items-end justify-end p-4"
          style={{
            background:
              "linear-gradient(to top, rgba(91,67,31,0.4), transparent)",
          }}
        >
          <span
            className="text-xs font-medium px-3 py-1 rounded-full"
            style={{ background: "rgba(0,0,0,0.5)", color: "white" }}
          >
            Ver todas las fotos ({photos.length})
          </span>
        </div>
      </div>

      {photos.length > 1 && (
        <div className="grid grid-cols-4 gap-1 mt-1 px-1">
          {photos.slice(1, 5).map((photo, i) => (
            <div
              key={i}
              className="relative h-32 md:h-44 cursor-pointer"
              onClick={() => setIndex(i + 1)}
            >
              <Image
                src={photo.url!}
                alt={photo.alt ?? `Foto ${i + 2}`}
                fill
                className="object-cover rounded-lg hover:opacity-90 transition-opacity"
              />
              {i === 3 && photos.length > 5 && (
                <div
                  className="absolute inset-0 rounded-lg flex items-center justify-center text-white font-semibold text-lg"
                  style={{ background: "rgba(91,67,31,0.7)" }}
                >
                  +{photos.length - 5}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
      />
    </>
  );
}
