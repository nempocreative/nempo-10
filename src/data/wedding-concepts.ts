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
export type WeddingTone = { name: string; swatches: string[]; deep: string; light: string };
export const weddingTones: WeddingTone[] = [
  { name: "Sage & Ivory", swatches: ["bg-wed-sage", "bg-wed-ivory", "bg-wed-gold"], deep: "#4f6a4a", light: "#f7f2e7" },
  { name: "Rose & Champagne", swatches: ["bg-wed-dust", "bg-wed-champagne", "bg-wed-ivory"], deep: "#a7627a", light: "#f6e6d6" },
  { name: "Burgundy & Gold", swatches: ["bg-wed-burgundy", "bg-wed-gold", "bg-wed-ivory"], deep: "#6d1f2c", light: "#f0dcae" },
  { name: "Sky & Pearl", swatches: ["bg-wed-sky", "bg-wed-pearl", "bg-wed-sage"], deep: "#46688a", light: "#f2ede4" },
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