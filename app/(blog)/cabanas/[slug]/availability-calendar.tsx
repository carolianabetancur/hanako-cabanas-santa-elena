"use client";

import { useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";

type Booking = {
  _id: string;
  checkIn: string | null;
  checkOut: string | null;
};

type Props = {
  bookings: Booking[];
  cabinName: string | null;
  whatsappUrl: string;
};

function getDisabledDays(bookings: Booking[]) {
  const disabled: { from: Date; to: Date }[] = [];
  for (const booking of bookings) {
    if (!booking.checkIn || !booking.checkOut) continue;
    disabled.push({
      from: new Date(booking.checkIn),
      to: new Date(booking.checkOut),
    });
  }
  return disabled;
}

export default function AvailabilityCalendar({
  bookings,
  cabinName,
  whatsappUrl,
}: Props) {
  const [range, setRange] = useState<DateRange | undefined>();
  const disabledDays = getDisabledDays(bookings);

  const handleReserve = () => {
    if (!range?.from) return;
    const from = range.from.toLocaleDateString("es-CO");
    const to = range.to?.toLocaleDateString("es-CO") ?? from;
    const text = `Hola! Me interesa reservar la ${cabinName} del ${from} al ${to}`;
    window.open(
      `https://wa.me/${whatsappUrl}?text=${encodeURIComponent(text)}`,
      "_blank",
    );
  };

  const nightsSelected =
    range?.from && range?.to
      ? Math.round(
          (range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24),
        )
      : 0;

  return (
    <div className="flex flex-col gap-4">
      <style>{`
        .rdp {
            --rdp-accent-color: #FBBE00;
            --rdp-background-color: rgba(255,255,255,0.1);
            --rdp-accent-color-dark: #FBBE00;
            margin: 0;
            color: white;
        }
        .rdp-months {
            color: white;
        }
        .rdp-caption_label {
            color: #FBBE00;
            font-weight: 600;
        }
        .rdp-head_cell {
            color: rgba(255,255,255,0.5);
            font-size: 12px;
        }
        .rdp-button {
            color: white;
        }
        .rdp-button:hover:not([disabled]) {
            background-color: rgba(255,255,255,0.15);
            color: white;
        }
        .rdp-day_selected {
            background-color: rgba(255,255,255,0.15);
            color: white;
        }
        .rdp-day_range_start .rdp-button,
        .rdp-day_range_end .rdp-button {
            background-color: #FBBE00 !important;
            color: #5B431F !important;
            font-weight: 700;
        }
        .rdp-day_range_middle .rdp-button {
            background-color: rgba(251,190,0,0.2) !important;
            color: white !important;
        }
        .rdp-day_today .rdp-button {
            border: 1px solid #FBBE00;
            color: #FBBE00;
        }
        .rdp-button[disabled] {
            color: rgba(255,255,255,0.2) !important;
            text-decoration: line-through;
        }
        .rdp-nav_button {
            color: #FBBE00 !important;
        }
    `}</style>

      <DayPicker
        mode="range"
        selected={range}
        onSelect={setRange}
        disabled={[{ before: new Date() }, ...disabledDays]}
        modifiersStyles={{
          disabled: {
            textDecoration: "line-through",
            opacity: 0.4,
          },
        }}
        startMonth={new Date()}
      />

      {range?.from && (
        <div
          className="rounded-2xl p-4 text-sm flex flex-col gap-1"
          style={{ background: "#FFF3DC", color: "#5B431F" }}
        >
          <div className="flex justify-between">
            <span>Check-in</span>
            <span className="font-semibold">
              {range.from.toLocaleDateString("es-CO")}
            </span>
          </div>
          {range.to && (
            <>
              <div className="flex justify-between">
                <span>Check-out</span>
                <span className="font-semibold">
                  {range.to.toLocaleDateString("es-CO")}
                </span>
              </div>
              <hr style={{ borderColor: "#F96F00", opacity: 0.2 }} />
              <div className="flex justify-between font-semibold">
                <span>Noches</span>
                <span>{nightsSelected}</span>
              </div>
            </>
          )}
        </div>
      )}

      <button
        onClick={handleReserve}
        disabled={!range?.from || !range?.to}
        className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-white text-sm font-semibold transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
        style={{ background: "#25D366" }}
      >
        Reservar por WhatsApp
      </button>

      {!range?.from && (
        <p
          className="text-center text-xs"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          Selecciona las fechas para reservar
        </p>
      )}
    </div>
  );
}
