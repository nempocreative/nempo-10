import garden from "@/assets/wedding-decor-garden.jpg";
import classic from "@/assets/wedding-decor-classic.jpg";
import ivory from "@/assets/wedding-kebaya-ivory.jpg";
import rose from "@/assets/wedding-kebaya-rose.jpg";
import { NEMPO_WA_URL } from "@/lib/contact";

export const weddingDecor = [
  { name: "Garden Romance", note: "Bunga putih, dedaunan, dan nuansa taman yang segar.", image: garden },
  { name: "Sunda Classic", note: "Gebyok berukir dengan bunga burgundy dan sentuhan emas.", image: classic },
];
export const weddingKebaya = [
  { name: "Ivory Lace", note: "Bordir lembut, warna ivory, dan kain batik klasik.", image: ivory },
  { name: "Dusty Rose", note: "Kebaya bernuansa rose dengan detail floral romantis.", image: rose },
];
export const weddingTones = [
  { name: "Sage & Ivory", swatches: ["bg-wed-sage", "bg-wed-ivory", "bg-wed-gold"] },
  { name: "Rose & Champagne", swatches: ["bg-wed-dust", "bg-wed-champagne", "bg-wed-ivory"] },
  { name: "Burgundy & Gold", swatches: ["bg-wed-burgundy", "bg-wed-gold", "bg-wed-ivory"] },
  { name: "Sky & Pearl", swatches: ["bg-wed-sky", "bg-wed-pearl", "bg-wed-sage"] },
];
export const weddingConcepts = [
  { name: "Intimate Garden", note: "Suasana hangat di taman, bunga natural, dan momen dekat bersama orang tersayang." },
  { name: "Traditional Sunda", note: "Nuansa adat Sunda, detail klasik, dan rangkaian acara yang penuh makna." },
  { name: "Modern Elegance", note: "Garis dekor yang bersih, detail elegan, dan suasana resepsi modern." },
];
export type WeddingMood = { decor: string; kebaya: string; tone: string; concept: string };
export function weddingMoodConsultUrl(mood: WeddingMood) {
  const text = `Halo Nempo Garut Organizer, saya ingin konsultasi konsep wedding.\nDekor pelaminan: ${mood.decor}\nKebaya: ${mood.kebaya}\nTone warna: ${mood.tone}\nKonsep acara: ${mood.concept}\nMohon info ketersediaan vendor dan penawaran sesuai pilihan ini.`;
  return `${NEMPO_WA_URL}?text=${encodeURIComponent(text)}`;
}