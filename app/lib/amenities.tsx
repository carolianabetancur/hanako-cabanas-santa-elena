import {
  Flame,
  Bath,
  Wifi,
  ParkingCircle,
  UtensilsCrossed,
  TreePine,
  Flower2,
  Sofa,
  Mountain,
} from "lucide-react";

export const amenityIcons: Record<
  string,
  { icon: React.ReactNode; label: string }
> = {
  fireplace: { icon: <Flame size={16} />, label: "Chimenea" },
  jacuzzi: { icon: <Bath size={16} />, label: "Jacuzzi" },
  wifi: { icon: <Wifi size={16} />, label: "WiFi" },
  parking: { icon: <ParkingCircle size={16} />, label: "Parqueadero" },
  kitchen: { icon: <UtensilsCrossed size={16} />, label: "Cocina equipada" },
  mountain_view: { icon: <Mountain size={16} />, label: "Vista a la montaña" },
  forest_view: { icon: <TreePine size={16} />, label: "Vista al bosque" },
  garden_view: { icon: <Flower2 size={16} />, label: "Vista al jardín" },
  bbq: { icon: <Flame size={16} />, label: "Asador / BBQ" },
  livingroom: { icon: <Sofa size={16} />, label: "Sala" },
};
