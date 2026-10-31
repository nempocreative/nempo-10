import { useEffect, useState } from "react";
import { ArrowLeft, ArrowDown, CalendarHeart, Flower2, Leaf, MailOpen, MapPin, Heart, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/wouter";
import { NEMPO_WA_URL } from "@/lib/contact";
import "./nempo-01-invitation.css";

function Botanical() {
  return <div aria-hidden="true" className="n01-blue pointer-events-none absolute right-3 top-4 flex items-end opacity-20"><Leaf className="h-16 w-10 -rotate-45" strokeWidth={.8}/><Flower2 className="size-20" strokeWidth={.7}/><Leaf className="h-20 w-12 rotate-12" strokeWidth={.8}/></div>;
}

export function Nempo01Invitation() {
  const [opened, setOpened] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const [guest, setGuest] = useState("Bapak/Ibu/Saudara/i");
  useEffect(() => {
    const name = new URLSearchParams(window.location.search).get("to");
    if (name?.trim()) setGuest(name.trim());
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const remaining = Math.max(0, new Date("2026-12-20T08:00:00+07:00").getTime() - now);
  const countdown = [Math.floor(remaining / 86400000), Math.floor(remaining / 3600000) % 24, Math.floor(remaining / 60000) % 60, Math.floor(remaining / 1000) % 60];
  const consult = `${NEMPO_WA_URL}?text=${encodeURIComponent("Halo Nempo, saya tertarik undangan NEMPO 01 — Biru Bunga (Spesial Foto).")}`;
  return <div className="nempo-one relative min-h-screen overflow-x-hidden">
    <section className={`n01-enter relative flex flex-col items-center justify-end overflow-hidden px-6 pb-12 pt-16 text-center ${opened ? "min-h-[85svh] max-h-[800px]" : "min-h-svh"}`}>
      <img src="/images/invitation-hero.jpg" alt="Pasangan pengantin bersama buket bunga" className="absolute inset-0 h-full w-full object-cover"/>
      <div className="n01-shade absolute inset-0"/>
      <Link href="/wedding-invitation#tema" className="n01-light n01-body absolute left-5 top-5 z-10 inline-flex items-center gap-2 text-xs"><ArrowLeft className="size-4"/> Pilihan tema</Link>
      <div className="n01-light relative w-full max-w-md">
        <p className="n01-label">NEMPO 01 · Biru Bunga</p><p className="n01-label mt-8">The wedding of</p>
        <h1 className="mt-3 text-5xl leading-tight sm:text-6xl">Habib <span className="italic">&</span> Adiba</h1>
        <p className="mt-4 text-lg">20 . 12 . 2026</p>
        {!opened ? <><div className="mx-auto my-6 h-px w-12 bg-current opacity-50"/><p className="n01-body text-xs opacity-80">Kepada Yth.</p><p className="mt-2 break-words text-xl">{guest}</p><Button onClick={() => {setOpened(true); window.scrollTo({top:0,behavior:"instant"});}} className="n01-body mt-6 rounded-md px-6 text-xs"><MailOpen/> Buka Undangan</Button><p className="n01-body mt-5 text-[10px] opacity-70">Contoh undangan · Spesial Foto</p></> : <a href="#mempelai" aria-label="Lihat mempelai" className="mt-8 inline-flex"><ArrowDown className="size-5"/></a>}
      </div>
    </section>
    {opened && <main className="n01-enter">
      <section id="mempelai" className="relative mx-auto max-w-4xl scroll-mt-20 px-6 py-16 text-center sm:py-20">
        <Botanical/><Flower2 className="n01-blue mx-auto size-7" strokeWidth={1}/><p className="n01-label n01-blue mt-4">Bismillahirrahmanirrahim</p><h2 className="mt-4 text-3xl sm:text-4xl">Dua hati, satu perjalanan</h2>
        <p className="n01-body mx-auto mt-4 max-w-md text-xs leading-7">Dengan memohon rahmat dan ridha Allah SWT, kami mengundang Anda untuk hadir dalam pernikahan kami.</p>
        <div className="mt-10 grid items-center gap-6 sm:grid-cols-[1fr_auto_1fr]"><div><h3 className="n01-blue text-3xl">Habib Ramadhan</h3><p className="n01-body mt-3 text-xs leading-6">Putra dari<br/>Bapak Ahmad & Ibu Siti</p></div><span className="n01-blue text-4xl italic">&</span><div><h3 className="n01-blue text-3xl">Adiba Nurul</h3><p className="n01-body mt-3 text-xs leading-6">Putri dari<br/>Bapak Hasan & Ibu Aisyah</p></div></div>
        <blockquote className="n01-line mx-auto mt-12 max-w-xl border-t pt-8 text-base italic leading-8">“Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu merasa tenteram kepadanya.”</blockquote><p className="n01-label n01-blue mt-3">QS. Ar-Rum: 21</p>
      </section>
      <section id="acara" className="n01-soft relative scroll-mt-20 px-6 py-14 text-center"><Botanical/><p className="n01-label n01-blue">Save the date</p><h2 className="mt-3 text-3xl sm:text-4xl">Hari bahagia kami</h2>
        <div className="n01-line mx-auto mt-7 grid max-w-sm grid-cols-4 border-y py-4">{countdown.map((value,index)=><div key={index}><p className="n01-blue text-3xl tabular-nums">{String(value).padStart(2,"0")}</p><p className="n01-label mt-2">{["Hari","Jam","Menit","Detik"][index]}</p></div>)}</div>
        <div className="mx-auto mt-10 grid max-w-3xl gap-8 sm:grid-cols-2">{[{name:"Akad Nikah",time:"08.00 – 10.00 WIB"},{name:"Resepsi",time:"11.00 – 14.00 WIB"}].map(event=><div key={event.name} className="n01-line border-t pt-6"><CalendarHeart className="n01-blue mx-auto size-6" strokeWidth={1}/><h3 className="mt-3 text-2xl">{event.name}</h3><p className="n01-body mt-3 text-xs leading-7">Minggu, 20 Desember 2026<br/>{event.time}<br/>Gedung Serbaguna, Garut</p></div>)}</div>
        <Button asChild variant="outline" className="n01-body mt-8 rounded-md text-xs"><a href="https://www.google.com/maps/search/?api=1&query=Garut+Jawa+Barat" target="_blank" rel="noopener noreferrer"><MapPin/> Lihat area lokasi</a></Button>
      </section>
      <section id="galeri" className="mx-auto max-w-4xl scroll-mt-20 px-5 py-16 text-center"><p className="n01-label n01-blue">Our little moments</p><h2 className="mt-3 text-3xl">Mekar bersama</h2><div className="mt-8 grid grid-cols-2 items-start gap-3 sm:gap-5"><img src="/images/invitation-story.jpg" alt="Momen romantis pasangan" loading="lazy" className="h-auto w-full rounded-t-full"/><img src="/images/invitation-detail.jpg" alt="Detail pernikahan" loading="lazy" className="mt-10 h-auto w-full rounded-t-full"/><img src="/images/invitation-hero.jpg" alt="Pasangan bersama buket" loading="lazy" className="col-span-2 h-auto w-full"/></div></section>
      <section className="n01-soft relative px-6 py-14 text-center"><Botanical/><Heart className="n01-blue mx-auto size-6" strokeWidth={1}/><h2 className="mt-4 text-3xl">Doa restu Anda</h2><p className="n01-body mx-auto mt-4 max-w-md text-xs leading-7">Merupakan kebahagiaan bagi kami apabila Anda berkenan hadir dan memberikan doa restu.</p><p className="n01-blue mt-7 text-3xl italic">Habib & Adiba</p></section>
      <footer className="px-6 pb-24 pt-10 text-center"><p className="n01-label n01-blue">NEMPO 01 · Biru Bunga</p><Button asChild className="n01-body mt-4 rounded-md text-xs"><a href={consult} target="_blank" rel="noopener noreferrer"><Send/> Pesan tema ini</a></Button><p className="n01-body mt-5 text-[10px] leading-5 opacity-70">Nama, foto, tanggal, dan lokasi merupakan contoh.<br/>Nempo Garut Organizer</p></footer>
      <nav aria-label="Bagian undangan" className="n01-nav n01-line n01-body fixed inset-x-0 bottom-0 z-30 flex justify-center gap-6 border-t px-4 py-4 sm:gap-10">{[{href:"#mempelai",label:"Mempelai",Icon:Heart},{href:"#acara",label:"Acara",Icon:CalendarHeart},{href:"#galeri",label:"Galeri",Icon:Flower2}].map(({href,label,Icon})=><a key={href} href={href} className="n01-blue flex items-center gap-2 text-[11px]"><Icon className="size-4"/>{label}</a>)}</nav>
    </main>}
  </div>;
}