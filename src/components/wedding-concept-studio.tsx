import { useState } from "react";
import { ArrowRight, Check, Flower2, Gem, Heart, Palette, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { weddingDecor, weddingKebaya, weddingTones, weddingConcepts, weddingMoodConsultUrl } from "@/data/wedding-concepts";

const categories = [
  { name: "Pelaminan", icon: Flower2 },
  { name: "Kebaya", icon: Gem },
  { name: "Tone warna", icon: Palette },
  { name: "Konsep acara", icon: Heart },
];

export function WeddingConceptStudio() {
  const [tab, setTab] = useState(0);
  const [decorIndex, setDecor] = useState(0);
  const [kebayaIndex, setKebaya] = useState(0);
  const [toneIndex, setTone] = useState(0);
  const [conceptIndex, setConcept] = useState(0);
  const decor = weddingDecor[decorIndex];
  const kebaya = weddingKebaya[kebayaIndex];
  const tone = weddingTones[toneIndex];
  const concept = weddingConcepts[conceptIndex];
  if (!decor || !kebaya || !tone || !concept) return null;
  const choices = tab === 0 ? weddingDecor : weddingKebaya;
  const imageIndex = tab === 0 ? decorIndex : kebayaIndex;

  return (
    <section id="konsep-wedding" aria-label="Pilihan konsep wedding" className="scroll-mt-24 bg-card px-4 py-14 text-wed-ink sm:px-6 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-wed-rose"><Sparkles className="h-4 w-4" /> Wedding moodboard</p>
            <h2 className="mt-3 font-[family-name:var(--font-wed-serif)] text-3xl font-bold leading-tight sm:text-4xl">Hari bahagia, <span className="text-wed-rose">gaya kalian.</span></h2>
          </div>
          <p className="font-[family-name:var(--font-wed-hand)] text-2xl text-wed-rose">detail kecil, cerita besar</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <div className="grid grid-cols-[1.6fr_1fr] gap-2 overflow-hidden rounded-lg">
              <figure className="relative min-w-0 overflow-hidden bg-wed-blush">
                <img key={decor.image} src={decor.image} alt={`Inspirasi pelaminan ${decor.name}`} loading="lazy" width={1200} height={800} className="wed-mood-enter aspect-[4/5] h-full w-full object-cover" />
                <figcaption className="absolute bottom-3 left-3 right-3 rounded-md bg-card/95 px-3 py-2 text-xs font-semibold">{decor.name}</figcaption>
              </figure>
              <figure className="relative min-w-0 overflow-hidden bg-wed-blush">
                <img key={kebaya.image} src={kebaya.image} alt={`Inspirasi kebaya ${kebaya.name}`} loading="lazy" width={800} height={1104} className="wed-mood-enter h-full w-full object-cover" />
                <figcaption className="absolute bottom-3 left-2 right-2 rounded-md bg-card/95 px-2 py-2 text-xs font-semibold">{kebaya.name}</figcaption>
              </figure>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-b border-wed-ink/15 pb-4">
              <div className="flex gap-1.5" aria-label={`Palet ${tone.name}`}>
                {tone.swatches.map(swatch => <span key={swatch} className={`h-7 w-7 rounded-full border border-wed-ink/10 ${swatch}`} />)}
              </div>
              <p className="text-sm font-medium">{tone.name}</p>
            </div>
            <h3 className="mt-4 font-[family-name:var(--font-wed-serif)] text-xl font-bold">{concept.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-wed-ink/70">{concept.note}</p>
          </div>

          <div className="min-w-0">
            <div role="tablist" aria-label="Detail wedding" className="grid grid-cols-4 border-b border-wed-ink/15">
              {categories.map((category, i) => (
                <Button key={category.name} id={`mood-tab-${i}`} role="tab" aria-selected={tab === i} aria-controls="mood-options" variant="ghost" onClick={() => setTab(i)} className={`h-auto flex-col gap-2 whitespace-normal rounded-none border-b-2 px-1 py-3 text-[11px] sm:text-xs ${tab === i ? 'border-b-wed-rose bg-wed-blush text-wed-rose' : 'border-b-transparent text-wed-ink/65'}`}>
                  <category.icon className="h-4 w-4" />{category.name}
                </Button>
              ))}
            </div>

            <div id="mood-options" role="tabpanel" aria-labelledby={`mood-tab-${tab}`} className="mt-5 min-h-60">
              {tab < 2 && <div className="grid grid-cols-2 gap-3">{choices.map((item, i) => (
                <Button key={item.name} variant="ghost" aria-pressed={imageIndex === i} onClick={() => tab === 0 ? setDecor(i) : setKebaya(i)} className={`relative h-auto min-w-0 flex-col items-start gap-0 overflow-hidden whitespace-normal rounded-lg border p-0 text-left ${imageIndex === i ? 'border-wed-rose ring-1 ring-wed-rose' : 'border-wed-ink/15'}`}>
                  <img src={item.image} alt={item.name} loading="lazy" width={240} height={180} className="aspect-[4/3] w-full object-cover" />
                  {imageIndex === i && <span className="absolute right-2 top-2 rounded-full bg-wed-rose p-1 text-primary-foreground"><Check className="h-3 w-3" /></span>}
                  <span className="p-3"><span className="block text-sm font-semibold">{item.name}</span><span className="mt-1 block text-xs font-normal leading-relaxed text-wed-ink/70">{item.note}</span></span>
                </Button>
              ))}</div>}
              {tab === 2 && <div className="grid grid-cols-2 gap-3">{weddingTones.map((item, i) => (
                <Button key={item.name} variant="ghost" aria-pressed={toneIndex === i} onClick={() => setTone(i)} className={`h-auto flex-col items-start whitespace-normal rounded-lg border p-4 text-left ${toneIndex === i ? 'border-wed-rose bg-wed-blush' : 'border-wed-ink/15'}`}>
                  <span className="flex gap-1">{item.swatches.map(s => <span key={s} className={`h-7 w-7 rounded-full border border-wed-ink/10 ${s}`} />)}</span>
                  <span className="mt-2 text-xs">{item.name}</span>
                  {toneIndex === i && <Check className="h-3 w-3 text-wed-rose" />}
                </Button>
              ))}</div>}
              {tab === 3 && <div className="space-y-2">{weddingConcepts.map((item, i) => (
                <Button key={item.name} variant="ghost" aria-pressed={conceptIndex === i} onClick={() => setConcept(i)} className={`h-auto w-full justify-between whitespace-normal rounded-lg border px-4 py-3 text-left ${conceptIndex === i ? 'border-wed-rose bg-wed-blush' : 'border-wed-ink/15'}`}>
                  <span><span className="block text-sm font-semibold">{item.name}</span><span className="mt-1 block text-xs font-normal leading-relaxed text-wed-ink/70">{item.note}</span></span>
                  {conceptIndex === i && <Check className="shrink-0 text-wed-rose" />}
                </Button>
              ))}</div>}
            </div>

            <div className="mt-6 border-t border-wed-ink/15 pt-5" aria-live="polite">
              <p className="text-xs font-semibold uppercase tracking-widest text-wed-rose">Pilihan kalian</p>
              <p className="mt-2 text-sm leading-relaxed">{decor.name} · {kebaya.name}<br />{tone.name} · {concept.name}</p>
              <Button asChild className="mt-4 h-auto w-full whitespace-normal bg-wed-rose py-3 text-primary-foreground hover:bg-wed-rose/90">
                <a href={weddingMoodConsultUrl({ decor: decor.name, kebaya: kebaya.name, tone: tone.name, concept: concept.name })} target="_blank" rel="noopener noreferrer">Konsultasikan pilihan ini <ArrowRight /></a>
              </Button>
              <p className="mt-3 text-xs leading-relaxed text-wed-ink/65">Gambar ilustrasi inspirasi, bukan katalog vendor atau hasil acara Nempo. Dekor dan busana di luar paket WO; ketersediaan serta biaya dikonfirmasi saat konsultasi.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}