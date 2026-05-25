"use client";

import { useState } from "react";

export default function ContactForm({ whatsapp }: { whatsapp: string }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    const text = `Hola! Soy ${name}. ${message}`;
    const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="flex flex-col gap-4 text-left">
      <input
        type="text"
        placeholder="Tu nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-amber-400"
      />
      <textarea
        placeholder="¿En qué cabaña estás interesado? ¿Qué fechas tienes en mente?"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-amber-400 resize-none"
      />
      <button
        onClick={handleSend}
        disabled={!name || !message}
        className="w-full py-3 rounded-full text-white font-semibold text-sm transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background: "#25D366" }}
      >
        💬 Enviar por WhatsApp
      </button>
    </div>
  );
}
